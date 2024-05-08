function log(value) {
  console.log(value);
}

let myNumbers = {};
let data;
let button;
let result;

addEventListener("load", setUp);

function setUp() {
  data = document.getElementById("data");
  result = document.getElementById("result");
  /*   button = document.getElementById("convert-button");
  button.addEventListener("click", function () {
    if (checkData) convertWord(data.value.trim().toLowerCase());
  }); */
  data.addEventListener("input", () => {
    convertWord(data.value.trim().toLowerCase());
  });
  myNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
    hundred: 100,
    thousand: 1000,
    million: 1000000,
  };
}

function checkData(data) {
  return true;
}

function convertWord(numberString) {
  let myResult = 0;
  let words = Object.keys(myNumbers).find(
    (key) => myNumbers[key] === numberString.split(" ").length
  );
  let functionName = "convert" + words.charAt(0).toUpperCase() + words.slice(1);
  myResult = window[functionName](numberString);
  //log(myResult)
  if (myResult === undefined || isNaN(myResult)) result.value = "";
  else result.value = myResult.toLocaleString();
  //log(`${numberString} is ${myResult.toLocaleString()}`);
  //result.value = myResult.toLocaleString();
}

function convertOne(numberString) {
  let pattern = new RegExp("-");
  let invalids = new RegExp("(-hundred|-thousand|-million)$");
  if (invalids.test(numberString)) return NaN;
  if (!pattern.test(numberString)) return myNumbers[numberString];
  else
    return (
      parseInt(myNumbers[numberString.split("-")[0]]) +
      parseInt(myNumbers[numberString.split("-")[1]])
    );
}

function convertTwo(numberString) {
  return (
    convertOne(numberString.split(" ")[0]) *
    myNumbers[numberString.split(" ")[1]]
  );
}

function convertThree(numberString) {
  let pattern = new RegExp("thousand|million");
  if (pattern.test(numberString.split(" ")[2])) {
    return (
      convertOne(numberString.split(" ")[0]) *
      convertOne(numberString.split(" ")[1]) *
      convertOne(numberString.split(" ")[2])
    );
  }
  return (
    convertOne(numberString.split(" ")[0]) *
    convertOne(numberString.split(" ")[1])
  );
}

function convertFour(numberString) {
  let pattern = new RegExp(" and ");
  if (
    !pattern.test(numberString) &&
    !/(hundred|thousand|million)$/.test(numberString)
  )
    return NaN;
  if (pattern.test(numberString)) {
    let firstSet = numberString.split(pattern)[0];
    let secondSet = numberString.split(pattern)[1];
    return convertTwo(firstSet) + convertOne(secondSet);
  } else {
    let first = numberString.split(" ")[0];
    let second = numberString.split(" ")[1];
    let third = numberString.split(" ")[2];
    let fourth = numberString.split(" ")[3];
    return convertTwo(first + " " + second) + convertTwo(third + " " + fourth);
  }
}

function convertFive(numberString) {
  let pattern = new RegExp(" and ");
  let andPattern = new RegExp("^and$");
  let hundredPattern = new RegExp("hundred");
  let endInThousand = new RegExp("thousand$");
  if (andPattern.test(numberString.split(" ")[2])) {
    if (hundredPattern.test(numberString.split(" ")[1])) {
      let firstSet = numberString.split(pattern)[0];
      let secondSet = numberString.split(pattern)[1];
      return convertTwo(firstSet) * 1000 + convertTwo(secondSet);
    } else {
      let firstSet = numberString.split(pattern)[0];
      let secondSet = numberString.split(pattern)[1];
      return parseInt(convertTwo(firstSet) + parseInt(convertTwo(secondSet)));
    }
  } //end elss if
  if (andPattern.test(numberString.split(" ")[3])) {
    let firstSet = numberString.split(pattern)[0];
    let secondSet = numberString.split(pattern)[1];
    return parseInt(convertThree(firstSet)) + parseInt(convertOne(secondSet));
  } //end else

  if (endInThousand.test(numberString)) {
    let firstSet = numberString.split(" ").splice(0, 2).join(" ");
    let secondSet = numberString.split(" ").splice(2, 5).join(" ");
    return parseInt(convertTwo(firstSet) + convertThree(secondSet));
  }

  let firstSet = numberString.split(" ").splice(0, 3).join(" ");
  let secondSet = numberString.split(" ").splice(3, 5).join(" ");
  return parseInt(convertThree(firstSet) + convertTwo(secondSet));
  /**
   *
   * one hundred and forty-five thousand
   * one million and forty-five thousand
   * one hundred million and one
   * one hundred thousand one hundred
   * one million two hundred thousand
   */
}

