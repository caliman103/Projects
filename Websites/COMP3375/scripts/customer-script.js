// This script holds functions and data structures that are expected to be used by customer.html

// load needed page elements after the page has finished loading
document.onreadystatechange = function()
{
    if(document.readyState === 'complete')
    {
        BSLoad() // function from shared-script.js
        loadNavbar() // function from shared-script.js
        addFormCardNavigation() // function from shared-script.js
        loadCustomer()
        addTogglerListeners()
    }
}
 

// This function handles the loading of customer page specific JS, such as event handlers, database connections, etc.
function loadCustomer()
{
    addCustomerListeners()
}

// This function handles the creation of event handlers
function addCustomerListeners()
{
    document.getElementById('model-add-btn').addEventListener('click', function()
    {
        addMakeModel()
    })

    document.getElementById('duration-add-btn').addEventListener('click', function()
    {
        addDuration()
    })

    document.getElementById('pickup-add-btn').addEventListener('click', function()
    {
        addPickup()
    })

    document.getElementById('dropoff-add-btn').addEventListener('click', function()
    {
        addDropoff()
    })

    document.querySelectorAll('.search-field').forEach(field =>
    {
        field.addEventListener('input', function(e)
        {
            searchCustomer()
        })
    })

    document.getElementById('search-button').addEventListener('click', function()
    {
        searchCustomer()
    })

    document.getElementById('add-new-make-model-form').addEventListener('submit', function(e)
    {
        e.preventDefault()
        addNewMakeModel(e.target)
    })


    document.getElementById('add-new-form').addEventListener('submit', function(e)
    {
        e.preventDefault()
        let formData = new FormData(document.forms['add-new-form'])
        
        // for (const key of formData.keys()) 
        // {
        //     console.log(key);
        // }
        //set any blank  inputs to null
        // for (const pair of formData.entries()) 
        // {
        //     if(pair[1] === '' )
        //     { 
        //         formData.set(pair[0], 'NULL')
        //         //console.log(`${pair[0]}, ${pair[1]}`);
        //     }   
        // }//end for
        let query = `insert into Customer (first_name, middle_name, last_name, email, address1, address2, phone_number, license_number, license_exp, issuing_province, card_number, card_type, card_exp, billing_address1, billing_address2) VALUES ('${formData.get('f-name')}', '${formData.get('m-name')}', '${formData.get('l-name')}', '${formData.get('email')}', '${formData.get('address1')}', '${formData.get('address2')}', '${formData.get('phone')}', '${formData.get('license')}','${formData.get('license-exp')}','${formData.get('province')}', '${formData.get('card-num')}', '${formData.get('card-type')}', '${formData.get('card-exp')}', '${formData.get('billing-address1')}', '${formData.get('billing-address2')}');`
        log(query)
         executeQuery(query)
         .then((returned) =>
         {
            modal = document.getElementById('add-customer-modal')
            modal.innerHTML =  'Customer Successfully Added. Thank You'
            log(modal.innerHTML)
            log(returned)
            //insert into customer query was successful
            if(returned.status === true)
            {
                message = 'Customer Successfully Added. Thank You'
                classToAdd = 'text-success'
                return executeQuery('SELECT MAX(cust_ID) AS ID FROM customer') //get the cust_ID of the newly added customer
                .then((data) =>
                {    
                    //vehicle select information
                    let vehiclePattern = /vehicle-select\[[\d]+\]/  //pattern for detecting vehicle select rows
                    let foundVehicleSelect = 0 //when two adjacent vehicle selects are found then run the query since they hold the make and model
                    let make = ''

                    //duration preference information
                    let durationPattern = /duration-select\[[\d]+\]/ //same concept as vehicleselect
                    let foundDurationSelect = 0
                    let amount = '';

                    let pickUpPattern = /pickup-select\[[\d]+\]/
                    let dropOffPattern = /dropoff-select\[[\d]+\]/
                    let highestID; 
                    highestID = parseInt(data[0]['ID']) //data is returned as a string to cast it to int
                    //find entries with select combinations
                    for (const pair of formData.entries()) 
                    {
                        //vehicle-select found
                        if(vehiclePattern.test(pair[0]))
                        {
                            foundVehicleSelect++
                            if(foundVehicleSelect == 1)
                            {
                                make = pair[1]
                            }
                        }//end if
                        if(foundVehicleSelect == 2) //found 2 adjacent selects
                        {
                            //run query
                            query = `insert into vehicletypepreference (cust_ID, make, model) VALUES ('${highestID}', '${make}', '${pair[1]}')`
                            log(query)
                            return executeQuery(query)
                            .then((data) =>
                            {
                                if(data.status)
                                {
                                    log('vehicletype success')
                                }
                            })//end vehicletypepreference query
                            foundVehicleSelect = 0;
                        }//end if
                        
                        //duration-select found
                        if(durationPattern.test(pair[0]))
                        {
                            foundDurationSelect++
                            if(foundDurationSelect == 1)
                            {
                                amount = pair[1]
                            }
                        }//end if
                        if(foundDurationSelect == 2)
                        {
                            //run query
                            query = `insert into rentaldurationpreference (cust_ID, amount, unit) VALUES ('${highestID}', '${amount}', '${pair[1]}')`
                            log(query)
                            return executeQuery(query)
                            .then((data) =>
                            {
                                
                            });
                            foundDurationSelect = 0;
                        }//end if

                        //pickuplocationfound
                        if(pickUpPattern.test(pair[0]))
                        {
                            query = `insert into pickuplocationpreference (cust_ID, location) VALUES ('${highestID}', '${pair[1]}')`
                            return executeQuery(query)
                            .then((data) =>
                            {
                                
                            })
                        }//end if

                        //dropofflocationlocationfound
                        if(dropOffPattern.test(pair[0]))
                        {
                            query = `insert into dropofflocationpreference (cust_ID, location) VALUES ('${highestID}', '${pair[1]}')`
                            return executeQuery(query)
                            .then((data) =>
                            {
                                
                            })
                        }//end if
                    }//end for
                    //Display message on the modal
                    
                })//end then (getting highest id)

                
            }//end if (successful add for insert cusomer)
            //show successmodeal
            
          })//end then insert into customer query 
    })//end event listener (submit)


    //for the new make and model section of customer page
    document.getElementById('new-make-input-select').addEventListener('focus', function(e)
    {
        showExistingMakes(e)
    })

}//end addCUstomEventListeners


