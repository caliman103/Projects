window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const colours = ['red', 'green', 'blue', 'cyan', 'purple', 'black', 'orange', 'yellow', 'brown', 'magenta', 'pink', 'gray', 'aqua', 'navy', 'gold', 'indigo', 'silver', 'white', 'maroon', 'olive', 'teal', 'violet', 'rainbow' ];

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
let listening = false;


addEventListener('keydown', e => {
    if(e.key === ' ') listening = true;
})

addEventListener('keyup', e => {
    if(e.key === ' ') listening = false;
})


recognition.addEventListener('result', (e) => {
    //if(listening) {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        console.log(transcript)

        for(let i = 0; i < colours.length; i++) {
            const pattern = new RegExp(`${colours[i]}`, 'i')
            if(pattern.test(transcript)) {
                if(colours[i] === 'rainbow') {
                    if(!document.body.classList.contains('fancy')) document.body.classList.add('fancy')
                } else {
                    if(document.body.classList.contains('fancy')) document.body.classList.remove('fancy')
                    document.body.style.backgroundColor = colours[i]
                }
                break;
            }
        }

        
    //}
    
});

recognition.addEventListener('end', recognition.start);

recognition.start();