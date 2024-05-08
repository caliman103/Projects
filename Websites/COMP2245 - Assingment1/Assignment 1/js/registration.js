//Get the form to submit
const form = document.getElementById('form');

//===============================OBJECT TO STORE USER INFORMATION========================//
var user = 
{
    ID : '',
    licenseNo : '',
    firstName : '',
    lastName : '',
    addr1 : '',
    addr2 : '',
    parish : '',
    password : ''
    //login : false,

}//end user


//====================================================================================================================//
//                                          SUBMIT EVENT LISTENER                                                     //
//====================================================================================================================//
form.addEventListener('submit', function(event) 
{
    event.preventDefault();
    
    if(newDriver(user) )
    {
        window.location.href = '../html/confirmation.html';
        return true;
    }
    return false;
    
})

//====================================================================================================================//
//                                           newDriver FUNCTION                                                       //
//====================================================================================================================//
function newDriver(driver)
{
    //objects to store information usable by the checkAddress(addr) function
    var address1 =
    {
        addrValue : driver.addr1,
        name : "address1"
    };

    var address2 =
    {
        addrValue : driver.addr2,
        name : "address2"
    };

    //========================================Check if there are any errors with the driver ID===================//
    if(!checkID(driver.ID))
    {
        var IDErrorMsg = document.getElementById('ID-error');
        var IDField = document.getElementById('ID');

        IDErrorMsg .style.color = 'red';

        IDErrorMsg.innerHTML = 'Data missing or incorrect format';

        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');

        return false;
    }//end if

    //========================================Check if there are any errors with the driver first name===================//
    if(!checkName(driver.firstName,'first'))
    {
        var fNameErrorMsg = document.getElementById('first-name-error');
        var fNameField = document.getElementById('fName');

        fNameErrorMsg .style.color = 'red';

        fNameErrorMsg.innerHTML = 'Data missing or incorrect format';

        fNameField.classList.remove('form-success');
        fNameField.classList.add('form-error');

        return false;
    }//end if
    
    //========================================Check if there are any errors with the drive last name===================//
    if(!checkName(driver.lastName,'last') )
    {
        var lNameErrorMsg = document.getElementById('last-name-error');
        var lNameField = document.getElementById('lName');

        lNameErrorMsg.style.color = 'red';

        lNameErrorMsg.innerHTML = 'Data missing or incorrect format';

        lNameField.classList.remove('form-success');
        lNameField.classList.add('form-error');

        return false;
    }//end if
    
    //========================================Check if there are any errors with the driver address 1===================//
    if(!checkAddress(address1) )
    {
        var address1Field = document.getElementById('address1');
        var addr1erorMsg = document.getElementById('address1-error'); 

        addr1erorMsg.style.color = 'red';

        addr1erorMsg.innerHTML = 'Data missing or incorrect format';

        address1Field.classList.remove('form-success');
        address1Field.classList.add('form-error');

        return false;
    }//end if 

    //========================================Check if there are any errors with the address 2===================//
    if(!checkAddress(address2) )
    {
        var address2Field = document.getElementById('address2');
        var addr2erorMsg = document.getElementById('address2-error');

        addr2erorMsg.style.color = 'red';

        addr2erorMsg.innerHTML = 'Data missing or incorrect format';

        address2Field.classList.remove('form-success');
        address2Field.classList.add('form-error');

        return false;
    }//end if
    
    //========================================Check if there are any errors with the parish===================//
    if(!checkParish(driver.parish) )
    {
        var parishError = document.getElementById('parish-error');

        parishError.style.color = 'red';

        parishError.innerHTML = 'Select a Parish';

        return false;
    }

    //========================================ALL USER INFORMATION VALID===================//
    //=====================================GENERATE PASSWORD AND LICNCENO==================//
    function generateLicenseNo()
    {
        var randNumber = Math.floor((Math.random() * 1000000) );
        if(randNumber == 0)
        {
            randNumber++;
        }

        first_seven = randNumber.toString();

        while(first_seven.length != 7)
        {
            first_seven = '0' + first_seven;
        }

        generated = first_seven + user.ID.slice(0,4) + user.ID.slice(5,7) + user.ID.slice(8,10);

        driver['licenseNo'] = generated;
    }//end generateLicenseNo

    function generatePassword()
    {
        //creates a string with all possible characters for the password
        var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var generatedPassword = '';
        var passwordLength = Math.floor((Math.random() * 10) + 10); //generates a number between 10 to 19 
        var i;

        //ensures the password is betwen 10 and 18 characters
        if(passwordLength == 19)
        {
            passwordLength--;
        }//end if
        var first_character = Math.floor(Math.random() * characters.length)
        //ensures the first character is a capital letter since this index range corresponds with capital leters in the characers string declared above
        while( first_character < 25 || first_character > 51)
        {
            first_character = Math.floor(Math.random() * characters.length) //generate a number again
        }

        generatedPassword = characters[first_character];

        //Pulls a random character fomr the character string and assigns it to the password
        for(i = 1; i < passwordLength - 1; i++)
        {
            generatedPassword = generatedPassword + characters[Math.floor(Math.random() * characters.length)]
        }//end for

        var last_character = Math.floor(Math.random() * characters.length)
        //ensures that a number is generated
        while( last_character < 52)
        {
            last_character = Math.floor(Math.random() * characters.length) //generate a number again
        }
        generatedPassword = generatedPassword + characters[last_character];

        driver['password'] = generatedPassword; 

    }//end generate password

    generateLicenseNo();
    generatePassword();

    
    //========================================ADDS NEW DRIVER TO LOCAL STORAGE===================//
    //if this first driver
    if (!localStorage.getItem("driverInfo")) 
    {
        var driverArray = [user];
        localStorage.setItem("driverInfo", JSON.stringify(driverArray));
    }//end if
    else
    {
        //Get current drivers from local storage
        var cuurentDrivers = localStorage.getItem('driverInfo');

        //parse them to variable which will be used to add the current drived
        var updatedDrivers = JSON.parse(cuurentDrivers);

        //add the newDriver object
        updatedDrivers[updatedDrivers.length] = user; 

        console.log( updatedDrivers );

        //add the updated driver list to local storage
        localStorage.setItem('driverInfo',JSON.stringify(updatedDrivers))
    }//end else
    
    return  true;
}//end newDriver


