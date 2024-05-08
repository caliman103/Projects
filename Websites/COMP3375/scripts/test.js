document.onreadystatechange = function()
{
    if(document.readyState === 'complete')
    {
        document.getElementById('outer').remove()
        addListeners()
        selectQuery()
        makeThing()
        generatetext()
      
    }
}
 
Element.prototype.addClass = function(classText)
{
    let classes = classText.split(" ") // split using space as separator
    this.classList.add(...classes) // use the spread operator to pass the entire array as multiple parameters
    return this // return this to allow function chaining
}

Element.prototype.removeClass = function(classText) // removes classes
{
    let classes = classText.split(" ") // split using space as separator
    this.classList.remove(...classes) // use the spread operator to pass the entire array as multiple parameters
    return this // return this to allow function chaining
}

Element.prototype.changeAttrib = function(attribute, value) // sets attribute
{
    this.setAttribute(String(attribute), String(value))
    return this // return this to allow function chaining
}

Element.prototype.addChild = function(child) // appends new children
{
    this.appendChild(child)
    return this
}

function makeThing()
{
    
}


function selectQuery()
{
    let buttons = document.querySelectorAll(".select-vehicletype")
    buttons.forEach (button => 
    {
        button.addEventListener('click', function(e)
        {
            // let query = 'SELECT * FROM customer WHERE cust_ID > 43 AND cust_ID < 50'
            // executeQuery(query)
            // .then((data) => {
            //     document.getElementById('thingy-bingy')
            //     log(data)
            // })
            location.reload()
        })
    
    })//end foreach
}

function generatetext()
{
    document.getElementById('modal-button').addEventListener('click', function(e)
    {
        //let message = 'Customer Successfully Added. Thank You'
        let message = 'Looks like something went wrong, please try again'
        document.getElementById('test-modal')
        .setInnerText(message)
        .addClass('text-success')
        log('in')
    })
}//end generatetext


function addListeners()
{
    // button.addEventListener()
}