function convertSix(numberString) {
  let pattern = new RegExp(" and ");
  if (pattern.test(numberString)) {
    let firstSet = numberString.split(" ").splice(0, 2).join(" ");
    let secondSet = numberString.split(" ").splice(2, 4).join(" ");
    let thirdSet = numberString.split(" ").splice(5, 6).join(" ");
    return parseInt(
      convertTwo(firstSet) + convertTwo(secondSet) + convertOne(thirdSet)
    );
  } else {
    let firstSet = numberString.split(" ").splice(0, 3).join(" ");
    let secondSet = numberString.split(" ").splice(3, 6).join(" ");
    return parseInt(convertThree(firstSet) + convertThree(secondSet));
  }
  /**
   * one thousand two hundred and five
   * nine thousand nine hundred and ninety-nine
   * ten thousand one hundred and forty-five
   * ninety-nine thousand nine hundred and ninety-nine
   * one million two hundred and one
   * one hundred million two hundred thousand
   */
}

function convertSeven(numberString) {
  let pattern = new RegExp("^and$");
  let andPattern = new RegExp(" and ");
  let firstSet = numberString.split(" ").splice(0, 5).join(" ");
  if (
    !andPattern.test(numberString) ||
    pattern.test(numberString.split(" ")[2])
  ) {
    log("asxwsa");
    let secondSet = numberString.split(" ").splice(5, 7).join(" ");
    return parseInt(convertFive(firstSet) + convertTwo(secondSet));
  } else if (pattern.test(numberString.split(" ")[5])) {
    log("asd");
    let secondSet = numberString.split(" ").splice(6, 7).join(" ");
    return parseInt(convertFive(firstSet) + convertOne(secondSet));
  }
  log(numberString.split(" ")[5]);
  log("asdasdas");
  return (
    convertTwo(numberString.split(" ").splice(0, 2).join(" ")) +
    convertFive(numberString.split(" ").splice(2, 6).join(" "))
  );
  /**
   * one hundred and forty-five thousand two hundred
   * one hundred thousand two hundred and one
   * one million two hundred thousand and one
   * one million two hundred thousand five hundred
   * one million two hundred and forty-five thousand
   */
}

function convertEight(numberString) {
  let pattern = new RegExp(" and ");
  let andPattern = new RegExp("^and$");
  if (andPattern.test(numberString.split(" ")[6])) {
    let firstSet = numberString.split(pattern)[0];
    let secondSet = numberString.split(pattern)[1];
    return parseInt(convertSix(firstSet) + convertOne(secondSet));
  } else if (andPattern.test(numberString.split(" ")[5])) {
    return (
      convertThree(numberString.split(" ").splice(0, 3).join(" ")) +
      convertFive(numberString.split(" ").splice(3, 8).join(" "))
    );
  }
  let firstSet = numberString.split(" ").splice(0, 3).join(" ");
  let secondSet = numberString.split(" ").splice(3, 6).join(" ");
  let thirdSet = numberString.split(" ").splice(6, 8).join(" ");
  return (
    convertThree(firstSet) + convertThree(secondSet) + convertTwo(thirdSet)
  );
  /**
   * one hundred million two hundred thousand and forty-five
   * one hundred million two hundred and forty-five thousand
   * one hundred million two hundred thousand five hundred
   */
}

function convertNine(numberString) {
  let andPattern = new RegExp("^and$");
  if (
    (andPattern.test(numberString.split(" ")[2]) &&
      andPattern.test(numberString.split(" ")[7])) ||
    (andPattern.test(numberString.split(" ")[4]) &&
      andPattern.test(numberString.split(" ")[7]))
  ) {
    let firstSet = numberString.split(" ").splice(0, 7).join(" ");
    let secondSet = numberString.split(" ").splice(-1).join(" ");
    return convertSeven(firstSet) + convertOne(secondSet);
  }

  let firstSet = numberString.split(" ").splice(0, 7).join(" ");
  let secondSet = numberString.split(" ").splice(-2).join(" ");
  return convertSeven(firstSet) + convertTwo(secondSet);
  /**
   * one hundred and forty-five thousand two hundred and fifty-five
   * one million two hundred and forty-five thousand and one
   * one million two hundred and forty-five thousand two hundred
   */
}

function convertTen(numberString) {
  return (
    convertEight(numberString.split(" ").splice(0, 8).join(" ")) +
    convertTwo(numberString.split(" ").splice(8, 10).join(" "))
  );
  /**
   * one hundred million two hundred and forty-five thousand five hundred
   */
}

