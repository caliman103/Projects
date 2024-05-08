//Get the form to submit
const form = document.getElementById('form');
let jsCheck = document.getElementById('jsCheck');
//===============================OBJECT TO STORE USER INFORMATION========================//
var user = 
{
    ID : '',
    licenseNo : '',
    firstName : '',
    lastName : '',
    email : '',
    telNum : '',
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
    //Get all the information  the user has entered and add it to the user object
    user['ID'] = document.getElementById('ID').value;
    user['firstName'] = document.getElementById('fName').value;
    user['lastName'] = document.getElementById('lName').value;
    user['email'] = document.getElementById('email').value;
    user['telNum'] = document.getElementById('firstNos').value + '-' + document.getElementById('secondNos').value;
    user['addr1'] = document.getElementById('address1').value;
    user['addr2'] = document.getElementById('address2').value;
    user['parish'] = document.getElementById('parishes').value;

    if(!newDriver(user) )
    {
        event.preventDefault();
    }//end if
    else 
    {
        jsCheck.value = true;
        console.log("GOOD");
        console.log(user);
        //window.location.href = '../html/confirmation.html';
        return true;
    }
    return false;
})

//====================================================================================================================//
//                                           newDriver FUNCTION                                                       //
//====================================================================================================================//
function newDriver(driver)
{
    //Set all error messages to empty strings
    var errorMessages = [
                         document.getElementById('ID-error'),
                         document.getElementById('first-name-error'),
                         document.getElementById('last-name-error'),
                         document.getElementById('email-error'),
                         document.getElementById('telephone-error'),
                         document.getElementById('address1-error'),
                         document.getElementById('address2-error')
                    ];
    for(var i = 0; i < errorMessages.length;i++)
    {
        errorMessages[i].innerHTML = '';
    }//end for

    //Get the fields on the form and set them back to neutral when necessary
    var fieldStatus  = [
                        document.getElementById('ID'),
                        document.getElementById('fName'), 
                        document.getElementById('lName'),
                        document.getElementById('email'), 
                        document.getElementById('firstNos'), 
                        document.getElementById('secondNos'), 
                        document.getElementById('address1'), 
                        document.getElementById('address2')
                    ];

    for(var i = 0; i < fieldStatus.length; i++)
    {
        if(fieldStatus[i].classList.contains('form-error') )
        {
            setNeutral(fieldStatus[i]);
        }//end if
    }//end for


    //========================================Check if there are any errors with the driver ID===================//
    if(!checkID(driver.ID))
    {
        setError(fieldStatus[0]);
        setErrorMessage(errorMessages[0]);
        return false;
    }//end if
    else
    {
        setSuccess(fieldStatus[0]);
    }//end else


    //========================================Check if there are any errors with the driver first name===================//
    if(!checkName(driver.firstName,'first'))
    {
        setError(fieldStatus[1]);
        setErrorMessage(errorMessages[1]);
        return false;
    }//end if
    else
    {
        setSuccess(fieldStatus[1]);
    }//end else


    //========================================Check if there are any errors with the drive last name===================//
    if(!checkName(driver.lastName,'last') )
    {
        setError(fieldStatus[2]);
        setErrorMessage(errorMessages[2]);
        return false;
    }//end if
    else
    {
        setSuccess(fieldStatus[2]);
    }//end else
    

    //========================================Check if there are any errors with the drive email========================//
    if(!checkEmail(driver.email) )
    {
        setError(fieldStatus[3])
        setErrorMessage(errorMessages[3]);
        return false;
    }//end if
    else
    {
        setSuccess(fieldStatus[3]);
    }

    //========================================Check if there are any errors with the drive telNum========================//
    if(!checkTelNum(document.getElementById('firstNos').value, document.getElementById('secondNos').value))
    {
        setError(fieldStatus[4]);
        setError(fieldStatus[5]);
        setErrorMessage(errorMessages[4]);
        return false;
    }//end if
    else
    {
        if(driver.telNum != '')
        {
            setSuccess(fieldStatus[4]);
            setSuccess(fieldStatus[5]);
        }//end if
    }//end else

    //========================================Check if there are any errors with the driver address 1===================//
    if(!checkAddress(driver.addr1) )
    {
        setError(fieldStatus[6]);
        setErrorMessage(errorMessages[5])
        return false;
    }//end if 
    else
    {
        if(driver.addr1 != '')
        {
            setSuccess(fieldStatus[6]);
        }
    }//end else

    //========================================Check if there are any errors with the address 2===================//
    if(!checkAddress(driver.addr2) )
    {
        setError(fieldStatus[7]);
        setErrorMessage(errorMessages[6]);
        return false;
    }//end if
    else
    {
        if(driver.addr2 != '')
        {
            if(driver.addr1 == '')
            {
                setError(fieldStatus[7]);
                setErrorMessage(errorMessages[6]);
                return false;
            }//end if
            setSuccess(fieldStatus[7]);
        }//end if
    }//end else


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
        var passwordLength = Math.floor((Math.random() * 9) + 10); //generates a number between 10 to 18 
        var i;

       //Makes sure first character is a capital letter
        generatedPassword = characters[Math.floor((Math.random() * 25) + 25)];

        //Pulls a random character fomr the character string and assigns it to the password
        for(i = 1; i < passwordLength - 1; i++)
        {
            generatedPassword = generatedPassword + characters[Math.floor(Math.random() * characters.length)]
        }//end for

        //makes sure last character is a number
        generatedPassword = generatedPassword + characters[Math.floor((Math.random() * 10) + 52)];
        
        driver['password'] = generatedPassword; 

    }//end generate password

    generateLicenseNo();
    generatePassword();

    
    return  true;
}//end newDriver

