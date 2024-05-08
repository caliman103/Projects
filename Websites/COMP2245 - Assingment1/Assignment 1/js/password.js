
/* 
 * This password.js file will be accessible to both index.html files
 * (the main index.html as well as the one in the admin directory).
 * The path for this password.js file will be included in the an aditional 
 * script tag in both index.html files which will allow both of them to
 * access this function and reduce the chance of duplicate functions, variables etc
 * in the index.js files in the other script tag.
 */
//====================================================================================================================//
//                                        CHECK PASSWORD FUNCTION                                                     //
//====================================================================================================================//
function checkPassword(data)
{
   var i;
   var code;

   //Checks to see if field is empty
   if(data == '')
   {
      return false;
   }//end if

   //Checks to see if only numbers and ltters were entered
   for(i = 0; i < data.length; i++)
   {
      code = data.charCodeAt(i);
      if( (!(code > 64 && code < 91) &&  !(code > 96 && code < 123) ) && !(code > 47 && code < 58) )
      {
         return false;
      }//end if
   }//end for
   return true;
}//end checkPassword