function addNewMakeModel(form)
{
    if(form.classList.contains('was-validated'))
    {
        form.classList.remove('was-validated')
    }
    let makeSelect = document.getElementById('new-make-input-select')
    let makeText = document.getElementById('new-make-input-text')
    let model = document.getElementById('new-model-input')

    inputs = [makeSelect, makeText, model]

    //Add required to the form element if they are visible so that the was validated class can work
    if(!makeSelect.classList.contains('d-none'))
    {
        makeSelect.changeAttrib('required', true)
        if(makeSelect.checkValidity() && model.checkValidity())
        {
            //return query
            let query = `insert into vehicletype (make, model) VALUES ('${makeSelect.value}', '${model.value}')`
            executeQuery(query)
            .then((data) =>
            {
                newMakeModelStatus(inputs,data.status)    
            })
        }//end if
        
    }//end if
    if(!makeText.classList.contains('d-none'))
    {
        makeText.changeAttrib('required', true)
        if(makeText.checkValidity() && model.checkValidity())
        {
            let query =`insert into vehicletype (make, model) VALUES ('${makeText.value}', '${model.value}')`
            executeQuery(query)
            .then((data) =>
            {
                newMakeModelStatus(inputs,data.status)
            })
        }//end if
    }
   // form.classList.add('was-validated')
}//end addNewMakeModel

function newMakeModelStatus(inputs, status)
{
    let alert = document.getElementById('new-make-model-alert')
    if(alert.classList.contains('d-none'))
    {
        alert.classList.remove('d-none')
    }
    //change the colour of the alert with the correct one
    if(status === true)
    {
        alert.classList.add('alert-success')
    }//end if
    else if(status === false)
    {
        alert.classList.add('alert-danger')
    }

    //set all values in the 
    inputs.forEach(input =>
    {
        input.value = ''    
    })

}//end new makeModelSuccess

// this function is for adding a new set of make and model inputs on the rental preferences page
function addMakeModel()
{
    // log('make-model')
    // get the information from the hidden input
        // hidden input
    var hiddenInput = document.getElementById('make-model-row-num')
        // current row number
    var currentRow = Number(hiddenInput.getAttribute('value'))
    var newRowNum = currentRow + 1
        // # of present inputs
    var numInputs = Number(hiddenInput.getAttribute('num-inputs'))
    

    var row, labelRow, label, select // variables used in row and input creation
    // if the row is the first to be made (current row number = -1), create another for the labels first and append it
    if(currentRow == -1)
    {
        // create the row 
        labelRow = document.createElement('div')
            .addClass('row mb-1 justify-content-center')
            .changeAttrib('id', 'make-model-labels')
            // make column
            .addChild(
                document.createElement('div')
                .addClass('col-3')
                // label text
                .addChild(
                    document.createElement('p')
                    .addClass('form-label')
                    .setInnerHTML('Make')
                )
            )
            // model column
            .addChild(
                document.createElement('div')
                .addClass('col-3')
                // label text
                .addChild(
                    document.createElement('p')
                    .addClass('form-label')
                    .setInnerHTML('Model')
                )
            )

        // append to document
        hiddenInput.insertAdjacentElement('afterend', labelRow)
    }

    // create the row with ids and names based on the row number
    // create the row 
    row = document.createElement('div')
        .addClass('row mb-3')
        .changeAttrib('id', 'make-model-row-' + newRowNum)
        // spacer column (used when justify center wouldn't work)
        .addChild(
            document.createElement('div')
            .addClass('col-3')
        )
        // make column
        .addChild(
            document.createElement('div')
            .addClass('col-3')
            // select input
            .addChild(
                document.createElement('select')
                .addClass('form-select form-input make-select')
                .changeAttrib('id', "vehicle-select[" + newRowNum + "]['make']")
                .changeAttrib('name', "vehicle-select[" + newRowNum + "]['make']")
                .changeAttrib('required', true)
                .appendEventListener('focus', function(e) 
                {
                    showExistingMakes(e)
                })
                .appendEventListener('change', function(e)
                {  
                    let select = e.target
                    let modelSelect = document.getElementById(select.id.split('make').join('model'));
                    modelSelect.removeAttrib('disabled')  
                    query = `SELECT DISTINCT model FROM vehicletype WHERE make = '${select.value}'`
                    executeQuery(query)
                    .then((data) =>
                    {                    
                        while (modelSelect.firstChild) 
                        {
                            modelSelect.removeChild(modelSelect.firstChild);
                        }  
                        data.forEach(model =>
                        {
                            modelSelect.addChild(
                                document.createElement('option')
                                .changeAttrib('value', model.model)
                                .setInnerHTML(model.model)
                                
                            )
                        })  
                    })
                })//end appendEventlistener
            )
        )
        // model column
        .addChild(
            document.createElement('div')
            .addClass('col-3')
            // select input
            .addChild( 
                document.createElement('select')
                .addClass('form-select form-input model-select')
                .changeAttrib('id', "vehicle-select[" + newRowNum + "]['model']")
                .changeAttrib('name', "vehicle-select[" + newRowNum + "]['model']")
                .changeAttrib('disabled', 'disabled') 
            )//end add child
        )//end add child
        // close button (to delete the row)
        .addChild(
            document.createElement('div')
            .addClass('col-1')
            // the button itself
            .addChild(
                document.createElement('button')
                .addClass('btn-close')
                .changeAttrib('type', 'button')
                // event listener to delete the row
                .appendEventListener('click', function()
                {
                    let currentHiddenInput = document.getElementById('make-model-row-num')
                    let currentNumInputs = Number(hiddenInput.getAttribute('num-inputs'))

                    // if there is only one input row left, delete the label row as well and reset the hidden input's values
                    if(currentNumInputs == 1)
                    {
                        currentHiddenInput.setAttribute('value', '-1')
                        removeTarget('#make-model-labels')
                    }
                    removeTarget('#' + row.id) 
                    currentHiddenInput.setAttribute('num-inputs', currentNumInputs - 1)
                })
            )
        )
    
    // append the row to the document, above the add button
    document.getElementById('model-add-btn').insertAdjacentElement('beforebegin', row)

    // increment the relevent attributes in the hidden input
    hiddenInput.changeAttrib('value', newRowNum)
        .changeAttrib('num-inputs', numInputs + 1)
}