//====================================================================================================================//
//                                             isEmpty FUNCTION                                                       //
//====================================================================================================================//
//Check to see if user left the field empty
function isEmpty(input)
{
    if(input == '')
    {
        return true;
    }//endif
    else
    {
        return false;
    }//end else
}//end isEmpty

/*
//====================================================================================================================//
//                                             ALLOWED KEYS FUNCTION                                                  //
//====================================================================================================================//
function allowedKeys(type)
{
    //=======================================ID KEYS==============================//
    if(type == 'ID')
    {
        var instrictions = document.getElementById('ID-instructions');
        instrictions.innerHTML = '';
        var field = document.getElementById('ID');

        if(field.value.length == 1)
        {
            if(isNaN(field.value.charAt(0)))
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end if

        else if( field.value.length == 5) 
        {
            if( field.value.charCodeAt(4) != 45) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }
        }//end if

        
        else if(field.value.length == 8) 
        {
            if( field.value.charCodeAt(7) != 45) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }
        }//end if

        else if(field.value.length == 11) 
        {
            if( field.value.charCodeAt(10) != 45) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }
        }//end if

        else
        {
            var currentLength = field.value.length -1;

            if(isNaN(field.value.charAt(currentLength)))
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//endif
        }//end else


        if(field.value.length == 16)
        {
            field.value = field.value.slice(0,field.value.length-1);
        }//end if
    }//end ID Keys
    
    //=======================================FIRST NAME KEYS==============================//
    if(type == 'first name')
    {
        var field = document.getElementById('fName');

        if(field.value.length == 1)
        {
            var code = field.value.charCodeAt(0);
            if( (!(code > 64 && code < 91) &&  !(code > 96 && code < 123) ) )
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end if

        else
        {
            var currentLength = field.value.length -1;
            var code = field.value.charCodeAt(currentLength);

            if(!(code > 64 && code < 91) &&  !(code > 96 && code < 123) ) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//endif
        }//end else
    }//end first name keys

    //=======================================LAST NAME KEYS==============================//
    if(type == 'last name')
    {
        var field = document.getElementById('lName');
        if(field.value.length == 1)
        {
            var code = field.value.charCodeAt(0);
            if( (!(code > 64 && code < 91) &&  !(code > 96 && code < 123) ) )
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end if

        else
        {
            var currentLength = field.value.length -1;
            var code = field.value.charCodeAt(currentLength);
            var prevCode = field.value.charCodeAt(currentLength-1);

            if(!(code > 64 && code < 91) &&  !(code > 96 && code < 123) && !(code == 45) )  
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//endif

            if( (code == 45) && (prevCode == 45) )
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end else

       
    }//end last name keys

    //=======================================ADDRESS KEYS==============================//
    if(type == 'address1')
    {
        var field = document.getElementById('address1');
        //var field = document.getElementById('address2');
        if(field.value.length == 1)
        {
            code = field.value.charCodeAt(0);
            if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123) )
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end if

        else
        {
            var currentLength = field.value.length -1;
            code = field.value.charCodeAt(currentLength);

            if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code == 32)) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//endif
        }//end else
    }//end address keys

    if(type == 'address2')
    {
        var field = document.getElementById('address2');
        //var field = document.getElementById('address2');
        if(field.value.length == 1)
        {
            code = field.value.charCodeAt(0);
            if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123) )
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//end if
        }//end if

        else
        {
            var currentLength = field.value.length -1;
            code = field.value.charCodeAt(currentLength);

            if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code == 32)) 
            {
                field.value = field.value.slice(0,field.value.length-1);
            }//endif
        }//end else
    }//end address keys
    
}//end allowedKeys
*/

