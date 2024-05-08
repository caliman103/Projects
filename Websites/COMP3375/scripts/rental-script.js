// This script holds functions and data structures that are expected to be used by vehicle.html

// load needed page elements after the page has finished loading
document.onreadystatechange = function()
{
    if(document.readyState === 'complete')
    {
        BSLoad() // function from shared-script.js
        loadNavbar() // function from shared-script.js
        addFormCardNavigation() // function from shared-script.js
        addTogglerListeners()
        loadRental()
    }
}

// This function handles the loading of vehicle page specific JS, such as event handlers, database connections, etc.
function loadRental()
{
    addRentalListeners()
}

function addRentalListeners()
{
    document.querySelectorAll('.search-field').forEach(field =>
    {
        field.addEventListener('input', function(e)
        {
            searchRental()
        })
    })

    document.getElementById('search-button').addEventListener('click', function()
    {
        searchRental()
    })

    document.getElementById('add-new-form').addEventListener('submit', function(e)
    {
        e.preventDefault()
        let form = e.target

        let formData = new FormData(form)

        for (const pair of formData.entries()) 
        {
            log(`${pair[0]}, ${pair[1]}`)
        }//end for

        let query = `SELECT cust_ID from customer WHERE license_number = '${formData.get('license-search-input')}'`
        executeQuery(query)
        .then((cust_ID) =>
        {
            query = `SELECT vehicle_ID from vehicleinventory WHERE license_plate = '${formData.get('lplate-search-input')}'`
            return executeQuery(query)
            .then((lPlate) =>
            {
                query = `insert into rentalLog (cust_ID, vehicle_ID, rental_date, expected_date, rental_fee, additional_fees, rental_aggrement, rental_condition) VALUES ('${cust_ID[0].cust_ID}', '${lPlate[0].vehicle_ID}', '${formData.get('v-rentperiod-begin')}', '${formData.get('v-rentperiod-end')}', '${formData.get('v-rentalrate')}', '${formData.get('v-fees')}', '${formData.get('pre-rental-comments')}', '${formData.get('v-condition')}');`
                executeQuery(query)
                .then((data) =>
                {
                    modal = document.getElementById('add-customer-modal')
                    modal.innerHTML =  'Rental Successfully Added. Thank You'
                    log(data)
                })
            })
        })
    })//end submit event listener
}

// this function searches the vehicle table for matching records and displays them
function searchRental()
{
    // get the elements needed for this to work
    let searchResultContent = document.getElementById('search-results') // the main container holding every part of the search results
    let searchResultLoadingIcon = document.getElementById('search-results-load-icon') // the container holding the loading icon
    let searchResultAccordion = document.getElementById('search-results-display') // the container holding the records returned by the search

    // show the search results section along with the loading icon and hide the search results accordion
    if(searchResultContent.classList.contains('d-none'))
    {
        searchResultContent.classList.remove('d-none')
    }
    if(searchResultLoadingIcon.classList.contains('d-none'))
    {
        searchResultLoadingIcon.classList.remove('d-none')
    }
    if(!searchResultAccordion.classList.contains('d-none'))
    {
        searchResultAccordion.classList.add('d-none')
    }
    // get the inputs from the search fields and place them in an associative array named searchFields to aid in data retrieval
    let searchFields = {}
    document.querySelectorAll('.search-field').forEach(searchField =>
    {
        searchFields[searchField.getAttribute('name')] = searchField.value
        // log(searchField.value)
    })

    log(searchFields)

    // execute the query and get the returned records
    // let query = `SELECT * FROM customer WHERE first_name LIKE '%${searchFields['fname-search-input']}%' AND middle_name LIKE '%${searchFields['mname-search-input']}%' AND last_name LIKE '%${searchFields['lname-search-input']}%' AND license_number LIKE '%${searchFields['license-search-input']}%' AND phone_number LIKE '%${searchFields['phone-search-input']}%' AND email LIKE '%${searchFields['email-search-input']}%';`
    let query = `SELECT *, (datediff(return_date,rental_date) + 1) * rental_fee as total_charges FROM customer, rentallog, vehicleinventory, vehicletype WHERE customer.cust_id = rentallog.cust_id AND vehicleinventory.vehicle_id = rentallog.vehicle_id AND vehicleinventory.type_id = vehicletype.type_id AND first_name LIKE '%${searchFields['fname-search-input']}%' AND middle_name LIKE '%${searchFields['mname-search-input']}%' AND last_name LIKE '%${searchFields['lname-search-input']}%' AND vin LIKE '%${searchFields['v-vin-search-input']}%' AND license_number LIKE '%${searchFields['license-search-input']}%' AND license_plate LIKE '%${searchFields['v-license-search-input']}%';`
    log(query)
    executeQuery(query)
    // create the accordion items with the returned records
    .then((data) => {
        log("data recieved 1")
        //log(data)

        return makeSearchResults(data, searchResultAccordion)
    })
    .then((info) => {
        log(info)
        log("data recieved 2")

        // make the accordion visible and hide the loading icon
        searchResultLoadingIcon.classList.add('d-none')
        searchResultAccordion.classList.remove('d-none')
    })

    log("data recieved 3")


}