function convertEleven(numberString) {
  return (
    convertSeven(numberString.split(" ").splice(0, 7).join(" ")) +
    convertFour(numberString.split(" ").splice(7, 10).join(" "))
  );
  /**
   * one million two hundred and forty-five thousand five hundred and one
   * ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine
   */
}

/**
 *
 * 0 - 99
 *      one                                      <- convertOne()
 *      forty-five                               <- convertOne()
 *      ninety-nine                              <- convertOne()
 * 100 - 999
 *      two hundred                             <- convertTwo()
 *      two hundred and fifty                   <- convertFour()
 *      two hundred and fifty-five              <- convertFour()
 *      nine hundred and ninety-nine            <- convertFour()
 *
 * 1000 - 9999
 *      one thousand                                    <- convertTwo()
 *      one thousand and one                            <- convertFour()
 *      one thousand three hundred                      <- convertFour()
 *      one thousand two hundred and five               <- convertSix()
 *      one thousand and forty-five                     <- convertFour()
 *      nine thousand nine hundred and ninety-nine      <- convertSix()
 *
 * 10,000 - 99,999
 *      ten thousand                                        <- convertTwo()
 *      ten thousand and one                                <- convertFour()
 *      ninety-nine thousand and seventy-one                <- convertFour()
 *      ten thousand one hundred                            <- convertFour()
 *      ten thousand one hundred and forty-five             <- convertSix()
 *      ninety-nine thousand nine hundred and ninety-nine   <- convertSix()
 *
 * 100,000 - 999,999
 *      one hundred thousand                                                <- convertThree()
 *      one hundred thousand and one                                        <- convertFive()
 *      one hundred thousand one hundred                                    <- convertFive()
 *      one hundred and forty-five thousand                                 <- convertFive()
 *      one hundred and forty-five thousand two hundred                     <- convertSeven()
 *      one hundred and forty-five thousand two hundred and fifty-five      <- convertNine()
 *      nine hundred and ninety-nine thousand nine hundred and ninety-nine  <- convertNine()
 *
 * 1,000,000 - 99,999,999
 *      one million                                                                              <- convertTwo()
 *      one million and one                                                                      <- convertFour()
 *      one million two hundred                                                                  <- convertFour()
 *      one million two hundred and one                                                          <- convertSix()
 *      one million two hundred thousand                                                         <- convertFive()
 *      one million two hundred thousand five hundred                                            <- convertSeven()
 *      one million two hundred thousand and one                                                 <- convertSeven()
 *      one million two hundred thousand and forty-five                                          <- convertSeven()
 *      one million two hundred and forty-five thousand two hundred                              <- convertNine()
 *      one million two hundred and forty-five thousand and one                                  <- convertNine()
 *      one million two hundred and forty-five thousand two hundred and one                      <- convertEleven()
 *      ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine   <- convertEleven()
 *
 *
 * convertFive()
 *    one hundred thousand and one
 *    one hundred thousand one hundred
 *    one hundred and forty-five thousand
 *    one million two hundred thousand
 *
 * convertSix
 *    one thousand two hundred and five
 *    nine thousand nine hundred and ninety-nine
 *    ten thousand one hundred and forty-five
 *    ninety-nine thousand nine hundred and ninety-nine
 *    one million two hundred and one
 *
 * convertSeven
 *    one hundred and forty-five thousand two hundred
 *    one million two hundred thousand and one
 *    one million two hundred thousand five hundred
 *
 * convertEight
 *    one hundred million two hundred thousand and forty-five
 *
 * convertNine
 *    one hundred and forty-five thousand two hundred and fifty-five
 *    one million two hundred and forty-five thousand and one
 *    one million two hundred and forty-five thousand two hundred
 *    nine hundred and ninety-nine thousand nine hundred and ninety-nine
 *
 * convertTen
 *    one hundred million two hundred and forty-five thousand five hundred
 *
 * convertEleven
 *    one million two hundred and forty-five thousand five hundred and one
 *    ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine
 *
 */

/*From chat
 function wordToDogit(words) {
    let currentNumber = 0
    let result = 0
    words.split(' ').forEach((word) => {
        if(word === 'and') {
            currentNumber = 0
        }
        else if(word === 'hundred') {
            currentNumber *= 100
            result += currentNumber
            currentNumber = 0
        }
        else if(word === 'thousand') {
            currentNumber *= 1000
            result += currentNumber
            currentNumber = 0
        }
        else if(word === 'million') {
            currentNumber *= 1000000
            result += currentNumber
            currentNumber = 0
        }
        else {
            currentNumber += convertOne(word)
            //result += currentNumber
        }
        
    })
    result += currentNumber
    log(result)
} */
