 // This script holds functions and data structures that are expected to be used by all (or at least most) of the developed pages

var listeners = [
    ['button.next-card', 'click', nextCard]
] // not needed anymore

function log(text)
{
    console.log(text)
}

//==========================================================================================================//
//======================================| HTML PROTOTYPE ALTERATIONS |======================================//
//==========================================================================================================//
// The following functions are additions to the prototype of the Element class in JavaScript
// These functions were made with the intention of adding function chaining among the most commonly used Element methods
// Methods such as classList.add(), setAttribute(), appendChild() and their counterparts
// This came about due to frustrations stemming from the high number of classes and div nests in Bootstrap
// I am genuinely unsure of how safe this is to do but imma do it anyways

// Generally, this is simply accomplished by the new function simply invoking the original and returning the object
    // Example: .classList.add()'s successor will be .addClass() which does the following
        // invoke classList.add()
        // return this

Element.prototype.addClass = function(classText) // adds classes
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

Element.prototype.removeAttrib = function(attrib) //remove attribute
{
    this.removeAttribute(attrib)
    return this
}

Element.prototype.addChild = function(child) // appends new children
{
    this.appendChild(child)
    return this
}

Element.prototype.appendAdjacentElement = function(position, element)
{
    this.insertAdjacentElement(position, element)
    return this
}

Element.prototype.setInnerHTML = function(text) // sets inner HTML
{
    this.innerHTML = text
    return this
}

Element.prototype.setInnerText = function(text)
{
    this.innerText = text
    return this
}

Element.prototype.appendEventListener = function(type, callback)
{
    this.addEventListener(type, callback)
    return this
}



//==========================================================================================================//
//====================================| END HTML PROTOTYPE ALTERATIONS |====================================//
//==========================================================================================================//

// this function removes all elements that are returned by a querySelectorAll for the string target
function removeTarget(target)
{
    let elems = document.querySelectorAll(target)
    elems.forEach(elem =>
    {
        elem.remove()
    })
}

// this function toggles the BS5 d-none class in the passed element to toggle it's visibilty via the display attribute
function toggleDisplay(element)
{
    element.classList.toggle('d-none')
}

// this function searches for all elements with the toggle-content class and adds an event listener that calls toggleDisplay on elements found in their toggle-target attribute
function addTogglerListeners()
{
    let buttons = document.querySelectorAll('.toggle-content') // find the elements
    buttons.forEach(button => 
    {
        button.removeEventListener('click', toggleListener)
        log(button.id)
        // add the event listener
        button.addEventListener('click', toggleListener) //toggleListener(e)//function(e)
        // {
        //     // addTogglerListeners(button)
        //     log('inside')
        //     let targetQuery = e.target.getAttribute('toggle-target')
        //     let targets = document.querySelectorAll(targetQuery)
        //     targets.forEach(target => 
        //     {
        //         toggleDisplay(target)
        //     })
        // })
    })
    
    log("data recieved 2.1")
}

function toggleListener(e)
{
    let targetQuery = e.target.getAttribute('toggle-target')
    let targets = document.querySelectorAll(targetQuery)
    targets.forEach(target => 
    {
        toggleDisplay(target)
    })
}//end toggleListener

// This function is used to load the navbar at the top of the page
// Requires an existing "nav" element with the "navbar" id to place all the stuff into
function loadNavbar()
{
    // find the navbar and add needed BS5 classes
    let navbar = document.getElementById('navbar')
    navbar.classList.add('navbar', 'navbar-expand-md', 'navbar-dark', 'bg-dark')
    
    // create container to hold nav info
    let container = document.createElement('div')
    container.classList.add('container')

    // create navbar brand and append to the container
    let navbarBrand = document.createElement('a')
    navbarBrand.classList.add('navbar-brand')
    navbarBrand.innerHTML = '<i class="bi bi-car-front me-2"></i>CRMS'
    container.appendChild(navbarBrand)

    // create the navbar button shown on collapsed navbar
    let button = document.createElement('button')
    button.type = 'button'
    button.setAttribute('data-bs-toggle', 'collapse')
    button.setAttribute('data-bs-target', '#main-nav')
    button.classList.add('navbar-toggler')
    button.appendChild(Object.assign(document.createElement('span'), {className: 'navbar-toggler-icon'}))
    container.appendChild(button)

    // create the navbar links
    let div = document.createElement('div') // the div to hold them all
    div.id = 'main-nav'
    div.classList.add('collapse', 'navbar-collapse', 'justify-content-end', 'align-center', 'text-light')

    let ul = document.createElement('ul') // the list to hold the links
    ul.classList.add('navbar-nav')

    // this array is used to hold the nav links and their respective destinations
    var navItems = [
        ['customer.html', 'Customers'],
        ['vehicle.html', 'Vehicles'],
        ['rentals.html', 'Rentals'],
        ['reports.html', 'Reports']
    ]

    let li, a

    // create and append a list item for each item in the array
    navItems.forEach(navItem => {
        li = document.createElement('li')
        li.classList.add('nav-item')

        a = document.createElement('a')
        a.classList.add('nav-link', 'h5')
        a.setAttribute('href', navItem[0])
        a.innerHTML = navItem[1]

        li.appendChild(a)
        ul.appendChild(li)
    })

    div.appendChild(ul)

    container.appendChild(div)

    navbar.appendChild(container)
} // loadNavbar


// this function takes
async function executeQuery(query)
{
    let formData = new FormData()
    formData.append('query', query)
    return fetch('../scripts/query.php', {
        method : 'POST',
        body : formData
    })
    .then((response) => response.json())
}//end executeQuery

