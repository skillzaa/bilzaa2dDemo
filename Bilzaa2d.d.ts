import PlayHead from "./PlayHead.js";
import Shapes from "./Shapes.js";
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
