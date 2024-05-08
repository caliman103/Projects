

function checkUser()
{
    if(!sessionStorage.getItem('currentDriverInfo') )
    {
        window.location.href = '../html/index.html';
    }//end if
    else
    {
        var driver = sessionStorage.getItem('currentDriverInfo');
        var driverInfo = JSON.parse(driver);

        var name = document.getElementById('name');
        var licenseNo = document.getElementById('licenseNo');

        name.innerHTML = 'Name: ' + driverInfo.firstName + ' ' + driverInfo.lastName;

        licenseNo.innerHTML = 'License No: ' + driverInfo.licenseNo;
    }//end else
}//end check User

 

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showMenu() 
{
    document.getElementById("menu-items").classList.toggle("show");
}//end showMenu
  
  // Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) 
{
    if (!event.target.matches('.dropdown-menu')) 
    {
      var dropdowns = document.getElementsByClassName("menu-items");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) 
        {
          openDropdown.classList.remove('show');
        } //end if
      }
    }//end if
}//end event function



function logOut()
{
  if(sessionStorage.getItem('currentDriverInfo') )
  {
    sessionStorage.removeItem('currentDriverInfo');
  }

    window.location.href = '../html/index.html';
}//end logout