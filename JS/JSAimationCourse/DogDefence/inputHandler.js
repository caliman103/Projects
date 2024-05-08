function log(value) {
    console.log(value)
}
export default class InputHandler {
    constructor() {
        this.keys = []
        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' || 
                e.key === 'x' ||
                e.key === 'z') &&
                this.keys.indexOf(e.key) === -1) this.keys.push(e.key)
        })//end KeyDown Event

        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' || 
               e.key === 'ArrowUp' || 
               e.key === 'ArrowLeft' ||
               e.key === 'ArrowRight' ||
               e.key ===  'x' ||
               e.key === "z") this.keys.splice(this.keys.indexOf(e.key),1)
        })//end KeyUp Event
    }//end constructor
}//end InputHandler 