//====================================================================================================================//
//                                             CHECK ID FUNCTION                                                      //
//====================================================================================================================//
function checkID(ID)
{
    //delete any white spcaes at the beginning or end of the ID entered by the user
    ID = ID.trim();
    var IDErrorMsg = document.getElementById('ID-error');
    var IDField = document.getElementById('ID');

    var instrctions = document.getElementById('ID-instructions')
    
    instrctions.innerHTML = '';
    

    IDErrorMsg.style.color = 'red'

    
    //Function to ensure a number is entered
    function isNumber(input,length)
    {
        var i;
        for(i = 0; i < length; i++ )
        {
            if(isNaN(input.charAt(i)))
            {
                return false;
            }//end if
        }//end for
        return true;

    }//end isNumber
    
    //User left field blank
    if(isEmpty(ID) )
    {
        IDErrorMsg.style.color = 'red'
        IDErrorMsg.innerHTML = "Please enter your National ID";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error'); 
        return false;
    } //end if

    
    //Incorrect Id length
    if( !(isEmpty(ID)) && (ID.length != 15) )
    {
        IDErrorMsg.innerHTML = "Your National ID muxh be 15 characters long. Use the format outlined for guidance";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//end if

    
    //Check the positions of the hyphens
    if( (ID.charCodeAt(4) != 45) || (ID.charCodeAt(7) != 45) || (ID.charCodeAt(10) != 45)  )
    {
        IDErrorMsg.innerHTML = "Hyphen should be in the same position outlined in the format. Clear the text field to see the format again";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }
    

    //=======================================Check validiy of year==========================================//
    var year_section = ID.substring(0,4);
    var i;
    
    
    if(!isNumber(year_section,4))
    {
        IDErrorMsg.innerHTML = "First four characters must be a year within 1952 and 2006";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//end if
    

    var year = parseInt(year_section);
    if( (year < 1952) || (year > 2006) )
    {
        IDErrorMsg.innerHTML = "The year must be between 1952 and 2006";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//endif

    //=====================================Check validity of month=====================================//
    var month_section = ID.substring(5,7);
    var month = parseInt(month_section);

    if(!isNumber(month_section,2))
    {
        IDErrorMsg.innerHTML = "The number for the month must be between 1 adn 12";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//end if
    
    
    if( (month < 1) || (month > 12) )
    {
        IDErrorMsg.innerHTML = "Month must be between 1 and 12";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//endif

    //=====================================Check validity of day=====================================//
    var day_section = ID.substring(8,10);
    var day = parseInt(day_section);
    
    
    if(!isNumber(day_section,2))
    {
        IDErrorMsg.innerHTML = "The number for the day must correspond with the month entered";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//end if
    

    //February has 28 days
    if(month == 2)
    {
        if(day > 28 || day < 1)
        {
            IDErrorMsg.innerHTML = "The month entered only has 28 days";
            IDField.classList.remove('form-success');
            IDField.classList.add('form-error');
            return false;
        }//end if
    }//end if

    if(month == 4 || month == 6 || month == 9 || month == 11)
    {
        if(day > 30 || day < 1)
        {
            IDErrorMsg.innerHTML = "The month entered only has 30 days";
            IDField.classList.remove('form-success');
            IDField.classList.add('form-error');
            return false;
        }//end if
    }//end if

    else
    {
        if(day > 31 || day < 1)
        {
            IDErrorMsg.innerHTML = "The month entered only has 31 days";
            IDField.classList.remove('form-success');
            IDField.classList.add('form-error');
            return false;
        }//end if
    }

    //=====================================Check validity of last 4=====================================//
    var last_four = ID.substring(11);
    var digits = parseInt(last_four);

    if(!isNumber(last_four,4))
    {
        IDErrorMsg.innerHTML = "The last four digits must be a number";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }//end if
    

    if(digits == 0)
    {
        IDErrorMsg.innerHTML = "The last four digits must more than 1";
        IDField.classList.remove('form-success');
        IDField.classList.add('form-error');
        return false;
    }

    IDErrorMsg.innerHTML = "";
    IDField.classList.remove('form-error');
    IDField.classList.add('form-success');
    user['ID'] = ID;
    return true;

}//end checkID



//====================================================================================================================//
//                                           CHECK NAME FUNCTION                                                      //
//====================================================================================================================//
function checkName(name, type)
{
    
    name = name.trim();
    //=====================================FIRST NAME VALIDATION==============================================//
    if(type == 'first')
    {
        type = 'first name';
        var fNameErrorMsg = document.getElementById('first-name-error');
        var fNameField = document.getElementById('fName');
        var code;
        var i;

        fNameErrorMsg.style.color = 'red'

        //Check to see if the user entered a first name
        if(isEmpty(name))
        {
            fNameErrorMsg.innerHTML = 'Please enter your ' + type;
            fNameField.classList.remove('form-success');
            fNameField.classList.add('form-error');
            user['firstName'] = '';
            return false;
        }//end if
        
        
        //Ensures only characters are entered
        for(i = 0; i < name.length; i++)
        {
            code = name.charCodeAt(i);
            if (!(code > 64 && code < 91) &&  !(code > 96 && code < 123))
            {
                fNameErrorMsg.innerHTML= 'Your ' + type + ' cannot contain special characters';
                fNameField.classList.remove('form-success');
                fNameField.classList.add('form-error');
                user['firstName'] = '';
                return false
            }//end if
        }//end for
        
        
        //If the name first name is valid add the form-success class to give user some feedback
        fNameErrorMsg.innerHTML= '';
        fNameField.classList.remove('form-error');
        fNameField.classList.add('form-success');
        user['firstName'] = name;
        return true;
    } //end if (first name validation)
    

    //=====================================LAST NAME VALIDATION==============================================//
    if(type == 'last')
    {
        type = 'last name';
        var lNameErrorMsg = document.getElementById('last-name-error');
        var lNameField = document.getElementById('lName');

        lNameErrorMsg.style.color = 'red';

        //Ensures the correct characters are entered for the last name
        function checkFormat(lName)
        {
            var code;
            var i;
            for(i = 0; i < lName.length; i++)
            {   
                code = lName.charCodeAt(i);
                if (!(code > 64 && code < 91) &&  !(code > 96 && code < 123)  && !(code == 45) )
                {
                    return false
                }//end if
            }//end for
            return true;
        }//end checkFormat


        //Check to see if the user entered a last name
        if(isEmpty(name))
        {
            lNameErrorMsg.innerHTML = 'Please enter your ' + type;
            lNameField.classList.remove('form-success');
            lNameField.classList.add('form-error');
            user['lastName'] = '';
            return false;
        }//end if

        //Incorrect characters entered by user
        if(!checkFormat(name) )
        {
            lNameErrorMsg.innerHTML= 'Your ' + type + ' can only contain characters or hyphens';
            lNameField.classList.remove('form-success');
            lNameField.classList.add('form-error');
            user['lastName'] = '';
            return false;
        }
        
        //User entered the right characters
        if(checkFormat(name))
        {
            var i;
            var code;
            var prevCode;

            //Ensures there are no back to back hyphens in the last name
            for(i = 2; i < name.length -1; i++)
            {
                code = name.charCodeAt(i);
                prevCode = name.charCodeAt(i -1);
                if( (code == 45) && (prevCode == 45) )
                {
                    lNameErrorMsg.innerHTML= 'You cannot have back to back hyphens in your ' + type;
                    lNameField.classList.remove('form-success');
                    lNameField.classList.add('form-error');
                    user['lastName'] = '';
                    return false;
                }
            }//end for

            
            //Ensures name doesn't start or end with a hyphen
            if(name.charCodeAt(0) == 45 || name.charCodeAt(name.length-1) == 45)
            {
                lNameErrorMsg.innerHTML= 'Your ' + type + ' cannot start or end with a hyphen';
                lNameField.classList.remove('form-success');
                lNameField.classList.add('form-error');
                user['lastName'] = '';
                return false;
            }//end if

            //If the name last name is valid add the form-success class to give user some feedback
            else
            {
                lNameErrorMsg.innerHTML= '';
                lNameField.classList.remove('form-error');
                lNameField.classList.add('form-success');
                user['lastName'] = name;
                return true;
            }//end else
           
        }//end if
       
    }//end if (last name valdation)


    
}//end checkName


//====================================================================================================================//
//                                          CHECK ADDRESS FUNCTION                                                    //
//====================================================================================================================//
function checkAddress(addr)
{

    address = addr.addrValue;
    type = addr.name
    

    //Function that checks the validity of the address
    function validation(address)
    {
        var code, i;
        onlySpaces = true;
        for (i = 0;  i < address.length; i++) 
        {
            code = address.charCodeAt(i);
            if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123) && !(code == 32)) 
            {
                return false;
            }//end if

            //A valid character is present in the address
            if(code != 32)
            {
                onlySpaces = false;
            }//end if
        }//end for

        //Address is only made up of spaces
        if(onlySpaces)
        {
            return false;
        }
        return true;
    }//end validation

    //=====================================Address 1 VALIDATION==============================================//
    if(type == 'address1')
    {
        var address1Field = document.getElementById('address1');
        var addr1erorMsg = document.getElementById('address1-error'); 

        addr1erorMsg.style.color = 'red';

        //User did not enter address
        if(isEmpty (address))
        {
            addr1erorMsg.innerHTML = 'Please enter your address';
            address1Field.classList.remove('form-success');
            address1Field.classList.add('form-error');
            user['addr1'] = '';
            return false;
        }//end if

        address.trim();
        //Found an error in the validation function
        if(!validation(address) )
        {
            addr1erorMsg.innerHTML = 'Your address can only have alphanumeric characters and spaces';
            address1Field.classList.remove('form-success');
            address1Field.classList.add('form-error');
            user['addr1'] = '';
            return false;
        }

        //User entered a valid address
        addr1erorMsg.innerHTML = '';
        address1Field.classList.remove('form-error');
        address1Field.classList.add('form-success');
        address1Field.value.trim();
        address.trim();
        user['addr1'] = address; 
        return true;
    }//end if (address 1 validation)

    
    //=====================================Address 2 VALIDATION==============================================//
    if(type == 'address2')
    {
        var address2Field = document.getElementById('address2');
        var addr2erorMsg = document.getElementById('address2-error');

        addr2erorMsg.style.color = 'red';
        //User did not enter address
        if(isEmpty (address))
        {
            addr2erorMsg.innerHTML = 'Please enter your address';
            address2Field.classList.remove('form-success');
            address2Field.classList.add('form-error');
            user['addr2'] = '';
            return false;
        }//end if

        address.trim();
        //Found an error in the validation function
        if(!validation(address) )
        {
            addr2erorMsg.innerHTML = 'Your address can only have alphanumeric characters and spaces';
            address2Field.classList.remove('form-success');
            address2Field.classList.add('form-error');
            user['addr2'] = '';
            return false;
        }

        //User entered a valid address
        addr2erorMsg.innerHTML = '';
        address2Field.classList.remove('form-error');
        address2Field.classList.add('form-success');
        address2Field.value.trim();
        address.trim();
        user['addr2'] = address;
        return true;
    }//end if (address 2 validation)
    
} //end checkAddress


//====================================================================================================================//
//                                            LOAD PARISHES FUNCTION                                                  //
//====================================================================================================================//
function loadParishes()
{
    var parishSelect = document.getElementById('parishes')
    var numberOfChildren = document.getElementById('parishes').children.length

    if(numberOfChildren == 1)
    {
        var parishList = ['St.Lucy', 'St. Peter','St Andrew', 'St. James', 'St. Joseph', 'St. George', 'St. Thomas', 'St. John', 'St. Michael', 'St. Phillip', 'Christ Church'];
        
        if (!localStorage.getItem("Parishes")) 
        {
            localStorage.setItem('Parishes', JSON.stringify(parishList ) );
        }
    
        var i;
        for(i = 0; i < parishList.length; i++)
        {
            var parishOption = document.createElement('option');

            parishOption.value = parishList[i];
            parishOption.innerHTML= parishList[i];
            parishSelect.appendChild(parishOption);
        }//end for
    }//end if
    
    
}//end loadParishes

//====================================================================================================================//
//                                             CHECK PARISHES FUNCTION                                                //
//====================================================================================================================//
function checkParish(parish)
{
    if(parish == '')
    {
        user['parish'] = '';
        return false;
    }
    else
    {
        var parishError = document.getElementById('parish-error')
        parishError.innerHTML = '';
        user['parish'] = parish;
        return true;
    }
}

/*
//====================================================================================================================//
//                                        DISPLAY INSRUCTIONS FUNCTION                                                //
//====================================================================================================================//
function instructions(type)
{
    //array to hold instructions id
    var instructionsList = [
        document.getElementById('ID-instructions'),
        document.getElementById('fName-instructions'),
        document.getElementById('lName-instructions'),
        document.getElementById('addr1-instructions'),
        document.getElementById('addr2-instructions'),
    ];
    var i;

    //clear all instructions and assign instructions to the appropriate field
    for(i = 0; i < instructionsList.length; i++)
    {
        instructionsList[i].innerHTML = '';
    }//end for

    //Add instructions to the field depending on which one triggered the function
    if(type == 'ID')
    {
        instructionsList[0].innerHTML = 'Only hypnens(-) and numbers permitted.';
    }//end if
    
    if(type == 'first name')
    {
        instructionsList[1].innerHTML = 'Only alphabet characters permitted.';
    } //end if

    if(type == 'last name')
    {
        instructionsList[2].innerHTML = 'Only alphabet characters and hyphens permitted.';
    } //end if

    if(type == 'address1')
    {
        instructionsList[3].innerHTML = 'Only alphanumeric characters and spaces permitted.';
    }//end if

    if(type == 'address2')
    {
        instructionsList[4].innerHTML = 'Only alphanumeric characters and spaces permitted.';
    }//end if
    
}//end remove errors
*/