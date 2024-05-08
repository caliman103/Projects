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
                        <span class="me-5"><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</span><span class="">License #: ${record['license_number']}</span>
                        </button>
                    </h2>
                    <div id="accordion-collapse-${record['cust_ID']}" class="accordion-collapse collapse">
                        <!-- CONTACT INFORMATION -->
                        <div class="text-center mt-3">
                            <p class="h5">
                                Contact Information
                                <span class="tt" data-bs-placement="right" title="Edit Contact Information">
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#contact-information-view-${record['cust_ID']},#contact-information-edit-${record['cust_ID']}"><i class="bi bi-pencil-square"></i></button>
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
                                            <input type="text" name="fname-edit" id="fname-edit" class="form-control form-input" placeholder="First Name" value="${record['first_name']}">
                                            <input type="text" name="mname-edit" id="mname-edit" class="form-control form-input" placeholder="Middle Name" value="${record['middle_name']}">
                                            <input type="text" name="lname-edit" id="lname-edit" class="form-control form-input" placeholder="Last Name" value="${record['last_name']}">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <label for="phone-edit" class="form-label">Phone Number</label>
                                        <input type="tel" name="phone-edit" id="phone-edit" class="form-control form-input" placeholder="Phone" value="${record['phone_number']}">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <label class="form-input">Address</label>
                                        <input type="text" class="form-control form-input" name="address1-edit" id="address1-edit" placeholder="Address Line 1" value="${record['address1']}">
                                        <input type="text" class="form-control form-input mt-1" name="address2-edit" id="address2-edit" placeholder="Address Line 2" value="${record['address2']}">
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
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#drivers-license-view-${record['cust_ID']},#drivers-license-edit-${record['cust_ID']}"><i class="bi bi-pencil-square"></i></button>
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
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#payment-information-view-${record['cust_ID']},#payment-information-edit-${record['cust_ID']}"><i class="bi bi-pencil-square"></i></button>
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
                                    <button type="button" class="btn btn-success btn-sm toggle-content" toggle-target="#rental-preferences-view,#rental-preferences-edit"><i class="bi bi-pencil-square"></i></button>
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
            `)
            div.addChild(accordionItem)

            log(1111)
            return
        })
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
        })
    })

    // clear all of the search results still existing
    while (accordion.firstChild) 
    {
        accordion.removeChild(accordion.firstChild);
    }

    log(2222)

    // re-add the toggle listeners for any new buttons
    addTogglerListeners()

    // add the listeners to the edit forms
    addEditFormListeners()

    // append the newly created search result div
    accordion.addChild(div)

    log("data recieved 1.1")

    return("done")
}//end makeSearchResults