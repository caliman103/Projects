/**
* loadData function for Assignment #1
*
* Add this function to your external JavaScript file. The simplest way to invoke it is
* to use the onload eventhandler on the body tag of the document, i.e. <body onload="loadData()">.
* If successful, you should be able to see two sets of data in localStorage. The first is 
* driverInfo and the second is employeeInfo. Feel free to modify this code to suit your field names.
*/
function loadData()
{
   //remove current user from session storage depending on the page
   if(title == 'Driver Sign in')
   {
      if(localStorage.getItem('currentDriverInfo'))
      {
         sessionStorage.removeItem('currentDriverInfo');
      }//end if
   }//end if

   else
   {
      if(sessionStorage.getItem('currentEmployeeInfo'))
      {
         sessionStorage.removeItem('currentEmployeeInfo');
      }//end if
   }//end else
   
   var driverArray = [
      {
         ID: "1973-02-09-3043",
         licenseNo: "135686819730209",
         firstName: "Andrew",
         lastName: "Pryor",
         addr1: "31 ",
         addr2: "Prior Park",
         parish: "St. James",
         //username: "Qwer1234",
         password:"andrewPryor123"
      },

      {
         ID: "1967-12-12-0404",
         licenseNo: "143647819671212",
         firstName: "Jennifer",
         lastName: "Davis",
         addr1: "Wavell Ave",
         addraddr2ess2: "Black Rock",
         parish: "St. Michael",
         //username: "Geju0593",
         password:"Anoth3rpass"

      },

      {
         nationalId: "1979-04-22-1209",
         licenseNo: "100893419790422",
         firstName: "Anderson",
         lastName: "Alleyne",
         addr1: "Lascelles Terrace",
         addraddr2ess2: "The Pine",
         parish: "St. Michael",
        // username: "Oyqb0789",
         password:"thePassw0rd"
      }
   ]

   
   var employeeArray = [
      {
         employeeID: "11005457ADMN",
         firstName: "Merissa",
         lastName: "Halliwall",
         password:"f1rst1Pa55"
      },

      {
         employeeID: "11000907DRVR",
         firstName: "Terold",
         lastName: "Bostwick",
         password:"secur3Acc3s5"
      },

      {
      employeeID: "11001478CLRK",
      firstName: "Vanda",
      lastName: "Marshall",
      password:"Oll1Ollip0ps"
      }
   ]

   
   //add to localStorage 
   if (!localStorage.getItem("driverInfo")) {
      localStorage.setItem("driverInfo", JSON.stringify(driverArray));
   }

   
   if (!localStorage.getItem("employeeInfo")) {
      localStorage.setItem("employeeInfo", JSON.stringify(employeeArray));
   }
   


}//end loadData

// load the data
//window.onload=loadData;


const form = document.getElementById('form');

//constant to hold the title of the document
const title = document.title;

const employeeList = getEmployees();


//Object to hold user attempts
var userAttempts = [
   {
      ID : employeeList[0].employeeID,
      attempts : 0
   },

   {
      ID : employeeList[1].employeeID,
      attempts : 0
   },

   {
      ID : employeeList[2].employeeID,
      attempts : 0
   }
];
console.log(userAttempts);

//====================================================================================================================//
//                                          SUBMIT EVENT LISTENER                                                     //
//====================================================================================================================//
form.addEventListener('submit', function(event) 
{
   if(title == 'Driver Sign in' )
   {
      var licenseNoField = document.getElementById('licenseNo').value;
      var passwordField = document.getElementById('password').value;
      var error = document.getElementById('error');

      error.style.color = 'red';

      error.innerHTML = '';

      event.preventDefault();

      //================Functions to Validate the format of the data entered=============//
      //Format not valid
      if( !(checkLicense(licenseNoField) )   || !(checkPassword(passwordField) ))
      {
         error.innerHTML = 'Data missing or invalid format';
      }//end if

      //Format is valid
      else
      {
         //Remove any error messages that might be present
         error.innerHTML = '';

         //Create the JSON object with the driver information to pass to checkUser
         var data = 
         {
            licenseNo : licenseNoField,
            password : passwordField
         };

         //If the data doesn't match any records in localStorage
         if(!checkData(data,"driver") )
         {
            error.innerHTML = 'Invalid license number or password';   
         }//ens if

         else
         {
            error.innerHTML = '';
            window.location.href = '../html/public_console.html';
         }//end else
         
      }// end else
   }//end if (Driver Sign in)
   

   if(title == 'Admin Sign in' )
   {
      var IDfield = document.getElementById('EmpID').value;
      var passwordField = document.getElementById('password').value;
      var error = document.getElementById('error');

      error.style.color = 'red';

      error.innerHTML = '';

      event.preventDefault();


      //Functions to Validate the format of the data entered
      if( !(checkEmployeeID(IDfield) ) || !(checkPassword(passwordField) ))
      {
         error.innerHTML = 'Data missing or invalid format';
      }//end if

      else
      {
         //Remove any error messages that might be present
         error.innerHTML = '';

         //Create the JSON object with the driver information to pass to checkUser
         var data =
         {
            employeeID : IDfield,
            password : passwordField
         };

         if(!updateAttempts(userAttempts,data))
         {
            
            error.innerHTML = 'Maximum attempts for this employee ID';
         }

         //If the data doesn't match any records in localStorage
         else if( !(isEmployeeValid(data,"admin") ) )
         {
            error.innerHTML = 'Invalid employee ID or password';
         }//end if

         else
         {
            error.innerHTML = '';
            window.location.href = '../html/admin_console.html';
         }//end else


      }//end else
   }//endif (Admin Sign In)
   
})//end submit event listener

