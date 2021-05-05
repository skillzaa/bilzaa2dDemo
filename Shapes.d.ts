import BaseShape from "./BaseShape.js";
import Arc from "./shapes/Arc.js";
import Text from "./shapes/Text.js";
import Rectangle from "./shapes/Rectangle.js";
export default class Shapes {
    data: BaseShape[];
    constructor();
    /** we need this methos so that we can piece together the Base shape */
    private getBaseShape;
    addArc(name: any): Arc;
    addRectangle(name: any): Rectangle;
    addText(name: any): Text;
}
