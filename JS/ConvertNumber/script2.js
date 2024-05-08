function numberToWords(number) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (number === 0) return '';

  if (number < 10) {
      return ones[number];
  } else if (number < 20) {
      return teens[number - 10];
  } else if (number < 100) {
      return tens[Math.floor(number / 10)] + ' ' + ones[number % 10];
  } else if (number < 1000) {
      return ones[Math.floor(number / 100)] + ' hundred ' + numberToWords(number % 100);
  } else if (number < 1000000) {
      return numberToWords(Math.floor(number / 1000)) + ' thousand ' + numberToWords(number % 1000);
  } else if (number < 1000000000) {
      return numberToWords(Math.floor(number / 1000000)) + ' million ' + numberToWords(number % 1000000);
  } else if (number < 1000000000000) {
      return numberToWords(Math.floor(number / 1000000000)) + ' billion ' + numberToWords(number % 1000000000);
  } else {
      return 'Number too large to convert';
  }
}

// Example usage:
console.log(numberToWords(10001)); // Outputs: "one hundred twenty three million four hundred fifty six thousand seven hundred eighty nine"
