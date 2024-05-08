
const form = document.getElementById('form');
let jsCheck = document.getElementById('jsCheck');

//constant to hold the title of the document
const title = document.title;

//====================================================================================================================//
//                                          SUBMIT EVENT LISTENER                                                     //
//====================================================================================================================//
form.addEventListener('submit', function(event) 
{
      var licenseNoField = document.getElementById('licenseNo').value;
      var passwordField = document.getElementById('password').value;
      var error = document.getElementById('error');

      console.log('entered submit');
      error.style.color = 'red';
      error.innerHTML = '';

      //================Functions to Validate the format of the data entered=============//
      //Format not valid
      if( !(checkLicense(licenseNoField) )   || !(checkPassword(passwordField) ))
      {
         event.preventDefault();
         error.innerHTML = 'Data missing or invalid format';
      }//end if
      else         
      {
         console.log('jscheck should be true');
         error.innerHTML = '';
         jsCheck.value = true;
         return true;
      }//end else
      return false;
         
})//end submit event listener

//====================================================================================================================//
//                                        CHECK LICENSE FUNCTION                                                      //
//====================================================================================================================//
function checkLicense(data)
{
   var licenseReg = /^([\d]{15})$/;
   if(!licenseReg.test(data))
   {
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
   var passwordReg = /^([a-z])(([a-z])+(\d)+)+([a-z\d])*$/i;
   
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


