'use strict';

/**This Object can have 2 states wrt time. One is running state and other paused. both cases are to be dealt with seperately. during running state the time is calculated by the difference between time now and a start time variable. on the other hand during pause state the time is placed inside oldTime variable and can be managed from there. when resumed this oldtime is subtracted from the startTime (this oldTime is the time which the animation has already run previously thus to resume  we need to subtract it). similarly while forward and rewind also we have to treat running states and paused state seperately.
*/
// export default class PlayHead {
class PlayHead {
    /**Duration has to be in seconds */
    constructor(duration = 100, paused = true) {
        this.duration = duration * 1000; //convert it into milisecond 
        this.oldTime = 0;
        this.paused = paused;
        this.startTime = 0;
    }
    runningTime() {
        if (this.paused === false) {
            const t = (Date.now() - this.startTime);
            return Number((t));
        }
        else {
            return Number(this.oldTime);
        }
    }
    play() {
        if (this.paused === true) { //pause cant be repeated w/o stop
            this.startTime = (Date.now() - this.oldTime); //if its first time then oldTime=0
            this.oldTime = 0;
            this.paused = false;
        }
    }
    pause() {
        if (this.paused === false) { // so playing prev and now will pause
            this.oldTime = Date.now() - this.startTime; //store time already ran
            this.startTime = 0; //we need reset since now the old startTime does not matter
            this.paused = true;
        }
    }
    stop() {
        this.oldTime = 0; //since its start so old time is gone
        this.startTime = 0;
        this.paused = true;
    }
    resume() {
        this.play();
    }
    forward(ms = 5000) {
        let oldPause = false; //save the paused status
        if (this.paused === true) {
            oldPause = true;
        }
        this.pause(); // just to make sure that the transaction goes well
        if (this.oldTime + ms < this.duration) {
            this.oldTime = this.oldTime + ms;
        }
        if (oldPause == false) {
            this.play();
        }
    }
    rewind(ms = 5000) {
        let oldPause = false;
        if (this.paused === true) {
            oldPause = true;
        }
        this.pause();
        if (this.oldTime - ms > 0) {
            this.oldTime = this.oldTime - ms;
        }
        if (oldPause == false) {
            this.play();
        }
    }
}

