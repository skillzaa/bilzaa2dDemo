export default class Metal {
    ctx: object;
    canvas: object;
    constructor(canvasName?: string);
    load(canvasName?: string): void;
    clear(): void;
    clearCanvas(fillStyle?: string): void;
    drawRectangleBorder(attributes: any): void;
    saveCtx(): void;
    restoreCtx(): void;
    drawCircle(attributes: any): void;
    drawTriangle(attributes: any): void;
    getCtxValues(attributes: any): void;
    translateCanvas(attributes: any): void;
    unTranslateCanvas(attributes: any): void;
    rotateCanvas(attributes: any): void;
    drawEllipse(): void;
    drawLine(attributes: any): void;
    drawHeart(attributes: any): void;
    drawQuad(attributes: any): void;
}
