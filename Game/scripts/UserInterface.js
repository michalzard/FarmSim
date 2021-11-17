import WorldEditor from "../../Editor/World.js";

export default class UI{
    /**
     * Function call to call all UI drawing function calls
     */
    static drawAll(){
        UI.drawWE();
        window.requestAnimationFrame(UI.drawAll);
    }
    /**
     * Draw World Editor User Interface
     */
    static drawWE(){
        WorldEditor.availableSprites

        
    }
}