// this function is for adding a new set of rental duration inputs on the rental preferences view
function addDuration()
{
    // get the information from the hidden input
        // hidden input
    var hiddenInput = document.getElementById('duration-row-num')
        // current row number
    var currentRow = Number(hiddenInput.getAttribute('value'))
    var newRowNum = currentRow + 1
        // # of present inputs
    var numInputs = Number(hiddenInput.getAttribute('num-inputs'))


    var row, labelRow, label, select // variables used in row and input creation
    // if the row is the first to be made (current row number = -1), create another for the labels first and append it
    if(currentRow == -1)
    {
        // create the row 
        labelRow = document.createElement('div')
            .addClass('row mb-1 justify-content-center')
            .changeAttrib('id', 'duration-labels')
            // duration column
            .addChild(
                document.createElement('div')
                .addClass('col-3')
                // label text
                .addChild(
                    document.createElement('p')
                    .addClass('form-label')
                    .setInnerHTML('Duration')
                )
            ) 

        // append to document
        hiddenInput.insertAdjacentElement('afterend', labelRow)
    }

    // create the row with ids and names based on the row number
    // create the row 
    row = document.createElement('div')
        .addClass('row mb-3')
        .changeAttrib('id', 'duration-row-' + newRowNum)
        // spacer column
        .addChild(
            document.createElement('div')
            .addClass('col-4')
        )
        // input group column
        .addChild(
            document.createElement('div')
            .addClass('col-4')
            // input group
            .addChild(
                document.createElement('div')
                .addClass('input-group')
                // number input
                .addChild(
                    document.createElement('input')
                    .addClass('form-control form-input')
                    .changeAttrib('type', 'number')
                    .changeAttrib('min', '1')
                    .changeAttrib('name', 'duration-select[' + newRowNum + '][number]')
                    .changeAttrib('id', 'duration-select[' + newRowNum + '][number]')
                    .changeAttrib('value', 1)
                )
                // select input
                .addChild(
                    document.createElement('select')
                    .addClass('form-select form-input')
                    .changeAttrib('name', 'duration-select[' + newRowNum + '][select]')
                    .changeAttrib('id', 'duration-select[' + newRowNum + '][select]')
                    // options
                    .addChild(
                        document.createElement('option').changeAttrib('value', 'hours').setInnerHTML('Hours')
                    )
                    .addChild(
                        document.createElement('option').changeAttrib('value', 'days').setInnerHTML('Days')
                    )
                    .addChild(
                        document.createElement('option').changeAttrib('value', 'weeks').setInnerHTML('Weeks')
                    )
                )
            )
        )
        // close button (to delete the row)
        .addChild(
            document.createElement('div')
            .addClass('col-1')
            // the button itself
            .addChild(
                document.createElement('button')
                .addClass('btn-close')
                .changeAttrib('type', 'button')
                // event listener to delete the row
                .appendEventListener('click', function()
                {
                    let currentHiddenInput = document.getElementById('duration-row-num')
                    let currentNumInputs = Number(hiddenInput.getAttribute('num-inputs'))

                    // if there is only one input row left, delete the label row as well and reset the hidden input's values
                    if(currentNumInputs == 1)
                    {
                        currentHiddenInput.setAttribute('value', '-1')
                        removeTarget('#duration-labels')
                    }
                    removeTarget('#' + row.id)
                    currentHiddenInput.setAttribute('num-inputs', currentNumInputs - 1)
                })
            )
        )
    
    // append the row to the document, above the add button
    document.getElementById('duration-add-btn').insertAdjacentElement('beforebegin', row)

    // increment the relevent attributes in the hidden input
    hiddenInput.changeAttrib('value', newRowNum)
        .changeAttrib('num-inputs', numInputs + 1)
}//end addDuration