// this function takes
function executeQuery_text(query)
{
    let formData = new FormData()
    formData.append('query', query)
    return fetch('../scripts/query.php', {
        method : 'POST',
        body : formData
    })
    .then((response) => response.text())
}//end executeQuery

// This function just serves as a centralized means to add all of a page's eventlisteners
function addListeners()
{
    listeners.forEach(listener =>
    {
        let elems = document.querySelectorAll(listener[0]) // find all the elements that match the selectors in listener[0]

        // add the event listener outlined in listener[1] and [2]
        elems.forEach(elem =>
        {
            elem.addEventListener(listener[1], function()
            {
                listener[2]()
            })
        })
    })
} // addListeners


// ============== FORM NAVIGATION ============== //

// This function scans through the loaded document and adds the card navigation to the buttons in the forms
// It additionally deactivates all but the first cards in each form
function addFormCardNavigation()
{
    // Get a list of all card forms in the document
    var forms = document.querySelectorAll('form.card-form')

    // For each form deactivate the cards and add the appropriate event listeners to the child elements with the next-card and prev-card classes
    forms.forEach(form =>
    {
        // get the cards
        var cards = document.querySelectorAll('#' + form.id + ' .card')

        // deactivate all cards by adding the d-none class
        cards.forEach(card =>
        {
            card.classList.add('d-none') 
        })

        // reactivate the first card by removing d-none
        cards.item(0).classList.remove('d-none')


        // get the buttons
        var nextButtons = document.querySelectorAll('#' + form.id + ' .next-card')
        var prevButtons = document.querySelectorAll('#' + form.id + ' .prev-card')

        // add their event listeners
            // next-card
        nextButtons.forEach(button =>
        {
            button.addEventListener('click', function()
            {
                nextCard(form)
            })
        })

            // prev-card
        prevButtons.forEach(button =>
        {
            button.addEventListener('click', function()
            {
                prevCard(form)
            })
        })
    })

}// addFormCardNavigation


// This function is the eventlistenter used to navigate to the next card in the passed form
function nextCard(form)
{
    var cards = document.querySelectorAll('#' + form.id + ' .card')
    var currentActiveCard = -1 // var to check if the next card in the list should be made active
    let valid = false
    // loop through the cards
        // IF current card is active
            // set the flag for the current active card to the index
    
    // IF the current active card is not the last one
        // enable the card after it
        // deactivate the current card
    
    cards.forEach((card, index) =>
    {
        if(!card.classList.contains('d-none'))
        {
            //fucntion to check all inputs
            valid = validateInputs(card)
            currentActiveCard = index
        }
    })

    if(((currentActiveCard + 1) < cards.length) && (valid))
    {
        cards.item(currentActiveCard + 1). classList.remove('d-none')
        cards.item(currentActiveCard).classList.add('d-none')
    }
}// nextCard


// This function is the eventlistenet used to navigatte to the previous card in the form
function prevCard(form)
{
    var cards = document.querySelectorAll('#' + form.id + ' .card')
    var currentActiveCard = -1 // var to check if the next card in the list should be made active

    // loop through the cards
        // IF current card is active
            // set the flag for the current active card to the index
    
    // IF the current active card is not the first one
        // enable the card before it
        // deactivate the current card
    
    cards.forEach((card, index) =>
    {
        if(!card.classList.contains('d-none'))
        {
            currentActiveCard = index
        }
    })

    if(currentActiveCard > 0)
    {
        cards.item(currentActiveCard - 1).classList.remove('d-none')
        cards.item(currentActiveCard).classList.add('d-none')
    }
    
    console.log('prev')
}// prevCard


// This function is used for loading anything Bootstrap needs to be done by the programmer (eg: tooltips)
function BSLoad()
{
    // initializing tooltips
    const tooltips = document.querySelectorAll('.tt')
    tooltips.forEach(t => {
        new bootstrap.Tooltip(t)
    })
}


function validateInputs(card)
{
    var valid = true; // used to store the validity of the input elements
    let inputs = card.querySelectorAll(".form-input")
        inputs.forEach(input =>
        {
            if(!input.checkValidity())
            {
                valid = false;
            }

        }) //end foreach
        card.classList.add('was-validated')
    return valid
}//end validateInputs
// ============ END FORM NAVIGATION ============ //



//function used by the make selects to query the database and return all makes in the vehicletype table
function showExistingMakes(e)
{
    let select = e.target
    let query = 'SELECT DISTINCT make FROM vehicletype;'
    executeQuery(query)
    .then((data) =>
    {
        while (select.firstChild) 
        {
            select.removeChild(select.firstChild);
        }
        data.forEach(make =>
        {
            select.addChild(
                document.createElement('option')
                .changeAttrib('value', make.make)
                .setInnerHTML(make.make)
            )      
        })
        
    })
}//end showExistingMakes


//function used by the make selects to query the database and return all modela in the vehicletype table
function showExistingModels(e)
{
    let select = e.target
    let query = 'SELECT DISTINCT model FROM vehicletype;'
    executeQuery(query)
    .then((data) =>
    {
        while (select.firstChild) 
        {
            select.removeChild(select.firstChild);
        }
        data.forEach(model =>
        {
            select.addChild(
                document.createElement('option')
                .changeAttrib('value', model.model)
                .setInnerHTML(model.model)
            )      
        })
        
    })
}//end showExistingMakes

function makeModelEnabled(e)
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
}//end makeModelEnabled


async function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}// end sleep
