

function checkUser()
{
    if(!sessionStorage.getItem('currentEmployeeInfo') )
    {
        window.location.href = '../html/index.html';
    }//end if
    else
    {
        var employee = sessionStorage.getItem('currentEmployeeInfo');
        var employeeInfo = JSON.parse(employee);

        var name = document.getElementById('name');
        var empID = document.getElementById('employee-ID');

        name.innerHTML = 'Employee: ' + employeeInfo.firstName + ' ' + employeeInfo.lastName;

        var second_four = employeeInfo.employeeID.substring(4,8);

        empID.innerHTML = 'Employee ID: ' + second_four;

        
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
  if(sessionStorage.getItem('currentEmployeeInfo') )
  {
    sessionStorage.removeItem('currentEmployeeInfo');
  }
    window.location.href = '../html/index.html';
}//end logout