// this function is for adding a new set of rental duration inputs on the rental preferences view
function addPickup()
{
    // get the information from the hidden input
        // hidden input
    var hiddenInput = document.getElementById('pickup-row-num')
        // current row number
    var currentRow = Number(hiddenInput.getAttribute('value'))
    var newRowNum = currentRow + 1
        // # of present inputs
    var numInputs = Number(hiddenInput.getAttribute('num-inputs'))


    var row, labelRow, label, select // variables used in row and input creation
    // if the row is the first to be made (current row number = -1), create another for the labels first and append it
    if(currentRow == -1)
    {
        // create the row 
        labelRow = document.createElement('div')
            .addClass('row mb-1 justify-content-center')
            .changeAttrib('id', 'pickup-labels')
            // duration column
            .addChild(
                document.createElement('div')
                .addClass('col-3')
                // label text
                .addChild(
                    document.createElement('p')
                    .addClass('form-label')
                    .setInnerHTML('Location')
                )
            )

        // append to document
        hiddenInput.insertAdjacentElement('afterend', labelRow)
    }

    // create the row with ids and names based on the row number
    // create the row 
    row = document.createElement('div')
        .addClass('row mb-3')
        .changeAttrib('id', 'pickup-row-' + newRowNum)
        // spacer column
        .addChild(
            document.createElement('div')
            .addClass('col-3')
        )
        // input column
        .addChild(
            document.createElement('div')
            .addClass('col-6')
            // input element
            .addChild(
                document.createElement('input')
                .addClass('form-control form-input')
                .changeAttrib('type', 'text')
                .changeAttrib('name', 'pickup-select[' + newRowNum + ']')
                .changeAttrib('id', 'pickup-select[' + newRowNum + ']')
                .changeAttrib('pattern', '\\w[\\w\\s,\\.\\(\\)]*') //new RegExp('\\w[\\w\\s,\\.\\(\\)]*'))
                .changeAttrib('required', true) //user has to enter something into this field sice it is a primary key for the table
            )
        )
        // close button (to delete the row)
        .addChild(
            document.createElement('div')
            .addClass('col-1')
            // the button itself
            .addChild(
                document.createElement('button')
                .addClass('btn-close')
                .changeAttrib('type', 'button')
                // event listener to delete the row
                .appendEventListener('click', function()
                {
                    let currentHiddenInput = document.getElementById('pickup-row-num')
                    let currentNumInputs = Number(hiddenInput.getAttribute('num-inputs'))

                    // if there is only one input row left, delete the label row as well and reset the hidden input's values
                    if(currentNumInputs == 1)
                    {
                        currentHiddenInput.setAttribute('value', '-1')
                        removeTarget('#pickup-labels')
                    }
                    removeTarget('#' + row.id)
                    currentHiddenInput.setAttribute('num-inputs', currentNumInputs - 1)
                })
            )
        )
    
    // append the row to the document, above the add button
    document.getElementById('pickup-add-btn').insertAdjacentElement('beforebegin', row)

    // increment the relevent attributes in the hidden input
    hiddenInput.changeAttrib('value', newRowNum)
        .changeAttrib('num-inputs', numInputs + 1)
    
}

// this function is for adding a new dropoff location input on the rental preferences view
function addDropoff()
{
    // get the information from the hidden input
        // hidden input
    var hiddenInput = document.getElementById('dropoff-row-num')
        // current row number
    var currentRow = Number(hiddenInput.getAttribute('value'))
    var newRowNum = currentRow + 1
        // # of present inputs
    var numInputs = Number(hiddenInput.getAttribute('num-inputs'))


    var row, labelRow, label, select // variables used in row and input creation
    // if the row is the first to be made (current row number = -1), create another for the labels first and append it
    if(currentRow == -1)
    {
        // create the row 
        labelRow = document.createElement('div')
            .addClass('row mb-1 justify-content-center')
            .changeAttrib('id', 'dropoff-labels')
            // duration column
            .addChild(
                document.createElement('div')
                .addClass('col-3')
                // label text
                .addChild(
                    document.createElement('p')
                    .addClass('form-label')
                    .setInnerHTML('Location')
                )
            )

        // append to document
        hiddenInput.insertAdjacentElement('afterend', labelRow)
    }

    // create the row with ids and names based on the row number
    // create the row 
    row = document.createElement('div')
        .addClass('row mb-3')
        .changeAttrib('id', 'dropoff-row-' + newRowNum)
        // spacer column
        .addChild(
            document.createElement('div')
            .addClass('col-3')
        )
        // input column
        .addChild(
            document.createElement('div')
            .addClass('col-6')
            // input element
            .addChild(
                document.createElement('input')
                .addClass('form-control form-input')
                .changeAttrib('type', 'text')
                .changeAttrib('name', 'dropoff-select[' + newRowNum + ']')
                .changeAttrib('id', 'dropoff-select[' + newRowNum + ']')
                .changeAttrib('pattern', '\\w[\\w\\s,\\.\\(\\)]*') //new RegExp('\\w[\\w\\s,\\.\\(\\)]*'))
                .changeAttrib('required', true) //user has to enter something into this field sice it is a primary key for the table
            )
        )
        // close button (to delete the row)
        .addChild(
            document.createElement('div')
            .addClass('col-1')
            // the button itself
            .addChild(
                document.createElement('button')
                .addClass('btn-close')
                .changeAttrib('type', 'button')
                // event listener to delete the row
                .appendEventListener('click', function()
                {
                    let currentHiddenInput = document.getElementById('dropoff-row-num')
                    let currentNumInputs = Number(hiddenInput.getAttribute('num-inputs'))

                    // if there is only one input row left, delete the label row as well and reset the hidden input's values
                    if(currentNumInputs == 1)
                    {
                        currentHiddenInput.setAttribute('value', '-1')
                        removeTarget('#dropoff-labels')
                    }
                    removeTarget('#' + row.id)
                    currentHiddenInput.setAttribute('num-inputs', currentNumInputs - 1)
                })
            )
        )
    
    // append the row to the document, above the add button
    document.getElementById('dropoff-add-btn').insertAdjacentElement('beforebegin', row)

    // increment the relevent attributes in the hidden input
    hiddenInput.changeAttrib('value', newRowNum)
        .changeAttrib('num-inputs', numInputs + 1)
    
}

