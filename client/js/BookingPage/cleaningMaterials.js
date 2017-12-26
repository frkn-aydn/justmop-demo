export default class schedule{
    constructor(buttonArea){
        this.buttonArea = buttonArea;
        this.value = "yes";
        this.created = false
    }
    init(){
        if(this.created) return;
        const that = this;
        const buttons = that.buttonArea.children;
        for(var i=0; i<buttons.length; i++){
            const button = buttons[i]
            if(button.dataset.type != that.value) button.classList.remove("active");
            button.addEventListener("click", e=>{
                const value = e.currentTarget.dataset.type;
                that.updateValue(value);
                that.created = true
                for(var i=0; i<buttons.length; i++){
                    buttons[i].classList.remove("active");
                }
                e.currentTarget.classList.add("active");
            })
        }
    }
    updateValue(value){
        this.value = value
    }
}