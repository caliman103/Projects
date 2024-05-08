// This script holds functions and data structures that are expected to be used by customer.html

// load needed page elements after the page has finished loading
document.onreadystatechange = function()
{
    if(document.readyState === 'complete')
    {
        BSLoad() // function from shared-script.js
        loadNavbar() // function from shared-script.js
        addFormCardNavigation() // function from shared-script.js
        loadReports()
        addTogglerListeners()
    }
}

function loadReports()
{
    addReportsListeners()
}

function addReportsListeners()
{
    document.getElementById('rental-history-form').querySelectorAll('.search-field').forEach(elem =>
    {
        elem.addEventListener('change', function(e)
        {
            searchRentalHistory()
        })
    })

    document.getElementById('rental-history-form').querySelectorAll('#search-button').forEach(elem =>
    {
        elem.addEventListener('click', function(e)
        {
            searchRentalHistory()
        })
    })
}

function searchRentalHistory()
{
    // get the elements needed for this to work
    let searchResultContent = document.getElementById('rental-history-results') // the main container holding every part of the search results
    let searchResultLoadingIcon = document.getElementById('rental-history-results-load-icon') // the container holding the loading icon
    let searchResultAccordion = document.getElementById('rental-history-results-display') // the container holding the records returned by the search

    // show the search results section along with the loading icon and hide the search results accordion
    searchResultContent.classList.remove('d-none')
    searchResultLoadingIcon.classList.remove('d-none')
    searchResultAccordion.classList.add('d-none')

    // get the inputs from the search fields and place them in an associative array named searchFields to aid in data retrieval
    let searchFields = {}
    document.querySelectorAll('#rental-history-form .search-field').forEach(searchField =>
    {
        searchFields[searchField.getAttribute('name')] = searchField.value
        // log(searchField.value)
    })

    log(searchFields)

    let query = `SELECT *, ((datediff(return_date,rental_date) + 1) * rental_fee) + additional_fees as total_charges FROM customer, rentallog, vehicleinventory, vehicletype WHERE customer.cust_id = rentallog.cust_id AND vehicleinventory.vehicle_id = rentallog.vehicle_id AND vehicleinventory.type_id = vehicletype.type_id AND rental_date BETWEEN '${searchFields['start-date']}' AND '${searchFields['end-date']}';`

    var query1Results, rentalCount
    executeQuery(query)
    .then((data) =>
    {
        log(data)
        query1Results = data
        let query = `SELECT count(customer.cust_id) as count FROM customer, rentallog, vehicleinventory, vehicletype WHERE customer.cust_id = rentallog.cust_id AND vehicleinventory.vehicle_id = rentallog.vehicle_id AND vehicleinventory.type_id = vehicletype.type_id;`
        return executeQuery(query)
    })
    .then((count) =>
    {
        rentalCount = count
        log(count)

        makeRentalHistoryReport(query1Results, rentalCount, searchResultAccordion)
    })

    // make the accordion visible and hide the loading icon
    searchResultLoadingIcon.classList.add('d-none')
    searchResultAccordion.classList.remove('d-none')
}

function makeRentalHistoryReport(query1Results, rentalCount, resultElem)
{
    var div = document.createElement('div')
    var totalEarnings = 0, expectedEarnings = 0

    query1Results.forEach(record =>
    {
        Object.entries(record).forEach((field, index) =>
        {
            if(!field[1])
            {
                record[Object.keys(record)[index]] = 0
            }
        })
        log(record)
        var elem = document.createElement('div').addClass('mb-2 p-3 border rounded')
        .setInnerHTML(`
        <div class="row">
            <span class="col"><i class="bi bi-file-person pe-1"></i>${record['first_name']} ${record['middle_name']} ${record['last_name']}</span>
            <span class="col"><i class="bi bi-car-front pe-1 fw-bold"></i>${record['make']} ${record['model']}</span>
            <span class="col"><i class="bi bi-123 pe-1 fw-bold">License Plate:</i>${record['license_plate']}</span>
        </div>
        <div class="row">
            <span class="col"><i class="bi bi-currency-dollar pe-1 fw-bold">Total Due:</i>${record['total_charges']}</span>
            <span class="col"><i class="bi bi-currency-dollar pe-1 fw-bold">Payment Received:</i>${record['payment_received']}</span>
        </div>
        `)

        div.appendChild(elem)

        if(record['total_charges'])
        {
            expectedEarnings += Number(record['total_charges'])
        }

        if(record['payment_received'])
        {
            totalEarnings += Number(record['payment_received'])
        }

        // totalEarnings += record['payment_received']
        // expectedEarnings += record['total_charges']
    })

    div.appendAdjacentElement('afterbegin', 
        document.createElement('div')
        .setInnerHTML(`
        <div class="row mb-5">
            <span class="col"><i class="bi bi-file-person pe-1">Total Expected Earnings</i>$${Math.round(expectedEarnings * 100) / 100}</span>
            <span class="col"><i class="bi bi-car-front pe-1 fw-bold">Total Actual Earnings</i>$${Math.round(totalEarnings * 100) / 100}</span>
        </div>
        `)
    )

    // clear all of the search results still existing
    while (resultElem.firstChild) 
    {
        resultElem.removeChild(resultElem.firstChild);
    }

    // append the newly created search result div
    resultElem.addChild(div)
}