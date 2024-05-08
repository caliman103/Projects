

function loadData()
{
    var driver_licenseNo = document.getElementById('license-number');
    var driver_password = document.getElementById('password');

   //Get current drivers from local storage
   var curentDrivers = localStorage.getItem('driverInfo');

   //parse them to variable which will be used to add the current drived
   var updatedDrivers = JSON.parse(curentDrivers);

   //Get the last Driver added
   var lastDriver = updatedDrivers[updatedDrivers.length-1]; 

   driver_licenseNo.innerHTML = 'License No: ' + lastDriver.licenseNo;
   driver_password.innerHTML = 'Password: ' + lastDriver.password;
}//end loadData


function currentUser()
{
    var drivers = localStorage.getItem('driverInfo');
    var driverList = JSON.parse(drivers);


    var currentDriverInfo =
    {
        firstName : driverList[driverList.length - 1 ].firstName,
        lastName : driverList[driverList.length - 1].lastName,
        licenseNo : driverList[driverList.length -1].licenseNo
    };
    sessionStorage.clear();
    sessionStorage.setItem('currentDriverInfo',JSON.stringify(currentDriverInfo) );

}//end Current User