class Validator {
    constructor() {
    } //const
    isNumber(no, shout = false, message = "This is not a Number") {
        //if (data === parseInt(data, 10))
        if ((typeof no) != "number") {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    isInteger(no, shout = false, message = "This is not an Integer") {
        if (Number.isInteger(no) === false) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    isSmaller(smaller, bigger, shout = false, message = "First Number is not smaller than the second number") {
        if (bigger < smaller) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    } //fn
    wholeNumber(no, shout = false) {
        this.isNumber(no, shout);
        return Number(Math.round(no));
    }
    isString(str, shout = false, message = "This value is not string") {
        if (typeof str === 'string') {
            return true;
        }
        else if (shout === true) {
            throw new Error(message);
        }
        else {
            return false;
        }
    }
    isBoolean(b, shout = false, message = "This value is not boolean") {
        if (typeof b === 'boolean') {
            return true;
        }
        else if (shout === true) {
            throw new Error(message);
        }
        else {
            return false;
        }
    }
    isSNB(snb, shout = false, message = "This value is not boolean or string or number") {
        const isString = this.isString(snb, false);
        const isBoolean = this.isBoolean(snb, false);
        const isNumber = this.isNumber(snb, false);
        if (isString == false && isBoolean == false && isNumber == false) {
            if (shout === true) {
                throw new Error(message);
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
} //class

const val = new Validator();
class ArrayOfObjects {
    constructor() {
        this.data = [];
    }
    add(name, value = "") {
        val.isString(name, true, "The name is compulsary and should be of type string");
        if (this.isUnique(name) === true) {
            const a = {};
            a.name = name;
            a.value = value;
            this.data.push(a);
            return a;
        }
        else {
            throw new Error(`Please Provide a unique and valid string name for the object. The name ::${name} already exists`);
        }
    }
    isUnique(name) {
        if (typeof name == "undefined") {
            return false;
        }
        let uniqueOrNot = true;
        for (let idx = 0; idx < this.data.length; idx++) {
            const element = this.data[idx];
            if (element.name === name) {
                uniqueOrNot = false;
            }
        }
        return uniqueOrNot;
    }
    get length() {
        return this.data.length;
    }
    getItem(name) {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            if (this.data[idx].name === name) {
                return this.data[idx];
            }
        }
        return false;
    } //.....................
    getAttr(name, field = "value") {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            const thisName = this.data[idx].name;
            if (thisName == name) {
                return this.data[idx][field];
            }
        }
        return false;
    }
    setAttr(name, value, field = "value") {
        val.isString(name, true, "The name should be of type string");
        for (let idx = 0; idx < this.data.length; idx++) {
            if (this.data[idx].name == name) {
                this.data[idx][field] = value;
                return this.data[idx][field];
            }
        }
        return true;
    } //......
    getObjectsByName(argumentsRequired = []) {
        const ret = [];
        this.data.forEach(bd => {
            argumentsRequired.forEach(ag => {
                if (ag == bd.name) {
                    ret.push(bd);
                }
            });
        });
        return ret;
    }
    getItemsByNames(argumentsRequired = []) {
        const ret = [];
        this.data.forEach(bd => {
            argumentsRequired.forEach(ag => {
                if (ag == bd.name) {
                    ret.push(bd);
                }
            });
        });
        return ret;
    }
}

class BaseGenerator {
    constructor(aniData, argsForAlgo = {}) {
        //this.aniData = aniData;
        this.attributeToAnimateName = aniData.attributeToAnimateName; //must 
        this.fromSecond = aniData.fromSecond * 1000; //must for every animation
        this.toSecond = aniData.toSecond * 1000; //must for every animation
        this.readOnlyElementAttrNames = aniData.readOnlyElementAttrNames;
        //--------------------------------------------------------------------
        this.argsForAlgo = argsForAlgo;
        //--------------------------------------------------------------------
        this.fps = 60; // this has to be settled
        this.state = {}; ///every new data goes here
    }
    animate(attributeToAnimateData, currentSecondMilli, readOnlyElementData = {}) {
        return true;
    }
}

class Counter extends BaseGenerator {
    constructor(aniData, argsForAlgo = {}) {
        super(aniData, argsForAlgo);
        // this.    
        this.milliPerPixConst = this.milliPerPix();
    }
    animate(attributeToAnimateData, currentSecondMilli, readOnlyElementData = {}) {
        //--------------------------------
        /**chq if time is valid */
        if (this.isTimeValid(currentSecondMilli) === false) {
            throw new Error("The current Time is before than the starting time OR after the finish point of the animation");
        }
        //--------------------------------
        const timeDifferenceInMilli = this.currentTimeDifferenceInMilli(currentSecondMilli);
        (timeDifferenceInMilli / this.milliPerPixConst);
        let ans = 0;
        if (this.argsForAlgo.from < this.argsForAlgo.to) {
            ans = (timeDifferenceInMilli / this.milliPerPixConst) + this.argsForAlgo.from;
        }
        else {
            ans = (timeDifferenceInMilli / this.milliPerPixConst) - this.argsForAlgo.from;
        }
        return Math.abs((Number(ans.toFixed(0))));
        //if (ans < 1){return 1;}else {return ans;}
        //--------------------------------
    }
    milliPerPix() {
        const timeDiff = (this.toSecond - this.fromSecond);
        const totalValueDiff = Math.abs((this.argsForAlgo.to - this.argsForAlgo.from));
        //consider using Math.ceil here
        const ans = Number((timeDiff / totalValueDiff).toFixed(0));
        if (ans < 1) {
            return 1;
        }
        else {
            return ans;
        }
    }
    currentTimeDifferenceInMilli(currentSecondMilli) {
        return Math.abs(Number(currentSecondMilli - this.fromSecond));
    }
    //-------------------------------------------------------------    
    isTimeValid(currentSecondMilli) {
        if ((currentSecondMilli > this.toSecond)
            ||
                (currentSecondMilli < this.fromSecond)) {
            return false;
        }
        else {
            return true;
        }
    }
}

class RandomColors extends BaseGenerator {
    constructor(aniData, argsForAlgo = {}) {
        super(aniData, argsForAlgo);
        this.state.previous = 0;
    }
    animate(attributeToAnimateData, currentSecond, readOnlyElementData = {}) {
        if (this.state.previous == 0) {
            this.state.previous = Date.now();
        }
        if (this.isWaitOver() == true) {
            this.state.previous = Date.now();
            return this.returnColor();
        }
        else {
            return attributeToAnimateData;
        }
    }
    //-------------------------------------------------------------    
    isWaitOver() {
        const lapsedTime = Math.abs(Date.now() - this.state.previous);
        if (lapsedTime > this.argsForAlgo.timeGap) {
            return true;
        }
        else {
            return false;
        }
    }
    //-------------------------------------------------------------   
    returnColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

class Vibrate extends BaseGenerator {
    constructor(aniData, argsForAlgo = {}) {
        super(aniData, argsForAlgo);
        this.state.previous = 0;
        //this.state.previous = 0;
    }
    animate(attributeToAnimateData, currentSecond, readOnlyElementData = {}) {
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        if (this.state.previous == 0) {
            this.state.previous = Date.now();
        }
        this.argsForAlgo.timeGap;
        this.argsForAlgo.deviation;
        if (this.isWaitOver() == true) {
            this.state.previous = Date.now();
            return this.manipulate(attributeToAnimateData);
        }
        else {
            return attributeToAnimateData;
        }
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
    }
    //-------------------------------------------------------------    
    isWaitOver() {
        const lapsedTime = Math.abs(Date.now() - this.state.previous);
        if (lapsedTime > this.argsForAlgo.timeGap) {
            return true;
        }
        else {
            return false;
        }
    }
    //-------------------------------------------------------------    
    manipulate(incomming) {
        const min = incomming - this.argsForAlgo.deviation;
        const max = incomming + this.argsForAlgo.deviation;
        return Math.abs(Math.random() * (max - min + 1) + min);
    }
}

class Generators {
    constructor() {
        this.data = [];
    }
    addCounter(attributeToAnimateName, fromSecond, toSecond, from, to, readOnlyElementAttrNames = []) {
        if (fromSecond > toSecond) {
            throw new Error("From second can not be bigger than to second.");
        }
        const aniData = {
            attributeToAnimateName: attributeToAnimateName,
            fromSecond: fromSecond,
            toSecond: toSecond,
            readOnlyElementAttrNames: readOnlyElementAttrNames
        };
        const argsForAlgo = { from: from, to: to };
        const a = new Counter(aniData, argsForAlgo);
        this.data.push(a);
        return a;
    }
    addVibrate(attributeToAnimateName, fromSecond, toSecond, timeGap, deviation, readOnlyElementAttrNames = []) {
        const aniData = {
            attributeToAnimateName: attributeToAnimateName,
            fromSecond: fromSecond,
            toSecond: toSecond,
            readOnlyElementAttrNames: readOnlyElementAttrNames
        };
        const argsForAlgo = { timeGap: timeGap, deviation: deviation };
        const a = new Vibrate(aniData, argsForAlgo);
        this.data.push(a);
        return a;
    }
    addRandomColors(attributeToAnimateName, fromSecond, toSecond, readOnlyElementAttrNames = []) {
        const aniData = {
            attributeToAnimateName: attributeToAnimateName,
            fromSecond: fromSecond,
            toSecond: toSecond,
            readOnlyElementAttrNames: readOnlyElementAttrNames
        };
        const a = new RandomColors(aniData, {});
        this.data.push(a);
        return a;
    }
}

class BaseShape {
    constructor(name) {
        this.attributes = getBaseAttributes(name);
        this.animations = [];
        this.generators = new Generators();
    }
    preUpdate() { }
    postUpdate() { }
    update(currentSecondMilli) {
        //==================LLLLLOOOOPPPPP======================== 
        this.animations.forEach(animation => {
            //----STEP 1 -- GET DATA FROM ATTRIBUTES COLLECTION
            //filter out not relavant seq here
            if ((currentSecondMilli >= animation.fromSecond)
                &&
                    (currentSecondMilli <= animation.toSecond)) {
                //----STEP 2 -- GET DATA FROM ATTRIBUTES COLLECTION
                //---get item by name since its one item --a string
                const attributeToAnimateValue = this.attributes.getItem(animation.attributeToAnimateName).value;
                const readOnlyElementData = this.attributes.getItemsByNames(animation.readOnlyElementAttrNames);
                //----STEP 3 -- Animate the data
                const retValue = animation.animate(attributeToAnimateValue, currentSecondMilli, readOnlyElementData); //wofffffff
                //----STEP 4 -- SAVE ATTRIBUTES
                this.attributes.setAttr(animation.attributeToAnimateName, retValue);
            } /////--filter no relevant animations
            //========================================== 
        });
        return true;
    }
    preDraw() {
    }
    draw(metal) {
        //console.log("Base Shape");
    } //draw ends
    postDraw() {
    }
    setAttr(attrName, attrValue) {
        return Number(this.attributes.setAttr(attrName, attrValue));
    }
    getAttr(attrName) {
        return (this.attributes.getAttr(attrName));
    }
    ////////////////////////////////---Animations---/////
    moveHorizontal(fromSecond = 1, toSecond = 5, from = 1, to = 100) {
        const l = this.generators.addCounter("x", fromSecond, toSecond, from, to);
        this.animations.push(l);
        return l;
    }
    // //---------------------------------
    moveVerticle(fromSecond = 1, toSecond = 5, fromY = 1, toY = 100) {
        const l = this.generators.addCounter("y", fromSecond, toSecond, fromY, toY);
        this.animations.push(l);
        return l;
    }
    // //---------------------------------
    moveDiagonal(fromSecond = 1, toSecond = 5, fromX = 1, toX = 100, fromY = 1, toY = 100) {
        const lX = this.generators.addCounter("x", fromSecond, toSecond, fromX, toX);
        this.animations.push(lX);
        const ly = this.generators.addCounter("y", fromSecond, toSecond, fromY, toY);
        this.animations.push(ly);
        return true;
    }
    simpleCounter(attribToAnimate = "x", fromSecond = 1, toSecond = 10, from = 100, to = 200) {
        const w = this.generators.addCounter(attribToAnimate, fromSecond, toSecond, from, to, []);
        this.animations.push(w);
        return w;
    }
    widen(fromSecond = 1, toSecond = 10, from = 100, to = 200) {
        return this.simpleCounter("width", fromSecond, toSecond, from, to);
    }
    heighten(fromSecond = 1, toSecond = 10, from = 100, to = 200) {
        return this.simpleCounter("height", fromSecond, toSecond, from, to);
    }
    scale(fromSecond, toSecond, fromWidth, toWidth, fromHeight, toHeight) {
        this.simpleCounter("width", fromSecond, toSecond, fromWidth, toWidth);
        //----------------------------
        this.simpleCounter("height", fromSecond, toSecond, fromHeight, toHeight);
        return true;
    }
    rotate(fromSecond = 1, toSecond = 5, from = 1, to = 100) {
        const w = this.simpleCounter("currentRotateAngle", fromSecond, toSecond, from, to);
        return w;
    }
}
//==========================================================
//==========================================================
//==========================================================
function getBaseAttributes(name) {
    const attributes = new ArrayOfObjects();
    //--The name--
    attributes.add(name, name);
    //--x,y,width,height--
    attributes.add("x", 100);
    attributes.add("y", 100);
    attributes.add("width", 100);
    attributes.add("height", 100);
    //--rotation--
    attributes.add("rotateClockwise", true);
    //---the angle at which);the obj is currently rotated--this is also rpm / rps
    attributes.add("currentRotateAngle", 0);
    //--colors--
    attributes.add("color", "green");
    attributes.add("opacity", 1); //----------???? transparency
    /**this just became border */
    attributes.add("lineWidth", 5); //----------???? transparency
    /**there is no strokeStyle since the color is fillStyle as well as strokeStyle since we have border feature coming later so we do not need this confusion now */
    //attributes.add({ name: "strokeStyle", value: "#F0000" });
    //--shadows--
    attributes.add("shadowColor", "grey");
    attributes.add("shadowBlur", 0);
    attributes.add("shadowOffsetX", 0);
    attributes.add("shadowOffsetY", 0);
    // if filled draw filled if not draw border only
    attributes.add("filled", true);
    attributes.add("lineDashSize", 1);
    attributes.add("lineDashGap", 0);
    attributes.add("drawBoundingRectangle", true);
    attributes.add("boundingRectangleColor", "red");
    attributes.add("boundingRectanglePadding", 20);
    //--20 items
    return attributes;
}
//====================================================
// export default getBaseAttributes;

class Arc extends BaseShape {
    constructor(name) {
        super(name);
        this.attributes.add("openingAngle", 0);
        this.attributes.add("closingAngle", 360);
        // this.attributes.add("filled", true); 
    }
    draw(metal) {
        metal.drawArc(this.attributes);
    } //draw ends
}

class Text extends BaseShape {
    // #hidden:string;
    constructor(name) {
        super(name);
        // this.#hidden = "its hidden";
        this.attributes.add("title", "Text");
        // this.attributes.add("color", "red");  
        this.attributes.add("fontSize", 22);
        this.attributes.add("fontFamily", "Arial");
    }
    draw(metal) {
        metal.drawText(this.attributes);
    } //draw ends
    widen(fromSecond = 1, toSecond = 10, fromWidth = 100, toWidth = 200) {
        const w = this.generators.addCounter("fontSize", fromSecond, toSecond, fromWidth, toWidth, []);
        this.animations.push(w);
        return w;
    }
    heighten(fromSecond = 1, toSecond = 10, fromWidth = 100, toWidth = 200) {
        const w = this.generators.addCounter("fontSize", fromSecond, toSecond, fromWidth, toWidth, []);
        this.animations.push(w);
        return w;
    }
}

class Rectangle extends BaseShape {
    constructor(name) {
        super(name);
        //    this.animations = new RectangleAnimations();
    }
    draw(metal) {
        metal.drawRectangle(this.attributes);
    } //draw ends
}

class Shapes {
    constructor() {
        this.data = [];
    }
    addArc(name) {
        const arc = new Arc(name);
        this.data.push(arc);
        return arc;
    }
    addRectangle(name) {
        const rec = new Rectangle(name);
        this.data.push(rec);
        return rec;
    }
    addText(name) {
        const txt = new Text(name);
        this.data.push(txt);
        return txt;
    }
}

class Metal {
    constructor(canvasName = "bilzaaCanvas") {
        this.load(canvasName);
    }
    //....................
    load(canvasName = "bilzaaCanvas") {
        try {
            this.canvas = document.getElementById(canvasName);
            this.ctx = this.canvas.getContext('2d');
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        }
        catch (err) {
            throw new Error("Canvas Elements not found");
        }
    }
    //....................
    clear() {
        this.ctx.fillStyle = "#f5ecc3";
        //clear the canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } //fn
    clearCanvas(fillStyle = "#ffffff") {
        this.saveCtx();
        this.ctx.fillStyle = fillStyle;
        //clear the canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.restoreCtx();
    } //fn  
    drawRectangleBorder(attributes) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.lineWidth = attributes.getAttr("borderWidth");
        this.ctx.lineJoin = "round"; //attributes.getAttr("borderWidth");
        this.ctx.strokeStyle = attributes.getAttr("borderColor");
        if (attributes.getAttr("dashedBorder") === true) {
            this.ctx.setLineDash([
                attributes.getAttr("dashSize"),
                attributes.getAttr("gapBetweenDashes")
            ]);
        }
        this.ctx.rect((attributes.getAttr("x") - (attributes.getAttr("borderWidth") / 2)), attributes.getAttr("y") - (attributes.getAttr("borderWidth") / 2), attributes.getAttr("width") + (attributes.getAttr("borderWidth")), attributes.getAttr("height") + (attributes.getAttr("borderWidth")));
        this.ctx.stroke();
        this.ctx.restore();
    }
    saveCtx() {
        this.ctx.save();
    }
    restoreCtx() {
        this.ctx.restore();
    }
    drawCircle(attributes) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("radius"), attributes.getAttr("openingAngle"), attributes.getAttr("closingAngle"));
        /**the color of the circle is the color of fill as well as stroke-- later we will have border color but for now dont confuse the issue */
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.stroke();
        }
        this.ctx.restore();
    } //draw circle
    drawTriangle(attributes) {
        this.ctx.save();
        // this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.beginPath();
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        //move to left-bottom
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y") + attributes.getAttr("height"));
        //line to right bottom cornot 
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("width"), attributes.getAttr("y") + attributes.getAttr("height"));
        //top cornor
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("width") / 2, attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("x"), attributes.getAttr("y") + attributes.getAttr("height"));
        //  this.ctx.fill();
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.stroke();
        }
        this.ctx.restore();
    }
    getCtxValues(attributes) {
        //fillstyle is for internal use dont show it to users
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.shadowColor = attributes.getAttr("shadowColor");
        this.ctx.shadowBlur = attributes.getAttr("shadowBlur");
        this.ctx.shadowOffsetX = attributes.getAttr("shadowOffsetX");
        this.ctx.shadowOffsetY = attributes.getAttr("shadowOffsetY");
        this.ctx.lineWidth = attributes.getAttr("lineWidth");
        this.ctx.setLineDash([attributes.getAttr("lineDashSize"), attributes.getAttr("lineDashGap")]);
    } //getAttributes
    translateCanvas(attributes) {
        this.ctx.translate(attributes.getAttr("x") + (attributes.getAttr("width") / 2), attributes.getAttr("y") + (attributes.getAttr("height") / 2));
    }
    unTranslateCanvas(attributes) {
        this.ctx.translate(-(attributes.getAttr("x") + (attributes.getAttr("width") / 2)), -(attributes.getAttr("y") + (attributes.getAttr("height") / 2)));
    }
    rotateCanvas(attributes) {
        this.ctx.rotate((attributes.getAttr("currentRotateAngle")) * Math.PI / 180);
    }
    drawEllipse() {
        this.ctx.ellipse(100, 100, 50, 75, 45 * Math.PI / 180, 0, 2 * Math.PI);
    }
    drawLine(attributes) {
        this.ctx.save();
        this.getCtxValues(attributes);
        this.ctx.setLineDash([attributes.getAttr("lineDashSize"), attributes.getAttr("lineDashGap")]); //this is not in getCtxValues since its not that
        this.ctx.beginPath();
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("xEnd"), attributes.getAttr("yEnd"));
        this.ctx.stroke();
        this.ctx.restore();
    }
    drawHeart(attributes) {
        this.ctx.beginPath();
        const x = attributes.getAttr("x");
        const y = attributes.getAttr("y");
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(x + 0, y + 3, x + 5, y + 15, x + 25, y + 15);
        this.ctx.bezierCurveTo(x - 55, y + 15, 20, 62.5, 20, 62.5);
        this.ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        this.ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        this.ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        this.ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        this.ctx.fill();
    }
    //////////////////////////
    drawQuad(attributes) {
        // this.ctx.save();
        // this.ctx.globalAlpha = attributes.getAttr("opacity"); 
        // if(attributes.getAttr("filled") == true){
        //   this.ctx.fillStyle = attributes.getAttr("color");
        //   this.ctx.fillRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));  
        // }else{
        //   this.ctx.strokeStyle = attributes.getAttr("color");
        //   this.ctx.strokeRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));  
        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.moveTo(attributes.getAttr("x"), attributes.getAttr("y"));
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("rtx"), attributes.getAttr("y") + attributes.getAttr("rty")); //top line
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("rbx"), attributes.getAttr("y") + attributes.getAttr("rby")); //right line
        this.ctx.lineTo(attributes.getAttr("x") + attributes.getAttr("lbx"), attributes.getAttr("y") + attributes.getAttr("lby")); //bottom line
        this.ctx.lineTo(attributes.getAttr("x"), attributes.getAttr("y")); //left line
        this.ctx.fill();
    }
}
Metal.prototype.drawArc = function (attributes) {
    this.ctx.save();
    this.ctx.beginPath();
    this.getCtxValues(attributes);
    this.ctx.arc(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width") / 2, attributes.getAttr("openingAngle") * Math.PI / 180, attributes.getAttr("closingAngle") * Math.PI / 180);
    /**the color of the circle is the color of fill as well as stroke-- later we will have border color but for now dont confuse the issue */
    this.ctx.lineWidth = attributes.getAttr("lineWidth");
    if (attributes.getAttr("filled") == true) {
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.fill();
    }
    else {
        this.ctx.strokeStyle = attributes.getAttr("color");
        this.ctx.stroke();
    }
    this.ctx.restore();
}; //fn
Metal.prototype.drawRectangle = function (attributes) {
    this.ctx.save();
    this.getCtxValues(attributes);
    this.translateCanvas(attributes);
    this.ctx.rotate((Math.PI / 180) * attributes.getAttr("currentRotateAngle"));
    this.unTranslateCanvas(attributes);
    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)) {
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.lineCap = "round";
        if (attributes.getAttr("filled") == true) {
            this.ctx.fillStyle = attributes.getAttr("color");
            this.ctx.fillRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
        else {
            this.ctx.strokeStyle = attributes.getAttr("color");
            this.ctx.strokeRect(attributes.getAttr("x"), attributes.getAttr("y"), attributes.getAttr("width"), attributes.getAttr("height"));
        }
    } //outer if
    this.ctx.restore();
    //--------------------------------------------
}; //draw ends
Metal.prototype.drawText = function (attributes) {
    this.saveCtx();
    this.getCtxValues(attributes);
    this.translateCanvas(attributes);
    this.rotateCanvas(attributes);
    this.unTranslateCanvas(attributes);
    //--------------draw rect-- if visible
    if ((attributes.getAttr("transparent") === false)) {
        /////////////////////////////////////////////////////////////
        this.ctx.globalAlpha = attributes.getAttr("opacity");
        this.ctx.fillStyle = attributes.getAttr("color");
        this.ctx.font = `${attributes.getAttr("fontSize")}px ${attributes.getAttr("fontFamily")}`;
        this.ctx.fillText(attributes.getAttr("title"), attributes.getAttr("x"), attributes.getAttr("y"));
    }
    this.ctx.restore();
};

class Bilzaa2d {
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

module.exports = Bilzaa2d;
