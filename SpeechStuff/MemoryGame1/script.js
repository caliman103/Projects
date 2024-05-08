function log(value) {
    console.log(value)
}

let numbersToGenerate 
let interval 
let numbersShown 
let index 
let numbersGussed 
let content 
let appState 
let commands
let numbers = []
let callFunction = true;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

addEventListener('load', function() {
    numbersToGenerate = 3
    interval = 3000
    numbersShown = []
    index = 0
    numbersGussed = []
    content = document.getElementById('main-content')
    appState = 'StartState'
    numbers = {
        "one" : "1",
        "two" : "2",
        "three" : "3",
        "four" : "4",
        "five" : "5",
        "six" : "6",
        "seven" : "7",
        "eight" : "8",
        "nine" : "9",
        "ten" : "10"
    }
    commands = startStateCommands()
})


//addEventListener('load', function(e) {
    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        console.log(transcript)

        for(let i = 0; i < commands.length; i++) {
            const pattern = new RegExp(`${commands[i]}`, 'i')
            if(pattern.test(transcript)) {                
                recognition.abort();
                let operation = appState+'Operation'
                window[operation](commands[i])
/*                 setTimeout(function() {
                    recognition.start()
                },150) */
                break;
            }
        }
    });
    recognition.addEventListener('end', function() {
        setTimeout(function() {
            recognition.start()    
        },150)  
    });
    recognition.start();  
//})

function StartStateOperation(command = '') {
    let pattern = new RegExp(`start`, 'i') 
    if(pattern.test(command)) {
        appState = 'ShowState'
        let operation = appState+'Operation'
        window[operation]()
        commands = showStateCommands()
    }
}

function RestartStateOperation(command) {
    setTimeout(function() {
        content.innerText = 'Say Start To Begin'
        appState = 'StartState'
        commands = startStateCommands() 
    },3000)
}

function reset(success) {
    content.innerText = success
    commands = restartStateCommands()
    appState = 'RestartState'
    numbersShown = []
    numbersGussed = []
    index = 0
    if(success === 'Success') {
        numbersToGenerate += 0.7
        interval -= 100
    }
    RestartStateOperation()
}

function ShowStateOperation() {
    for(let i = 0; i < Math.floor(numbersToGenerate); i++) {
        numbersShown.push(Math.ceil(Math.random() * 9).toString())
        if(numbersShown.length > 1) {
            while(numbersShown[i] === numbersShown[i-1]) {
                numbersShown.pop()
                numbersShown.push(Math.ceil(Math.random() * 9).toString())
            }
        } 
    }
    log(numbersShown)
    updateNumber()
    const intervalId = setInterval(updateNumber,interval)
    setTimeout(function() {
        content.innerText = 'Guess'
            appState = 'GuessState'
            clearInterval(intervalId)
            commands = guessStateCommands()
    },interval*numbersToGenerate)

    function updateNumber() {
        if(index >= numbersShown.length) {
            return
        }
        content.innerText = numbersShown[index]
        index++
    }
}

function GuessStateOperation(command) {
    let completePattern = new RegExp(`complete`, 'i')
    let erasePattern = new RegExp(`erase`, 'i')
    if(completePattern.test(command)) {
        reset(getResult())
    } else if(erasePattern.test(command)) {
        log('erase')
    } else {
        if(content.innerText === 'Guess') content.innerText = addNumber(command)
        else content.innerText += ", " + addNumber(command)
        numbersGussed.push(command)
    }
    //content.innerText = command;
}


function getResult() {
    formatNumbersGuessed()
        log(numbersGussed)
        let success = true
        numbersShown.forEach((number,index) => {
            if(index >= numbersGussed.length || numbersGussed[index] !== number) {
                success = false
                return
            }
        })
        if(success) return 'Success'
        else return 'Incorrect'
    
        function formatNumbersGuessed() {
            numbersGussed.forEach((number,index) => {
                if(Object.keys(numbers).includes(number)) numbersGussed[index] = numbers[number]
            })
        }
}

function addNumber(command) {
    if(Object.keys(numbers).includes(command)) return numbers[command]
    return command 
}

function startStateCommands() {
    return ['Start']
}

function restartStateCommands() {
    return []
}

function showStateCommands() {
    return []
}

function guessStateCommands(test = 'nine') {
    let myArray = []
    Object.keys(numbers).forEach(function(key) {
        myArray.push(key, numbers[key])
    })
    myArray.push('Complete', 'Erase')
    //return ['1', 'one', '2', 'two', '3', 'three', '4', 'four', '5', 'five', '6', 'six', '7', 'seven', '8', 'eight', '9', 'nine', '10', 'ten', 'Complete', 'Erase']
    return myArray
}