//====================================================================================================================//
//                                             CHECK ID FUNCTION                                                      //
//====================================================================================================================//
function checkID(ID)
{
    //regular expression allowed for ID
    var IDreg = /^((195[2-9])|(19[6-9][\d])|(200[0-6]))-(((0[469]|11)-(0[1-9]|[1-2][\d]|30))|((0[13578]|12)-(0[1-9]|[1-2][\d]|3[0-1]))|((02)-(0[1-9]|1[\d]|2[0-8])))-((000[1-9])||([1-9][1-9][1-9]\d))$/
    if(!IDreg.test(ID))
    {
        return false;
    }//end if
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
        var fNameReg = /^([a-z])+$/i;
        if(!fNameReg.test(name) )
        {
            return false
        }//end if
        return true;
    } //end if (first name validation)
    

    //=====================================LAST NAME VALIDATION==============================================//
    if(type == 'last')
    {
        var lNameReg = /^[a-z](([a-z])-?)*[a-z]$/i
        if(!lNameReg.test(name) )
        {
            return false;
        }//end if
        return true;
    }//end if (last name valdation)

}//end checkName


//====================================================================================================================//
//                                          CHECK EMAIL FUNCTION                                                      //
//====================================================================================================================//
function checkEmail(email)
{
    var emailReg = /^[a-z\d]([a-z\d\.-]*)@([a-z\d]+)\.([a-z])+(\.[a-z]+)?$/i;
    if(!emailReg.test(email) )
    {
        return false;
    }//end if
    return true;
}//end checkEmail

//====================================================================================================================//
//                                          CHECK TELNUM FUNCTION                                                     //
//====================================================================================================================//
function checkTelNum(prefix, line_number)
{
    //if both fields aare empty the return true since this field is optional
    if(isEmpty(prefix) && isEmpty(line_number) )
    {
        user['telNum'] = '';
        return true;
    }//end if

    //if only one if the fields have information entered then return false
    if( (isEmpty(prefix) && !(isEmpty(line_number)) ) || (!(isEmpty(prefix)) && isEmpty(line_number)) )
    {
        return false
    }//end if

    var firstNosReg = /^[2-9][\d]{2}$/;
    var secondNosReg = /^[\d]{4}$/;
    if(!(firstNosReg.test(prefix)) || !(secondNosReg.test(line_number)) )
    {
        return false;
    }
    return true;
}//end checkTelNum


//====================================================================================================================//
//                                          CHECK ADDRESS FUNCTION                                                    //
//====================================================================================================================//
function checkAddress(addr)
{
    var addrReg = /^(()||([a-z\d](([a-z\d])\s?)*[a-z\d]))$/i
    if(!addrReg.test(addr) )
    {
        return false;
    }//end if
    return true;
} //end checkAddress


//====================================================================================================================//
//                                           setSuccess FUNCTION                                                      //
//====================================================================================================================//
function setSuccess(field)
{
    field.classList.remove('form-neutral');  
    field.classList.remove('form-error');
    field.classList.add('form-success');
    
}//end setSuccess


//====================================================================================================================//
//                                             setError FUNCTION                                                      //
//====================================================================================================================//
function setError(field) 
{     
    field.classList.remove('form-neutral');    
    field.classList.remove('form-success');
    field.classList.add('form-error');
}//end setError


//====================================================================================================================//
//                                           setNeutral FUNCTION                                                      //
//====================================================================================================================//
function setNeutral(field)
{
    field.classList.remove('form-error');
    field.classList.remove('form-success');
    field.classList.add('form-neutral');
}//end setNeutral


//====================================================================================================================//
//                                       setErrorMessages FUNCTION                                                    //
//====================================================================================================================//
function setErrorMessage(error)
{
   error.innerHTML = 'Data missing or incorrect format';
}//end setErrorMessage


//====================================================================================================================//
//                                              isEmpty FUNCTION                                                      //
//====================================================================================================================//
function isEmpty(info)
{
    if(info == '')
    {
        return true;
    }
    return false;
}//end ifEmpty