// this function searches the customer table for matching records and displays them
function searchCustomer()
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

    // log(searchFields)
    //     license-search-input
    // phone-search-input
    // email-search-input

    // execute the query and get the returned records               '%$POST['Event_start_date']%'
    let query = `SELECT * FROM customer WHERE first_name LIKE '%${searchFields['fname-search-input']}%' AND middle_name LIKE '%${searchFields['mname-search-input']}%' AND last_name LIKE '%${searchFields['lname-search-input']}%' AND license_number LIKE '%${searchFields['license-search-input']}%' AND phone_number LIKE '%${searchFields['phone-search-input']}%' AND email LIKE '%${searchFields['email-search-input']}%';`
    log(query)
    executeQuery(query)
    // create the accordion items with the returned records
    .then((data) => {
        log("data recieved 1")

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
        let query = `SELECT make, model FROM VehicleTypePreference WHERE cust_ID = "${record['cust_ID']}"`
        executeQuery(query)
        .then((myTypeData) =>
        {
            typeData = myTypeData
            let query = `SELECT amount, unit FROM rentalDurationPreference WHERE cust_ID = "${record['cust_ID']}"`
            return executeQuery(query)
        })
        .then((myDurationData) => 
        {
            durationData = myDurationData
            let query = `SELECT location FROM pickupLocationPreference WHERE cust_ID = "${record['cust_ID']}"`
            return executeQuery(query)
        })
        .then((myPickupData) => 
        {
            pickupData = myPickupData
            let query = `SELECT location FROM dropoffLocationPreference WHERE cust_ID = "${record['cust_ID']}"`
            return executeQuery(query)
        })
        .then((dropoffData) =>
        {
            // come back and rename this
            var typeText = `<div class="col-6 text-center"><p class="h6 fw-bold">Vehicle Types</p>`
            typeData.forEach((type) =>
            {
                typeText += `<p>${type['make']} ${type['model']}</p>`
            })
            typeText += '</div>'

            var durationText = `<div class="col-6 text-center"><p class="h6 fw-bold">Rental Durations</p>`
            durationData.forEach((duration) =>
            {
                durationText += `<p>${duration['amount']} ${duration['unit']}</p>`
            })
            durationText += '</div>'

            var pickupText = `<div class="col-6 text-center"><p class="h6 fw-bold">Pickup Locations</p>`
            pickupData.forEach((pickup) =>
            {
                pickupText += `<p>${pickup['location']}</p>`
            })
            pickupText += '</div>'

            var dropoffText = `<div class="col-6 text-center"><p class="h6 fw-bold">Dropoff Location</p>`
            dropoffData.forEach((dropoff) =>
            {
                dropoffText += `<p>${dropoff['location']}</p>`
            })
            dropoffText += '</div>'


            
            var accordionItem = document.createElement('div').addClass('accordion-item').changeAttrib("id", `accordion-item-${record['cust_ID']}`)
            .setInnerHTML(`
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-${record['cust_ID']}" aria-expanded="true" aria-controls="collapseOne">
                        <div class="container">
                            <div class="row"><span class="col-4"><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</span><span class="col-5">License #: ${record['license_number']}</span></div>
                        </div>
                        </button>
                    </h2>
                    <div id="accordion-collapse-${record['cust_ID']}" class="accordion-collapse collapse">
                        <!-- CONTACT INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Contact Information
                                <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content current-customer-buttons-${record['cust_ID']}" toggle-target="#contact-information-view-${record['cust_ID']},#contact-information-edit-${record['cust_ID']}"><i class="bi bi-pencil-square pe-none"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="contact-information-view-${record['cust_ID']}">
                                <div class="row">
                                    <div class="col-6">
                                        <p><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</p>
                                        <p><i class="bi bi-house-door-fill pe-1"></i>${record['address1']} ${record['address2']}</p>
                                    </div>
                                    <div class="col-6">
                                        <p><i class="bi bi-telephone pe-1"></i>${record['phone_number']}</p>
                                        <p><i class="bi bi-envelope pe-1"></i>${record['email']}</p>
                                    </div>
                                </div>
                            </div>
                            <form id="contact-information-edit-${record['cust_ID']}" class="d-none contact-information-edit">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="fname-edit" class="form-label">Name</label>
                                        <div class="input-group">
                                            <input type="text" name="fname-edit" id="fname-edit" class="form-control form-input" placeholder="First Name" value="${record['first_name']}" pattern="[a-zA-Z-]+">
                                            <input type="text" name="mname-edit" id="mname-edit" class="form-control form-input" placeholder="Middle Name" value="${record['middle_name']}" pattern="[a-zA-Z-]*">
                                            <input type="text" name="lname-edit" id="lname-edit" class="form-control form-input" placeholder="Last Name" value="${record['last_name']}" pattern="[a-zA-Z-]*">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <label for="phone-edit" class="form-label">Phone Number</label>
                                        <input type="tel" name="phone-edit" id="phone-edit" class="form-control form-input" placeholder="Phone" value="${record['phone_number']}" pattern="(\\+?\\d?\\s?\\(?(\\d{3})*\\)?\\s?\\d{3}-?\\d{4})*">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Address</label>
                                        <input type="text" class="form-control form-input" name="address1-edit" id="address1-edit" placeholder="Address Line 1" value="${record['address1']}" pattern="\\w[&#\\w\\s,\\.\\(\\)]*">
                                        <input type="text" class="form-control form-input mt-1" name="address2-edit" id="address2-edit" placeholder="Address Line 2" value="${record['address2']}" pattern="\\w[&#\\w\\s,\\.\\(\\)]*">
                                    </div>
                                    <div class="col-6">
                                        <label for="email-edit" class="form-label">Email</label>
                                        <input type="email" name="email-edit" id="email-edit" class="form-control form-input" placeholder="Email" value="${record['email']}">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- DIRVER'S LICENSE INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Driver's License Information
                                <span class="tt" data-bs-placement="right" title="Edit Driver's License Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content current-customer-buttons-${record['cust_ID']}" toggle-target="#drivers-license-view-${record['cust_ID']},#drivers-license-edit-${record['cust_ID']}"><i class="bi bi-pencil-square pe-none"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="drivers-license-view-${record['cust_ID']}">
                                <div class="row">
                                    <div class="col-6">
                                        <p><span class="fw-bold">License # </span>${record['license_number']}</p>
                                        <p><span class="fw-bold">Issuing Province </span>${record['issuing_province']}</p>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="fw-bold">Expiration Date </span>${record['license_exp']}</p>
                                    </div>
                                </div>
                            </div>
                            <form id="drivers-license-edit-${record['cust_ID']}" class="d-none drivers-license-edit">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="license-number-edit" class="form-label">License Number</label>
                                        <input type="text" name="license-number-edit" id="license-number-edit" class="form-control" placeholder="License Number" value="${record['license_number']}">
                                    </div>
                                    <div class="col-3">
                                        <label for="license-exp-edit" class="form-label">Exipiration Date</label>
                                        <input type="date" name="license-exp-edit" id="license-exp-edit" class="form-control" value="${record['license_exp']}">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Issuing Province</label>
                                        <input type="text" class="form-control" name="province-edit" id="province-edit" placeholder="Issuing Province" value="${record['issuing_province']}">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- PAYMENT INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Payment Information
                                <span class="tt" data-bs-placement="right" title="Edit Payment Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content current-customer-buttons-${record['cust_ID']}" toggle-target="#payment-information-view-${record['cust_ID']},#payment-information-edit-${record['cust_ID']}"><i class="bi bi-pencil-square pe-none"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="payment-information-view-${record['cust_ID']}">
                                <div class="row">
                                    <div class="col-6">
                                        <p><i class="bi bi-credit-card-fill pe-1"></i>${record['card_type']}</p>
                                        <p><i class="bi bi-credit-card-fill pe-1"></i>${record['card_number']}</p>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="fw-bold">Expiration Date </span>${record['card_exp']}</p>
                                        <p><i class="bi bi-box2-fill pe-1"></i>${record['billing_address1']} ${record['billing_address2']}</p>
                                    </div>
                                </div>
                            </div>
                            <form id="payment-information-edit-${record['cust_ID']}" class="d-none payment-information-edit">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="fname-edit" class="form-label">Card Type</label>
                                        <select name="card-type-edit" id="card-type-edit" class="form-select form-input">
                                            <option value="visa">Visa</option>
                                            <option value="credit">Credit</option>
                                            <option value="debit">Debit</option>
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <label for="card-exp-edit" class="form-label">Expiration Date</label>
                                        <input type="date" name="card-exp-edit" id="card-exp-edit" class="form-control" value="${record['card_exp']}">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Card Number</label>
                                        <input type="text" class="form-control" name="card-number-edit" id="card-number-edit" placeholder="Card Number" value="${record['card_number']}">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-input">Billing Address</label>
                                        <input type="text" class="form-control" name="billing-address1-edit" id="billing-address1-edit" placeholder="Address Line 1" value="${record['billing_address1']}">
                                        <input type="text" class="form-control mt-1" name="billing-address2-edit" id="billing-address2-edit" placeholder="Address Line 2" value="${record['billing_address2']}">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- RENTAL PREFERENCES -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Rental Preferences
                                <span class="tt" data-bs-placement="right" title="Edit Rental Preferences">
                                    <button type="button" class="btn btn-success btn-sm toggle-content current-customer-buttons-${record['cust_ID']}" toggle-target="#rental-preferences-view,#rental-preferences-edit"><i class="bi bi-pencil-square pe-none"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="rental-preferences-view">
                                <div class="row">
                                    ${typeText}
                                    ${durationText}
                                </div>
                                <div class="row mt-3">
                                    ${pickupText}
                                    ${dropoffText}
                                </div>
                            </div>
                            <div id="rental-preferences-edit">
                                <div class="row">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- SPACER ELEMENT -->
                    <div class="my-2"></div>
            `)
            div.addChild(accordionItem)

            //Get all the buttons new buttons added to the records returned from the query and add the event listener on it
            //buttons in accordion have this class so add a event listener to them once they are returned
            let newButtons = accordionItem.querySelectorAll(`.toggle-content`) 
            newButtons.forEach(newButton =>
            {
                newButton.addEventListener('click', toggleListener)
                // newButton.addEventListener('click', function(e)  //basically same stuff in shared scripts
                // {
                //     let targetQuery = e.target.getAttribute('toggle-target')
                //     let targets = document.querySelectorAll(targetQuery)
                //     targets.forEach(target => 
                //     {
                //         toggleDisplay(target)
                //     })
                // })    
            })

            addEditFormListeners()
            // log(1111)
            // return
        }) //end dropoffdata
        .catch((reason) => 
        {
            console.error(reason)
            var accordionItem = document.createElement('div').addClass('accordion-item').changeAttrib("id", `accordion-item-${record['cust_ID']}`)
            .setInnerHTML(`
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-collapse-" aria-expanded="true" aria-controls="collapseOne">
                        <span class="me-5"><i class="bi bi-file-person pe-1"></i></span><span class="">License #: </span>
                        </button>
                    </h2>
                    <div id="accordion-collapse-" class="accordion-collapse collapse">
                        <!-- CONTACT INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Contact Information
                                <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#contact-information-view-,#contact-information-edit-"><i class="bi bi-pencil-square"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="contact-information-view-">
                                <div class="row">
                                    <div class="col-6">
                                        <p><i class="bi bi-file-person pe-1"></i></p>
                                        <p><i class="bi bi-house-door-fill pe-1"></i></p>
                                    </div>
                                    <div class="col-6">
                                        <p><i class="bi bi-telephone pe-1"></i></p>
                                        <p><i class="bi bi-envelope pe-1"></i></p>
                                    </div>
                                </div>
                            </div>
                            <form id="contact-information-edit-" class="d-none">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="fname-edit" class="form-label">Name</label>
                                        <div class="input-group">
                                            <input type="text" name="fname-edit" id="fname-edit" class="form-control" placeholder="First Name" value="">
                                            <input type="text" name="mname-edit" id="mname-edit" class="form-control" placeholder="Middle Name" value="">
                                            <input type="text" name="lname-edit" id="lname-edit" class="form-control" placeholder="Last Name" value="">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <label for="phone-edit" class="form-label">Phone Number</label>
                                        <input type="tel" name="phone-edit" id="phone-edit" class="form-control" placeholder="Phone" value="">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Address</label>
                                        <input type="text" class="form-control" name="address1-edit" id="address1-edit" placeholder="Address Line 1" value="">
                                        <input type="text" class="form-control mt-1" name="address2-edit" id="address2-edit" placeholder="Address Line 2" value="">
                                    </div>
                                    <div class="col-6">
                                        <label for="email-edit" class="form-label">Email</label>
                                        <input type="email" name="email-edit" id="email-edit" class="form-control" placeholder="Email" value="">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- DIRVER'S LICENSE INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Driver's License Information
                                <span class="tt" data-bs-placement="right" title="Edit Driver's License Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#drivers-license-view-,#drivers-license-edit-"><i class="bi bi-pencil-square"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="drivers-license-view-">
                                <div class="row">
                                    <div class="col-6">
                                        <p><span class="fw-bold">License # </span></p>
                                        <p><span class="fw-bold">Issuing Province </span></p>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="fw-bold">Expiration Date </span></p>
                                    </div>
                                </div>
                            </div>
                            <form id="drivers-license-edit-" class="d-none">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="license-number-edit" class="form-label">License Number</label>
                                        <input type="text" name="license-number-edit" id="license-number-edit" class="form-control" placeholder="License Number" value="">
                                    </div>
                                    <div class="col-3">
                                        <label for="license-exp-edit" class="form-label">Exipiration Date</label>
                                        <input type="date" name="license-exp-edit" id="license-exp-edit" class="form-control" value="">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Issuing Province</label>
                                        <input type="text" class="form-control" name="province-edit" id="province-edit" placeholder="Issuing Province" value="">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- PAYMENT INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Payment Information
                                <span class="tt" data-bs-placement="right" title="Edit Payment Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#payment-information-view-,#payment-information-edit-"><i class="bi bi-pencil-square"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="payment-information-view-">
                                <div class="row">
                                    <div class="col-6">
                                        <p><i class="bi bi-credit-card-fill pe-1"></i></p>
                                        <p><i class="bi bi-credit-card-fill pe-1"></i></p>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="fw-bold">Expiration Date </span></p>
                                        <p><i class="bi bi-box2-fill pe-1"></i></p>
                                    </div>
                                </div>
                            </div>
                            <form id="payment-information-edit-" class="d-none">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="fname-edit" class="form-label">Card Type</label>
                                        <select name="card-type-edit" id="card-type-edit" class="form-select form-input">
                                            <option value="visa">Visa</option>
                                            <option value="credit">Credit</option>
                                            <option value="debit">Debit</option>
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <label for="card-exp-edit" class="form-label">Expiration Date</label>
                                        <input type="date" name="card-exp-edit" id="card-exp-edit" class="form-control" value="">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Card Number</label>
                                        <input type="text" class="form-control" name="card-number-edit" id="card-number-edit" placeholder="Card Number" value="">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-input">Billing Address</label>
                                        <input type="text" class="form-control" name="billing-address1-edit" id="billing-address1-edit" placeholder="Address Line 1" value="">
                                        <input type="text" class="form-control mt-1" name="billing-address2-edit" id="billing-address2-edit" placeholder="Address Line 2" value="">
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-3">
                                    <div class="col-3 text-center">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-5">
                            <hr class="w-75 m-auto">
                        </div>
                        <!-- RENTAL PREFERENCES -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Rental Preferences
                                <span class="tt" data-bs-placement="right" title="Edit Rental Preferences">
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#rental-preferences-view,#rental-preferences-edit"><i class="bi bi-pencil-square"></i></button>
                                </span>
                            </p>
                        </div>
                        <div class="container">
                            <div id="rental-preferences-view">
                                <div class="row">
                                </div>
                                <div class="row mt-3">
                                </div>
                            </div>
                            <div id="rental-preferences-edit">
                                <div class="row">
                                </div>
                            </div>
                        </div>
                    </div>
            `)
            div.addChild(accordionItem)
            accordionItem.remove() //you can take this out
        })
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
    //addEditFormListeners()

    // append the newly created search result div
    accordion.addChild(div)

    //log("data recieved 1.1")

    //return("done")
}//end makeSearchResults


function addEditFormListeners() 
{
    // contact info edit listeners
    var contactForms = document.querySelectorAll('.contact-information-edit') 
    contactForms.forEach((form) =>
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault()

            // get the current form
            let form = e.target
            
            // get the user id from the form id
            let custID = form.id.replace('contact-information-edit-', '')
            log(custID)
            // get the form data
            let formData = new FormData(form)

            // create the query with the form data
            let query = `UPDATE customer SET first_name = '${formData.get('fname-edit')}', middle_name = '${formData.get('mname-edit')}', last_name = '${formData.get('lname-edit')}', phone_number = '${formData.get('phone-edit')}', address1 = '${formData.get('address1-edit')}', address2 = '${formData.get('address2-edit')}', email = '${formData.get('email-edit')}' WHERE cust_ID = '${custID}'`

            log(query)
            // //JAMAINE ADDED IN THE WHERE CLAUSE, CHANGE IT BACK IF YOU DON"T WANT IT YET
            // //AND MAYBE YOU CAN CALL THE makesearchResults() FUNCTION AGAIN AFTER THIS QUERY TO SHOW THE UPDATES TO THE USER IN THE ACCORDION  
            // // execute the query
            executeQuery(query)
            .then((result) =>
            {
                log(result)
                searchCustomer() // refresh the search to get the updated database
            })
            .catch((reason) =>
            {
                console.error(reason)
            })
        })
    })//end for each

    //---------- LICENSE NUMBER FORM --------//
    var licenseForms = document.querySelectorAll('.drivers-license-edit') //can maybe use getElementByID since it will be added one at a time (idk I'm very sleepy rn)
    licenseForms.forEach((form) =>
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault()

            // get the current form
            let form = e.target
            
            // get the user id from the form id
            let custID = form.id.replace('drivers-license-edit-', '')
            log(custID)

            let formData = new FormData(form)

            //creating query
            query = `UPDATE customer SET license_number = '${formData.get('license-number-edit')}', license_exp = '${formData.get('license-exp-edit')}', issuing_province = '${formData.get('province-edit')}' WHERE cust_ID = '${custID}'`
            log(query)
            //executeQuery(query)
            executeQuery(query)
            .then((result) =>
            {
                log(result)
                searchCustomer()
            })
            .catch((reason) =>
            {
                console.error(reason)
            })
        })//end eventlistener
    })//end foreach (license forms)

    //------- PAYMENT INFORMAITON FORM ------//
    var paymentForms = document.querySelectorAll('.payment-information-edit')
    paymentForms.forEach((form) =>
    {
        form.addEventListener('submit', function(e)
        {
            e.preventDefault()

            // get the current form
            let form = e.target
            
            // get the user id from the form id
            let custID = form.id.replace('payment-information-edit-', '')
            log(custID)

            let formData = new FormData(form)

            query = `UPDATE customer SET card_number = '${formData.get('card-number-edit')}', card_type = '${formData.get('card-type-edit')}', card_exp = '${formData.get('card-exp-edit')}', billing_address1 = '${formData.get('billing-address1-edit')}', billing_address2 = '${formData.get('billing-address2-edit')}' WHERE cust_ID = '${custID}'`
            log(query)
            //executeQuery(query)
            executeQuery(query)
            .then((result) =>
            {
                log(result)
                searchCustomer()
            })
            .catch((reason) =>
            {
                console.error(reason)
            })
        })//end eventlistener
    })//end forEach (payment form)
}


// //function to change the message that will be displayed by the modal
// function updateModal(modal, message, status = true)
// {   
//     modal.addClass('text-success') // make the text green to show success
//     if(status === false)
//     {
//         modal.addClass('text-danger') //make text red to show error
//     }
//     modal.setInnerText(message)
// }//end update modal
