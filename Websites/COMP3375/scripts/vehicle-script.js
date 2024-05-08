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
        loadVehicle()
    }
} 

// This function handles the loading of vehicle page specific JS, such as event handlers, database connections, etc.
function loadVehicle()
{
    addVehicleListeners()
} 

// This function handles the creation of event handlers
function addVehicleListeners()
{

    document.querySelectorAll('.search-field').forEach(field =>
    {
        field.addEventListener('input', function(e)
        {
            searchVehicle()
        })
    })

    document.getElementById('search-button').addEventListener('click', function()
    {
        searchVehicle()
    })

    document.getElementById('v-make').addEventListener('focus', function(e)
    {
        showExistingMakes(e)    
    })

    document.getElementById('v-make').addEventListener('change', function(e)
    {
        makeModelEnabled(e)
    })
    
    document.getElementById('add-new-form').addEventListener('submit', function(e)
    {
        e.preventDefault()
        let formData = new FormData(document.forms['add-new-form'])
        // for (const key of formData.keys()) 
        //  {
        //      console.log(key);
        //  }
        for (const pair of formData.entries()) 
        {
            log(`${pair[0]}, ${pair[1]}`)
        }//end for

        let query = `SELECT type_ID FROM vehicletype WHERE make = '${formData.get('v-make')}' AND model = '${formData.get('v-model')}'`
        executeQuery(query)
        .then((type) =>
        {
            log(type)
            let query = `insert into vehicleinventory (VIN, license_plate, type_ID, year, colour, odometer, available) values ('${formData.get('v-vin')}', '${formData.get('v-license')}', '${type[0].type_ID}', '${formData.get('v-year')}','${formData.get('v-color')}', '${formData.get('v-odometer')}', '${formData.get('v-availability')}');`
            log(query)
            executeQuery(query)
            .then((data) =>
            {
                modal = document.getElementById('add-customer-modal')
                modal.innerHTML =  'Vehicle Successfully Added. Thank You'
                log(data)
            })
        })
        
    })//end form eventlisener
}//end add customVehicleListeners


