

function loadData()
{
    
   localStorage.clear();
   
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


const form = document.getElementById('form')

form.addEventListener('submit',function(event)
{

   var IDfield = document.getElementById('EmpID').value;
   var passwordField = document.getElementById('password').value;
   var error = document.getElementById('error');

   error.style.color = 'red';

   error.innerHTML = '';

   event.preventDefault();


   //Functions to Validate the format of the data entered
   if( !(checkEmployeeID(IDfield) )    || !(checkPassword(passwordField) ))
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

      //If the data doesn't match any records in localStorage
      if( !(isEmployeeValid(data,"employee") ) )
      {
         error.innerHTML = 'Invalid employee ID or password'
      }//end if

      else
      {
         error.innerHTML = '';
         window.location.href = '../html/admin_console.html';
      }//end else


   }//end if
}) //end submit event listener

function checkEmployeeID(data)
{
   var depts = ['ADMN','CLRK', 'USER', 'DRVR'];
   var i;

   console.log(data);
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


function isEmployeeValid(data, userType)
{
   //Get the list of employees from local Storage
   var employees = localStorage.getItem('employeeInfo');
   var employeeList = JSON.parse(employees);

   var i;

   for(i = 0; i < employeeList.length; i++)
   {
      if( (employeeList[i].employeeID = data.employeeID) && (employeeList[i].password ==  data.password) )
      {
         //Get the first name, last name and license number of the successful driver
         var currentEmployee =
         {
            firstName : employeeList[i].firstName,
            lastName : employeeList[i].lastName,
            employeeId : employeeList[i].employeeID
         };
         sessionStorage.clear();
         sessionStorage.setItem('currentEmployeeInfo', JSON.stringify(currentEmployee) );
         return true;
      }//end if
   }//end for
   
   return false;
}//end isEmployeeValid