<?php
    header("Content-type: text/css");
?>

body
{
  background-color:#F1F1F1;
}

.has-form
{
  margin:auto;
  width:67%;
}

table 
{
  margin-left:auto;
  margin-right:auto;
  margin-bottom:50px;
  font-family: arial, sans-serif;
  width: 88%;
  border-collapse: collapse;

}

#index-table
{
  width:80%;
}

td, th {
  border: 1px solid #54392C;
  text-align: center;
  padding: 8px;
}

tr:nth-child(odd) {
  background-color: #dddddd;
}

a
{
  text-decoration: none;
}

.view-link
{
  color:#279524;
}

.edit-link
{
  color:#2B46CF;
}

.text
{
  text-align:center;
  
}

.my-buttons
{
  display: flex;
  justify-content: center;
}

.my-button-links
{
  color:black;
}

.correction
{
  color:red;
}

.success
{
  color:#367329;
}

.button
{
  border-radius: 10px;
  padding: 10px 10px;
  text-align: center;
  display: grid;
  margin:auto;
  cursor:pointer;
}

.submit-button
{
  
  margin-left:37%;
}

.reset-button
{
  margin-right:37%;
}

.search-button
{
  margin-bottom:20px; 
}



.edit-button
{
  margin-left:44%;
}

.edit-reset-button
{
  margin-right:43.5%;
}

#add-button
{
  margin-right:-200px;
}

#search-button
{
  margin-left:-200px;
}

#return-link
{
  color: black;
}
h4, h3
{
  color:#D82424;
}

.form
{
  padding:20px;
  margin-top:30px;
  text-align:center;
  
  box-shadow: 0px -2px 10px 2px blue inset;
  border-radius:15px;
}

.search-form
{
  padding:20px;
  margin-top:20px;
  text-align:center;
}

.dropdown-label
{
  margin-left:15px;
}

.edit-fields
{
  margin-top:30px;
}

.form input
{
  margin:2px;
}

.form option
{
  text-align:center;
}

.question-mark
{
  height:23px;
}

.dropdown
{
  position:relative;
  top:-5px;
  left:10px;
  cursor:pointer;
  display:inline-block;
}

.dropdown-content
{
  display: none;
  position: absolute;
  top:-5.5px;
  left:83px;
  z-index: 1;
  width:325%;
  background-color: #787B85;
  border-radius:10px;
  color:white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.needs-adjusting
{
  top:5px;
  left:-2px;
}

.dropdown:hover .dropdown-content
{
  display: block;
}

.row::after
{
    content: "";
    clear: both;
    display: table;
}


[class *= "col-"]
{
    float: left;
    padding: 15px;
    margin: auto;
}

.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}


.add-input-field 
{
  padding:5px;
  border-width:1.5px;
}

.add-select
{
  width:200px;
  height:30px;
}

.add-input-field:hover, .add-select:hover, .search-select:hover, .search-input:hover, .search-select-range:hover, .edit-select:hover, .edit-input-field:hover, button:hover
{
  border-radius:5px;
  background-color:#F7F7F7;
}

.add-input-field:focus, .search-input:focus, .edit-inout-field:focus
{
  border-radius:5px;
  background-color:#F7F7F7;
}

.search-select
{
  width:130px;
  height:25px;
}

.search-select-range
{
  width:85px;
  height:25px;
}


.edit-select
{
  height:25px;
}


.edit-input-field
{
  height:25px;
}