// this function searches the vehicle table for matching records and displays them
function searchVehicle()
{
    // get the elements needed for this to work
    let searchResultContent = document.getElementById('search-results') // the main container holding every part of the search results
    let searchResultLoadingIcon = document.getElementById('search-results-load-icon') // the container holding the loading icon
    let searchResultAccordion = document.getElementById('search-results-display') // the container holding the records returned by the search

    // show the search results section along with the loading icon and hide the search results accordion
    searchResultContent.classList.remove('d-none')
    searchResultLoadingIcon.classList.remove('d-none')
    searchResultAccordion.classList.add('d-none')

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
    let query = `SELECT * FROM vehicleinventory, vehicletype WHERE vehicleinventory.type_id = vehicletype.type_id AND vin LIKE '%${searchFields['v-vin-search-input']}%' AND license_plate LIKE '%${searchFields['v-license-search-input']}%' AND year LIKE '%${searchFields['v-year-search-input']}%' AND odometer LIKE '%%' AND make LIKE '%${searchFields['v-make-search-input']}%' AND model LIKE '%${searchFields['v-model-search-input']}%' AND Available LIKE '%${searchFields['v-availability-search-input']}%';`
    log(query)
    executeQuery(query)
    // create the accordion items with the returned records
    .then((data) => {
        log("data recieved 1")
        log(data)

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

    var typeData, durationData, pickupData
    var div = document.createElement('div')

    // loop through the records returned and make a search result for each of them, then append it to a div
    data.forEach(record => 
    {
        
        var accordionItem = document.createElement('div').addClass('accordion-item').changeAttrib("id", `accordion-item-${record['vehicle_ID']}`)
        .setInnerHTML(`
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-${record['vehicle_ID']}" aria-expanded="true" aria-controls="collapseOne">
                <div class="container">
                    <div class="row"><span class="col-4"><i class="bi bi-car-front pe-1"></i>${record['make']} ${record['model']}</span><span class="col-5"><i class="bi bi-123 pe-1 fw-bold">License Plate:</i>${record['license_plate']}</span></div>
                </div>
                </button>
            </h2>
            <div id="accordion-collapse-${record['vehicle_ID']}" class="accordion-collapse collapse">
                <!-- VEHICLE INFORMATION -->
                <div class="text-center mt-3">
                    <p class="h5">
                        Vehicle Information
                        <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                            <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#vehicle-info-view-${record['vehicle_ID']},#vehicle-info-edit-${record['vehicle_ID']}"><i class="bi bi-pencil-square pe-none"></i></button>
                        </span>
                    </p>
                </div>
                <div class="container">
                    <div id="vehicle-info-view-${record['vehicle_ID']}">
                        <div class="row">
                            <div class="col-6">
                                <p><i class="bi bi-car-front pe-1"></i>${record['make']} ${record['model']}</p>
                                <p><i class="bi bi-car-front pe-1 fw-bold">VIN:</i>${record['VIN']}</p>
                            </div>
                            <div class="col-6">
                                <p><i class="bi bi-123 pe-1 fw-bold">Year:</i>${record['year']}</p>
                                <p><i class="bi bi-123 pe-1 fw-bold">License Plate:</i>${record['license_plate']}</p>
                            </div>
                        </div>
                    </div>
                    <form action="#" method="post" id="vehicle-info-edit-${record['vehicle_ID']}" class="d-none vehicle-info-edit">
                        <div class="row">
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="" class="form-label">Make</label>
                                        <select name="make-edit" id="make-edit-${record['vehicle_ID']}" class="form-select make-edit-form form-input"></select>
                                    </div>
                                    <div class="col-6">
                                        <label for="" class="form-label">Model</label>
                                        <select name="model-edit" id="model-edit" class="form-select form-input"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3">
                                <label for="" class="form-label">Year</label>
                                <input type="text" name="year-edit" class="form-control form-input" id="year-edit" placeholder="Year" value="${record['year']}">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <label for="" class="form-label">VIN</label>
                                <input type="text" name="vin-edit" id="vin-edit" class="form-control form-input" placeholder="VIN" value="${record['VIN']}">
                            </div>
                            <div class="col-6">
                                <label for="" class="form-label">License Plate</label>
                                <input type="text" name="license-edit" class="form-control form-input" id="license-edit" placeholder="License Plate" value="${record['license_plate']}">
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
                <!-- ADDITIONAL INFORMATION -->
                <div class="text-center mt-3">
                    <p class="h5">
                        Additional Information
                        <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                            <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#additional-info-view-${record['vehicle_ID']},#additional-info-edit-${record['vehicle_ID']}"><i class="bi bi-pencil-square pe-none"></i></button>
                        </span>
                    </p>
                </div>
                <div class="container">
                    <div id="additional-info-view-${record['vehicle_ID']}">
                        <div class="row">
                            <div class="col-6">
                                <p><span class="fw-bold"><i class="bi bi-speedometer me-2">Odometer:</i></span>${record['odometer']} Miles</p>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-1">
                                        <span class="fw-bold"><i class="bi bi-palette2 me-1"></i></span>
                                    </div>
                                    <div class="col-2">
                                        <span><input type="color" class="form-control form-control-color" value="${record['colour']}" disabled></span>
                                    </div>
                                    <div class="col-2">
                                        <span><label for="" class="form-label">${record['colour']}</label></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="#" method="post" id="additional-info-edit-${record['vehicle_ID']}" class="d-none additional-info-edit">
                        <div class="row">
                            <div class="col-6">
                                <label for="" class="form-label">Odometer</label>
                                <input type="number" name="odometer-edit" id="odometer-edit" class="form-control form-input" placeholder="Odometer Reading" value="${record['odometer']}">
                            </div>
                            <div class="col-6">
                                <label for="" class="form-label">Color</label>
                                <input type="color" name="color-edit" id="color-edit" class="form-control form-control-color form-input" value="${record['colour']}">
                            </div>
                        </div>
                        <div class="row mt-3 justify-content-center">
                            <div class="col-3 text-center">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- SPACER ELEMENT -->
                <div class="my-2"></div>
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
    // contact info edit listeners
    var contactForms = document.querySelectorAll('.vehicle-info-edit') 
    contactForms.forEach((form) =>
    {
        var makeSelects = form.querySelectorAll('.make-edit-form')
        
        makeSelects.forEach((makeSelect) =>
        {
            log(makeSelect.id)
            makeSelect.addEventListener('focus', function(e)
            {
                log('in')
                showExistingMakes(e)
            })
            makeSelect.addEventListener('change', function(e)
            {
                makeModelEnabled(e)
            })
        })
        

        form.addEventListener('submit', function(e)
        {
            e.preventDefault()

            // get the current form
            var form = e.target
            log('in')
            // get the user id from the form id
            var vehicleID = form.id.replace('vehicle-info-edit-', '')
            log(vehicleID)
            // get the form data
            var formData = new FormData(form)

            // create the query with the form data
            var query = `UPDATE vehicle SET year = '${formData.get('year-edit')}', VIN = '${formData.get('vin-edit')}', licence_plate = '${formData.get('license-edit')}' WHERE vehicle_ID = ${vehicleID}`

            log(query)
             // execute the query
            executeQuery(query)
            .then((result) =>
            {
              log(result)
                searchVehicle() // refresh the search to get the updated database
            })
            .catch((reason) =>
            {
                console.error(reason)
            })
        })
    })//end for eac    
    // contact info edit listeners
    var contactForms = document.querySelectorAll('.additional-info-edit') 
    contactForms.forEach((form) =>
    {

        form.addEventListener('submit', function(e)
        {
            e.preventDefault()

            // get the current form
            let form = e.target
            
            // get the user id from the form id
            let vehicleID = form.id.replace('additional-info-edit-', '')
            log(vehicleID)
            // get the form data
            let formData = new FormData(form)

            // create the query with the form data
            let query = `UPDATE vehicle SET odometer = '${formData.get('odometer-edit')}', colour = '${formData.get('color-edit')}' WHERE vehicle_ID = '${vehicleID}';`

            log(query)    
            executeQuery(query)
            .then((result) =>
            {
                log(result)
                searchVehicle() // refresh the search to get the updated database
            })
            .catch((reason) =>
            {
                console.error(reason)
            })
        })
    })//end for each
}//end addEditformlistener
