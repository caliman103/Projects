
const form = document.getElementById('form');
let jsCheck = document.getElementById('jsCheck');

//constant to hold the title of the document
const title = document.title;

//====================================================================================================================//
//                                          SUBMIT EVENT LISTENER                                                     //
//====================================================================================================================//
form.addEventListener('submit', function(event) 
{
   if(title == 'Driver Sign in' ) {
      var licenseNoField = document.getElementById('licenseNo').value;
      var passwordField = document.getElementById('password').value;
      var error = document.getElementById('error');

      error.style.color = 'red';
      error.innerHTML = '';

      //================Functions to Validate the format of the data entered=============//
      //Format not valid
      if( !(checkLicense(licenseNoField) )   || !(checkPassword(passwordField) )) {
         event.preventDefault();
         error.innerHTML = 'Data missing or invalid format';
      }//end if 
      else {
         console.log('jscheck should be true');
         error.innerHTML = '';
         jsCheck.value = true;
         return true;
      }//end else
      return false;
   } //end if 

   if(title == 'Admin Sign in' ) {
      var empID = document.getElementById('EmpID').value;
      var password = document.getElementById('password').value;
      var error = document.getElementById('error');

      error.style.color = 'red';
      error.innerHTML = '';

      if( !(checkEmployeeID(empID)) || !(checkPassword(password)) ) {
         event.preventDefault();
         error.innerHTML = 'Data missing or invalid format';
      }//end if
      else {
         error.innerHTML = '';
         jsCheck.value = true;
         return true;
      }//end else
   }//end if
         
})//end submit event listener

function checkEmployeeID(empID)
{
   var depts = ['ADMN','CLRK', 'USER', 'DRVR'];
   var IDReg = /^(1100[\d]{4}\w{4})/;

   if(!IDReg.test(empID)) {
      return false;
   }//end if

   //================ Ensures the last 4 characters are the letters==================//
   var last_four = empID.substring(8);
   if(!depts.includes(last_four)) {
      return false;
   }

   //The function will only return true if it passes all checks
  return true;
}//end checkEmployeeID

//====================================================================================================================//
//                                        CHECK LICENSE FUNCTION                                                      //
//====================================================================================================================//
function checkLicense(data)
{
   var licenseReg = /^([\d]{15})$/;
   if(!licenseReg.test(data)) {
      return false;
   }
   return true;
}//end checkLicense

//====================================================================================================================//
//                                        CHECK PASSWORD FUNCTION                                                     //
//====================================================================================================================//
function checkPassword(data)
{
   var i;
   var code;

   if( (data.length > 18) || (data.length < 10) )
   {
      return false;
   }

   //Regular expression that doesn't check length or check for capital letters
   var passwordReg = /^([a-z])(([a-z\d])+(\d)+)+([a-z\d])*$/i;
   
   if(passwordReg.test(data) == true)
   {
      //check for caiptal letters
      for(i = 0; i < data.length; i++) 
      {
         code = data.charCodeAt(i);
         if((code > 64 && code < 91) )
         {
            return true;
         }
      }//end for
   }//endif
   return false;
}//end checkPassword


