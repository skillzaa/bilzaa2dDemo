import PlayHead from "../node_modules/playhead99/dist/PlayHead.js";
import Shapes from "../node_modules/shapes99/dist/Shapes.js";
import Metal from "../packages/Metal.js";
export default class Bilzaa2d {
    constructor() {
        //    this.premades = new Premades();
        this.playHead = new PlayHead();
        this.metal = new Metal();
        this.globals = {};
        this.shapes = new Shapes();
    }
    play() {
        // try{  
        this.playHead.play();
        this.gameLoop();
        //   } catch (err) {
        //       return "some error occured";
        //   } 
    } //play
    gameLoop() {
        //try{  
        this.metal.clearCanvas("#082775");
        //----------the main loop
        this.shapes.data.forEach(item => {
            const curSec = this.playHead.runningTime();
            //console.log(curSec);
            item.preUpdate();
            item.update(curSec);
            item.postUpdate();
            item.preDraw();
            item.draw(this.metal);
            item.postDraw();
        });
        window.requestAnimationFrame(this.gameLoop.bind(this));
        //}catch (err){
        //     window.requestAnimationFrame(this.gameLoop.bind(this));  
        //     return true;
        // }
    } //play
    drawShapes() {
        //----------the main loop
        this.shapes.forEach(item => {
            item.draw();
        });
    } //play
} //class