function executeQuery_Old(query)
{
    let formData = new FormData()
    formData.append('query', query)
    return fetch('../scripts/query.php', {
        method : 'POST',
        body : formData
    })
    .then((response) => response.json())
}//end executeQuery


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

            /*
            accordion
            .addChild(
                document.createElement('div')
                .addClass('accordion-item pb-4')
                // create the accordion-header
                .addChild(
                    document.createElement('h2')
                    .addClass('accordion-header')
                    // add the collapse button
                    .addChild(
                        document.createElement('button')
                        .addClass('accordion-button collapsed')
                        .changeAttrib('type', 'button')
                        .changeAttrib('data-bs-toggle', 'collapse')
                        .changeAttrib('data-bs-target', `[id='accordion-collapse[${record['cust_ID']}]']`)
                        // add the container for the row
                        .addChild(
                            document.createElement('div')
                            .addClass('container')
                            // add the div for the row
                            .addChild(
                                document.createElement('div')
                                .addClass('row')
                                // add the spans with the content
                                // span for name
                                .addChild(
                                    document.createElement('span')
                                    .addClass('col-4')
                                    // add the name text
                                    .setInnerText(
                                        `${record['first_name']} ${record['middle_name']} ${record['last_name']}`
                                    )
                                    // add the icon
                                    .appendAdjacentElement('afterbegin',
                                        document.createElement('i')
                                        .addClass('bi bi-file-person pe-1')
                                    )
                                )
                                // span for license number
                                .addChild(
                                    document.createElement('span')
                                    .addClass('col-4')
                                    // add the license text
                                    .setInnerText(
                                        `${record['license_number']}`
                                    )
                                    // add the icon
                                    .appendAdjacentElement('afterbegin',
                                        document.createElement('i')
                                        .addClass('bi bi-file-person pe-1')
                                    )
                                )
                            )
                        )
                    )
                )
                // create the accordion collapse div
                .addChild(
                    document.createElement('div')
                    .changeAttrib('id', `accordion-collapse[${record['cust_ID']}]`)
                    .addClass('accordion-collapse collapse')
                    // create the contact information section header
                    .addChild(
                        document.createElement('div')
                        .addClass('text-center mt-3')
                        // p elem to hold text
                        .addChild(
                            document.createElement('p')
                            .addClass('h5')
                            .setInnerText('Contact Information')
                            // span to hold edit button
                            .appendAdjacentElement('beforeend', 
                                document.createElement('span')
                                .addClass('tt')
                                .changeAttrib('data-bs-placement', 'right')
                                .changeAttrib('title', 'Edit Contact Information')
                                // add the button to edit
                                .addChild(
                                    document.createElement('button')
                                    .addClass('btn btn-success btn-sm toggle-content')
                                    .changeAttrib('type', 'button')
                                    .changeAttrib('toggle-target', `[id='contact-information-view[${record['cust_ID']}]'],[id='contact-information-edit[${record['cust_ID']}]']`)
                                    // add the icon
                                    .addChild(
                                        document.createElement('i')
                                        .addClass('bi bi-pencil-square')
                                    )
                                )
                            )
                        )
                    )
                    // Create the container to hold the contact information view and edit sections
                    .addChild(
                        document.createElement('div')
                        .addClass('container')
                        // create the contact info view section
                        .addChild(
                            document.createElement('div')
                            .changeAttrib('id', `contact-information-view[${record['cust_ID']}]`)
                            // create the row
                            .addChild(
                                document.createElement('div')
                                .addClass('row')
                                // create the col for name and address
                                .addChild(
                                    document.createElement('div')
                                    .addClass('col-6')
                                    // add the p for the name
                                    .addChild(
                                        document.createElement('p')
                                        // add the name text
                                        .setInnerText(
                                            `${record['first_name']} ${record['middle_name']} ${record['last_name']}`
                                        )
                                        // add the icon
                                        .appendAdjacentElement('afterbegin',
                                            document.createElement('i')
                                            .addClass('bi bi-file-person pe-1')
                                        )
                                    )
                                    // add the p for the address
                                    .addChild(
                                        document.createElement('p')
                                        // add the address text
                                        .setInnerText(
                                            `${record['address1']} ${record['address2']}`
                                        )
                                        // add the icon
                                        .appendAdjacentElement('afterbegin',
                                            document.createElement('i')
                                            .addClass('bi bi-house-door-fill pe-1')
                                        )
                                    )
                                )
                                // create the col for phone and email
                                .addChild(
                                    document.createElement('div')
                                    .addClass('col-6')
                                    // add the p for the phone
                                    .addChild(
                                        document.createElement('p')
                                        // add the phone text
                                        .setInnerText(
                                            `${record['phone_number']}`
                                        )
                                        // add the icon
                                        .appendAdjacentElement('afterbegin',
                                            document.createElement('i')
                                            .addClass('bi bi-telephone pe-1')
                                        )
                                    )
                                    // add the p for the email
                                    .addChild(
                                        document.createElement('p')
                                        // add the email text
                                        .setInnerText(
                                            `${record['email']}`
                                        )
                                        // add the icon
                                        .appendAdjacentElement('afterbegin',
                                            document.createElement('i')
                                            .addClass('bi bi-file-person pe-1')
                                        )
                                    )
                                )
                            )
                        )
                        // create the contact info edit form
                        .addChild(
                            document.createElement('form')
                            .addClass('d-none')
                            .changeAttrib('id', `contact-information-edit[${record['cust_ID']}]`)
                            .changeAttrib('method', 'POST')
                            // create the first row
                            .addChild(
                                document.createElement('div').addClass('row')
                                // add the col for the name
                                .addChild(
                                    document.createElement('div').addClass('col-6')
                                    // add the name label
                                    .addChild(
                                        document.createElement('label').addClass('form-label')
                                        .setInnerText('Name')
                                    )
                                    // add the input group
                                    .addChild(
                                        document.createElement('div').addClass('input-group')
                                        // add the input for first name
                                        .addChild(
                                            document.createElement('input')
                                            .addClass('form-control form-input')
                                            .changeAttrib('type', 'text')
                                            .changeAttrib('name', `fname-edit[${record['cust_ID']}]`)
                                            .changeAttrib('placeholder', 'First Name')
                                            .changeAttrib('value', record['first_name'])
                                        )
                                        // add the input for first name
                                        .addChild(
                                            document.createElement('input')
                                            .addClass('form-control form-input')
                                            .changeAttrib('type', 'text')
                                            .changeAttrib('name', `fname-edit[${record['cust_ID']}]`)
                                            .changeAttrib('placeholder', 'Middle Name')
                                            .changeAttrib('value', record['middle_name'])
                                        )
                                        // add the input for first name
                                        .addChild(
                                            document.createElement('input')
                                            .addClass('form-control form-input')
                                            .changeAttrib('type', 'text')
                                            .changeAttrib('name', `fname-edit[${record['cust_ID']}]`)
                                            .changeAttrib('placeholder', 'Last Name')
                                            .changeAttrib('value', record['last_name'])
                                        )
                                    )
                                )
                                // add the col for the phone number
                                .addChild(
                                    document.createElement('div').addClass('col-6')
                                    // add the phone label
                                    .addChild(
                                        document.createElement('label').addClass('form-label')
                                        .setInnerText('Phone Number')
                                    )
                                    // add the phone input
                                    .addChild(
                                        document.createElement('input').addClass('form-control form-input')
                                        .changeAttrib('type', 'tel')
                                        .changeAttrib('name', `phone-edit[${record['cust_ID']}]`)
                                        .changeAttrib('placeholder', 'Phone Number')
                                        .changeAttrib('value', record['phone_number'])
                                    )
                                )
                            )
                            // create the second row
                            .addChild(
                                document.createElement('div').addClass('row mt-3')
                                // create the col for the address
                                .addChild(
                                    document.createElement('div').addClass('col-6')
                                    // add the address label
                                    .addChild(
                                        document.createElement('label').addClass('form-input').setInnerText('Address')
                                    )
                                    // add the address1 input
                                    .addChild(
                                        document.createElement('input').addClass('form-control form-input')
                                        .changeAttrib('type', 'text')
                                        .changeAttrib('name', `address1-edit[${record['cust_ID']}]`)
                                        .changeAttrib('placeholder', 'Address Line 1')
                                        .changeAttrib('value', record['address1'])
                                    )
                                    // add the address2 input
                                    .addChild(
                                        document.createElement('input').addClass('form-control form-input')
                                        .changeAttrib('type', 'text')
                                        .changeAttrib('name', `address2-edit[${record['cust_ID']}]`)
                                        .changeAttrib('placeholder', 'Address Line 2')
                                        .changeAttrib('value', record['address2'])
                                    )
                                )
                                // create the column for the email
                                .addChild(
                                    document.createElement('div').addClass('col-6')
                                    // add the email label
                                    .addChild(
                                        document.createElement('label').addClass('form-input').setInnerText('Email')
                                    )
                                    // add the email input
                                    .addChild(
                                        document.createElement('input').addClass('form-control form-input')
                                        .changeAttrib('type', 'email')
                                        .changeAttrib('name', `email-edit[${record['cust_ID']}]`)
                                        .changeAttrib('placeholder', 'Email')
                                        .changeAttrib('value', record['email'])
                                    )
                                )
                            )
                            // create the div for the submit button
                            .addChild(
                                document.createElement('div').addClass('text-center mt-3')
                                // create the submit button
                                .addChild(
                                    document.createElement('button')
                                    .addClass('btn btn-primary')
                                    .changeAttrib('type', 'submit')
                                    .setInnerText('Save')
                                )
                            )
                        )
                    )
                    // create the spacer element
                    .addChild(
                        document.createElement('div').addClass('my-5')
                        .setInnerHTML(`<hr class="w-75 m-auto">`)
                    )
                    // create the driver's license information section header
                    .addChild(
                        document.createElement('div').addClass('text-center mt-3')
                        .setInnerHTML(`
                        <p class="h5">
                            Driver's License Information
                            <span class="tt" data-bs-placement="right" title="Edit Driver's License Information">
                                <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="[id='contact-information-view[${record['cust_ID']}]'],[id='contact-information-edit[${record['cust_ID']}]']"><i class="bi bi-pencil-square"></i></button>
                            </span>
                        </p>
                        `)
                    )
                    // create the container to hold the driver's license information view and edit sections
                    .addChild(
                        document.createElement('div').addClass('container')
                        // create the driver's license view
                        .addChild(
                            document.createElement
                        )
                    )
                )
            )
            */


function dateStrToObj(dateStr) 
{
    const [year, month, date] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, date)
}

function onChange() {
    const startDateStr = document.querySelector('#v-rentstart').value //use v-rentstart
    const endDateStr = document.querySelector('#v-rentend').value //use v-rentend

if (!startDateStr || !endDateStr) return

    const startDate = dateStrToObj(startDateStr)
    const endDate = dateStrToObj(endDateStr)
    if (endDate.valueOf() < startDate.valueOf()) 
    {
        console.error('End date is before start date!')
    }
}

document.getElementById('date-button').addEventListener('click', function()
{
    log('works')
    const startDateStr = document.querySelector('#v-rentstart').value //use v-rentstart
    const endDateStr = document.querySelector('#v-rentend').value //use v-rentend

    if (!startDateStr || !endDateStr) return

    const startDate = dateStrToObj(startDateStr)
    const endDate = dateStrToObj(endDateStr)
    if (endDate.valueOf() < startDate.valueOf()) 
    {
        console.error('End date is before start date!')
    }
    else
    {
        log('good')
    }

})
