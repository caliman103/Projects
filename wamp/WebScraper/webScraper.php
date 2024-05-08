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

// Example: Extracting all <a> tags and their href attribute
//$links = $xpath->query("//a/@href");

$tableCells = $xpath->query("//td");
$codes = [];

for($i = 1; $i < ceil(count($tableCells)/4)+1; $i++) {
    $codes['a'.$i] = $tableCells[($i*4) - 4]->nodeValue;
}

echo json_encode($codes);


