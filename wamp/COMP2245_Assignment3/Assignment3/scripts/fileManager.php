<?php

//Takes the json file and converts it into a string and returns that string to a drop down box
function loadParishes() : string
{
    //chesks for the file
   if(!file_exists('../data/parishes.json'))
   {
        die('file not found');
   }//end if

    //Gets the contents from the parish.json file as an array
    $parishes = json_decode(file_get_contents('../data/parishes.json'));

    $parishList = '';

    //loops through the parishes array and adds a dropdown for each parish
    foreach($parishes as $parish)
    {
        $parishList = $parishList . '<option value ="'.$parish .'">'. $parish.'</option>';
    }//end for

    return $parishList;
}//end loadParishes
 

//Convert a js Json file to a standard JSON file
function jsJSON2CSV(string $data) : string
{
    if(empty($data))
    {
        die('invalid parameter value');
    }//end if
    //fix the js json file 
    $pattern = "/(\w+):/i";
    $replacement = '"${1}":';

    return preg_replace($pattern, $replacement, $data);

}//end jsJSON2CSV


//Convert json file to a csv file
function json2Csv(string $infile)
{
    //Check to see if file exists
    if(!file_exists($infile))
    {
        die('file not found' . $infile);
    }//end if
 
    //String to hold what was in the file
    $json_string = file_get_contents($infile);
    $json_string = jsJSON2CSV($json_string);

    //Get the conents as an associative array
    $json_arrray = json_decode($json_string,true);

    //Check for errors
    if(json_last_error() == JSON_ERROR_NONE)
    {
        //Create CSV file
        //Make sue file can be opened for wrinting
        if(($fp = fopen('../data/drivers.csv', 'w')) === false )
        {
            die('Cannot open drivers.csv for writing');
        }//end if

        //file handle is available
        foreach($json_arrray[0] as $fields)
        {
            fputcsv($fp, $fields);
        }//end foreach

        fclose($fp);
        //echo 'driver.csv created!!!<br>';
    }//end if
    else
    {
        //echo 'CSV file creaion failed ' . json_last_error_msg() . '<br>';
        //echo $json_string;
    }//end else

}//end json2CSV


//Takes csv file and convert them to array
function csv2Array($filePointer, $member_fields) : array
{
    if(get_resource_type($filePointer) != 'stream')
    {
        die('Bad file handler');
    }//end if

    while(($line = fgetcsv($filePointer,1024, ",") ) !== false)
    {    
        $data[] = $line;
    }//end while

    foreach($data as $rec)
    {
        if( ($newArray[] = array_combine($member_fields, $rec) ) === false )
        {
            //echo 'fields and headers do not match';
            //echo var_dump($member_fields, $rec);
            exit;
        }//end if
    }//end foreach

    return $newArray;
}//end csv2Array


//Converts csv file to JSON array
function makeJsonData() : array
{
    $member_fields = ['nationalID','licenseNo','fName','lName', 'address1', 'address2', 'parish', 'password'];

    //Open files for conversion
    if(($fp = fopen('../data/drivers.csv', 'r')) === false)
    {
        die('Cannot open drivers.csv for reading');
    }//end if

    //Make array from CSV files
    $driverArray = csv2Array($fp, $member_fields);

    //convert the array to JSON
    json_encode($driverArray, JSON_PRETTY_PRINT);

    fclose($fp);

    return $driverArray;
}//end makeJsonData

//Create the csv file if needed
if(!file_exists('../data/drivers.csv'))
{
    json2Csv('../data/driverInformation.txt');
}//end if

?>

