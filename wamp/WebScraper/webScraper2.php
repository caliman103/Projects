<?php
// URL to scrape
$url = 'https://www.w3schools.com/charsets/ref_emoji_smileys.asp';

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute cURL session
$response = curl_exec($ch);
 // Check for errors
if(curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
    exit;
}

// Close cURL session
curl_close($ch);

// Parse the HTML content
$dom = new DOMDocument();
@$dom->loadHTML($response);

// Find specific elements using DOMXPath
$xpath = new DOMXPath($dom);

//Get the first td element in each table row => the first cell has the emoji
$tableCells = $xpath->query("//table/tr/td[1]");
$emojis = [];

//Add each emoji to an associative array
foreach($tableCells as $key => $tableCell) { 
    $emojis['a'.$key+1] = $tableCell->nodeValue;
}

//Encode the associative array to json, this will be fetched by the js script 
echo json_encode($emojis);