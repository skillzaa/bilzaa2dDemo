import PlayHead from "../node_modules/playhead99/dist/PlayHead.js";
import Shapes from "../node_modules/shapes99/dist/Shapes.js";
import Metal from "../packages/Metal.js";
export default class Bilzaa2d {
    playHead: PlayHead;
    metal: Metal;
    shapes: Shapes;
    globals: {};
    constructor();
    play(): void;
    gameLoop(): void;
    drawShapes(): void;
}