//--------------------------------------------------------------------------------------------------------------------//
//====================================================================================================================//
//                                              DRIVER FUNCTIONs                                                      //
//====================================================================================================================//
//--------------------------------------------------------------------------------------------------------------------//

//====================================================================================================================//
//                                        CHECK LICENSE FUNCTION                                                      //
//====================================================================================================================//
function checkLicense(data)
{
   var i;

   //Checks to see if field is empty or incorrect length
   if(data == '' || data.length != 15)
   {
      return false;
   }//end if

   //Checks to see if only numbers were entered
   for(i = 0; i < data.length; i++)
   {
      if(isNaN(data.charAt(i) ) )
      {
         return false;
      }//end if
   }//end for
   return true;
}//end checkLicense

//====================================================================================================================//
//                                          CHECK DATA FUNCTION                                                      //
//====================================================================================================================//
function checkData(data,userType)
{
   //Get the list of drivers from Local Storage
   var drivers = localStorage.getItem('driverInfo');
   var driverList = JSON.parse(drivers);

   var i;

   for(i = 0; i < driverList.length; i++)
   {
      if( (driverList[i].licenseNo = data.licenseNo) && (driverList[i].password ==  data.password) )
      {
         //Get the first name, last name and license number of the successful driver
         var currentDriver =
         {
            firstName : driverList[i].firstName,
            lastName : driverList[i].lastName,
            licenseNo : driverList[i].licenseNo
         };
         
         sessionStorage.setItem('currentDriverInfo', JSON.stringify(currentDriver) );
         return true;
      }//end if
   }//end for
   
   return false;

}//end checkData


//--------------------------------------------------------------------------------------------------------------------//
//====================================================================================================================//
//                                            EMPLOYEE FUNCTIONs                                                      //
//====================================================================================================================//
//--------------------------------------------------------------------------------------------------------------------//

//====================================================================================================================//
//                                       CHECK EMPLOYEEID FUNCTION                                                    //
//====================================================================================================================//
function checkEmployeeID(data)
{
   var depts = ['ADMN','CLRK', 'USER', 'DRVR'];
   var i;

   
   //=======================Makes sure the employee ID is the correct length=====================//
   if(data == '' || data.length != 12)
   {
      
      return false;
   }//end if

   //================Ensures the first 8 characters are numbers==================//
   var first_eight = data.substring(0,8);
   
   for(i = 0; i < first_eight.length; i++)
   {
      if( (isNaN(first_eight.charAt(i)) ) )
      {
         return false;
      }
   }//end for
   
   //Ensures the ID starts with '1100'============================//
   var first_four = data.substring(0,4);
   if(first_four != '1100')
   {
      return false;
   }
   
   //================ Ensures the last 4 characters are the letters==================//
   var last_four = data.substring(8);

   if(!depts.includes(last_four))
   {
      return false;
   }

   //The function will only return true if it passes all checks
  return true;
}//end checkEmployeeID

//====================================================================================================================//
//                                       IS EMPLOYEE VALID FUNCTION                                                   //
//====================================================================================================================//
function isEmployeeValid(data, userType)
{
   var i;  

   for(i = 0; i < employeeList.length; i++)
   {
      if( (employeeList[i].employeeID == data.employeeID) && (employeeList[i].password ==  data.password) )
      {
         //Get the first name, last name and license number of the successful driver
         var currentEmployee =
         {
            firstName : employeeList[i].firstName,
            lastName : employeeList[i].lastName,
            employeeID : employeeList[i].employeeID
         };
        
            sessionStorage.setItem('currentEmployeeInfo', JSON.stringify(currentEmployee) );
        

         return true;
         
         
      }//end if
   }//end for
   
   console.log(userAttempts);
   return false;
}//end isEmployeeValid




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


function getEmployees()
{
   //Get the list of employees from local Storage
   var employees = localStorage.getItem('employeeInfo');
   var employeeList = JSON.parse(employees);

   return employeeList;
}

function updateAttempts(userAttempts,user)
{
   var i;
   var found = false;

   //Search to see if the ID is present in the userAttempts object array
   //if not add this ID to the userAttempts list and make the attempts 0
   //if present update the attempts
   for(i = 0; i < userAttempts.length; i++)
   {
      if(user.employeeID == userAttempts[i].ID)
      {
         found = true;
         break;
      }
   }//end if

   //Employee was found so update their attempts
   if(found)
   {
      if(userAttempts[i].attempts < 2)
      {
         userAttempts[i].attempts = userAttempts[i].attempts + 1
         return true;
      }//end if
      return false;
      
   }//end if

   //Employee not found so add them to the list of employees attempting to gain access
   if(!found)
   {
      var newEmployee = 
      {
         ID : user.employeeID,
         attempts : 0
      }
      userAttempts.push(newEmployee);
      return true;
   }//end if
   

}//end updateAttempys