// this function creates the search results using the entered data and appends them to the accordion element
async function makeSearchResults(data, accordion)
{
    // await sleep(2000)

    var div = document.createElement('div')
    // loop through the records returned and make a search result for each of them, then append it to a div
    data.forEach(record => 
    {
        let mustChange = false
        let changeIndex = -1
        // log(typeof record)   
        //log(record)
        Object.entries(record).forEach((field, index) =>
        {
            // log(field)
            // log(field)
            if(!field[1])
            {
                log(index)
                mustChange = true
                record[Object.keys(record)[index]] = 'N/A'
                changeIndex = index
                // log(field)
            }
        })
        // if(mustChange)
        // {
        //     log('in')
        //     record[changeIndex] = 'N/A'
        // }
        // log(record)
         //log(record[18])
        var accordionItem = document.createElement('div').addClass('accordion-item').changeAttrib("id", `accordion-item-${record['vehicle_ID']}`)
        .setInnerHTML(`
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-${record['cust_id']}${record['vehicle_id']}${record['rental_date']}" aria-expanded="true" aria-controls="collapseOne">
            <div class="container">
                <div class="row">
                    <span class="col-3"><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</span>
                    <span class="col-3"><i class="bi bi-car-front pe-1 fw-bold">:</i>${record['make']} ${record['model']}</span>
                    <span class="col-3"><i class="bi bi-123 pe-1 fw-bold">License Plate:</i>${record['license_plate']}</span>
                    <span class="col-3"><i class="bi bi-123 pe-1 fw-bold">Rental Date:</i>${record['rental_date']}</span>
                </div>
            </div>
            </button>
        </h2>
        <div id="accordion-collapse-${record['cust_id']}${record['vehicle_id']}${record['rental_date']}" class="accordion-collapse collapse">
            <!-- CUSTOMER INFORMATION -->
            <div class="text-center mt-3">
                <p class="h5">
                    Customer Information
                    <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                        <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#customer-info-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']},#customer-info-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}"><i class="bi bi-pencil-square pe-none"></i></button>
                    </span>
                </p>
            </div>
            <div class="container">
                <div id="customer-info-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}">
                    <div class="row">
                        <div class="col-6">
                            <p><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</p>
                        </div>
                        <div class="col-6">
                            <p><i class="bi bi-123 pe-1 fw-bold">License #:</i>${record['license_number']}</p>
                        </div>
                    </div>
                </div>
                <form action="#" method="post" id="customer-info-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}" class="customer-info-edit d-none mb-3">
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <label for="" class="form-label">License #</label>
                            <input type="text" name="customer-edit-search" id="customer-edit" class="form-control form-input" placeholder="License Number" value="${record['license_number']}">
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6 customer-radio-div">
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <div class="col-3 text-center">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="my-5">
                <hr class="w-75 m-auto">
            </div>
            <!-- VEHICLE INFORMATION -->
            <div class="text-center mt-3">
                <p class="h5">
                    Vehicle Information
                    <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                        <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#vehicle-info-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']},#vehicle-info-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}"><i class="bi bi-pencil-square pe-none"></i></button>
                    </span>
                </p>
            </div>
            <div class="container">
                <div id="vehicle-info-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}">
                    <div class="row">
                        <div class="col-6">
                            <p><i class="bi bi-car-front pe-1 fw-bold"></i>${record['make']} ${record['model']}</p>
                        </div>
                        <div class="col-6">
                            <p><i class="bi bi-123 pe-1 fw-bold">License Plate:</i>${record['license_plate']}</p>
                        </div>
                    </div>
                </div>
                <form action="#" method="post" id="vehicle-info-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}" class="d-none">
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <label for="" class="form-label">License Plate</label>
                            <input type="text" name="vehicle-edit-search" id="vehicle-edit" class="form-control form-input" placeholder="License Plate" value="${record['license_plate']}">
                        </div>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <div class="col-6 vehicle-radio-div">
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <div class="col-3 text-center">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="my-5">
                <hr class="w-75 m-auto">
            </div>
            <!-- RENTAL AGREEMENT -->
            <div class="text-center mt-3">
                <p class="h5">
                    Rental Agreement
                    <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                        <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#rental-agreement-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']},#rental-agreement-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}"><i class="bi bi-pencil-square pe-none"></i></button>
                    </span>
                </p>
            </div>
            <div class="container">
                <div id="rental-agreement-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}">
                    <div class="row">
                        <div class="col-6">
                            <p><span class="fw-bold"><i class="bi bi-calendar me-1 fw-bold">Rental Date:</i></span>${record['rental_date']}</p>
                            <p><span class="fw-bold"><i class="bi bi-currency-dollar me-1 fw-bold">Rental Rate:</i></span>$${record['rental_fee']} per day</p>
                            <p><span class="fw-bold"><i class="bi bi-chat-left-text me-1 fw-bold">Pre-Rental Comments:</i></span><br>${record['rental_agreement']}</p>
                        </div>
                        <div class="col-6">
                            <p><span class="fw-bold"><i class="bi bi-calendar me-1 fw-bold">Expected Return Date:</i></span>${record['expected_date']}</p>
                            <p><span class="fw-bold"><i class="bi bi-currency-dollar me-1 fw-bold">Additional Fees:</i></span>$${record['additional_fees']}</p>
                            <p><span class="fw-bold"><i class="bi bi-calendar me-1 fw-bold">Pre-Rental Condition:</i></span>${record['rental_condition']}</p>
                        </div>
                    </div>
                </div>
                <form action="#" method="post" id="rental-agreement-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}" class="d-none">
                    <div class="row">
                        <div class="col-6">
                            <label for="" class="form-label">Rental Date</label>
                            <input type="date" name="rental-date-edit" id="rental-date-edit" class="form-control form-input" value="${record['rental_date']}">
                        </div>
                        <div class="col-6">
                            <label for="" class="form-label">Expected Return Date</label>
                            <input type="date" name="expected-return-date-edit" id="expected-return-date-edit" class="form-control form-input" value="${record['expected_date']}">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="" class="form-label">Rental Rate</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                                <input type="number" name="rental-rate-edit" min="0" step="0.01" id="rental-rate-edit" class="form-control form-input" placeholder="Rental Rate" value="${record['rental_rate']}">
                                <span class="input-group-text">per Day</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <label for="" class="form-label">Aditional Fees</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                                <input type="number" name="additional-fees-edit" min="0" step="0.01" id="additional-fees-edit" class="form-control form-input" placeholder="Additional Fees" value="${record['additional_fees']}">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="" class="form-label">Pre-Rental Comments</label>
                            <textarea name="pre-rent-comments-edit" id="pre-rent-comments-edit" cols="30" rows="10" class="form-control form-input" placeholder="Comments" value="${record['rental_agreement']}"></textarea>
                        </div>
                        <div class="col-6">
                            <label for="" class="form-label">Pre-Rental Condition</label>
                            <select name="pre-rent-condition-edit" id="pre-rent-condition-edit" class="form-select form-input">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <div class="col-3 text-center">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="my-5">
                <hr class="w-75 m-auto">
            </div>
            <!-- RETURN STATUS -->
            <div class="text-center mt-3">
                <p class="h5">
                    Return Status
                    <span class="tt" data-bs-placement="right" title="Edit Return Status">
                        <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#return-status-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']},#return-status-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}"><i class="bi bi-pencil-square pe-none"></i></button>
                    </span>
                </p>
            </div>
            <div class="container">
                <div id="return-status-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}">
                    <div class="row">
                        <div class="col-6">
                            <p><span class="fw-bold"><i class="bi bi-calendar me-1 fw-bold">Actual Return Date:</i></span>12-16-2020</p>
                            <p><span class="fw-bold"><i class="bi bi-chat-left-text me-1 fw-bold">Post-Rental Comments:</i></span><br>${record['comments']}</p>
                        </div>
                        <div class="col-6">
                            <p><span class="fw-bold"><i class="bi bi-calendar me-1 fw-bold">Return Condition:</i></span>${record['return_condition']}</p>
                        </div>
                    </div>
                </div>
                <form action="#" method="post" id="return-status-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}" class="d-none">
                    <div class="row">
                        <div class="col-6">
                            <label for="" class="form-label">Actual Return Date</label>
                            <input type="date" name="actual-return-date-edit" id="actual-return-date-edit" class="form-control form-input" value="${record['return_date']}">
                        </div>
                        <div class="col-6">
                            <label for="" class="form-label">Return Condition</label>
                            <select name="pre-rent-condition-edit" id="pre-rent-condition-edit" class="form-select form-input">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="" class="form-label">Post-Rental Comments</label>
                            <textarea name="post-rent-comments-edit" id="post-rent-comments-edit" cols="30" rows="10" class="form-control form-input" placeholder="comments">${record['comments']}</textarea>
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <div class="col-3 text-center">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="my-5">
                <hr class="w-75 m-auto">
            </div>
            <!-- PAYMENT -->
            <div class="text-center mt-3">
                <p class="h5">
                    Payment
                    <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                        <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#payment-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']},#payment-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}"><i class="bi bi-pencil-square pe-none"></i></button>
                    </span>
                </p>
            </div>
            <div class="container">
                <div id="payment-view-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}">
                    <div class="row">
                        <div class="col-6">
                            <p><span class="fw-bold"><i class="bi bi-currency-dollar me-1 fw-bold">Total Charges Due:</i></span>$${record['total_charges']}</p>
                            <p><span class="fw-bold"><i class="bi bi-currency-dollar me-1 fw-bold">Total Fees Paid:</i></span>$${record['payment_received']}</p>
                        </div>
                        <div class="col-6">
                            <p></p>
                            <p><span class="fw-bold"><i class="bi bi-currency-dollar me-1 fw-bold">Outstanding Charges:</i></span>$${record['total_charges'] - record['payment_received']}</p>
                        </div>
                    </div>
                </div>
                <form action="" method="post" id="payment-edit-${record['cust_id']}-${record['vehicle_id']}-${record['rental_date']}" class="d-none">
                    <div class="row">
                        <div class="col-6">
                            <label for="" class="form-label">Total Fees Paid</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                                <input type="number" min="0" step="0.01" name="rental-fees-due-edit" id="rental-fees-due-edit" class="form-control form-input" placeholder="Total Fees Paid" value="${record['payment_received']}">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center">
                        <div class="col-3 text-center">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `)
        div.addChild(accordionItem)

        //Get all the buttons new buttons added to the records returned from the query and add the event listener on it
        //buttons in accordion have this class so add a event listener to them once they are returned
        let newButtons = accordionItem.querySelectorAll(`.toggle-content`) 
        newButtons.forEach(newButton =>
        {
            newButton.addEventListener('click', toggleListener)
        })

        addEditFormListeners()
    })

    // clear all of the search results still existing
    while (accordion.firstChild) 
    {
        accordion.removeChild(accordion.firstChild);
    }

    //log(2222)

    // re-add the toggle listeners for any new buttons
    //addTogglerListeners()

    // add the listeners to the edit forms
    addEditFormListeners()

    // append the newly created search result div
    accordion.addChild(div)

    //log("data recieved 1.1")

    //return("done")
}//end makeSearchResults

function addEditFormListeners()
{
    var customerForm = document.querySelectorAll(".customer-info-edit")
    customerForm.forEach((form) =>
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault()
            let form = e.target

            let cust_ID =  form.id.replace('customer-info-edit-', '')

            let query

        })//end eventlistener
    })//end foreach
}