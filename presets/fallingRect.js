export default function fallingRectangle (shapes){
////////////////////////////////////////////////////
const rect = shapes.addRectangle("rect");

rect.setAttr("x",0);
rect.setAttr("y",0);
rect.setAttr("width",0);
rect.setAttr("height",0);

rect.widen(1,2,0,1300);
rect.heighten(1,2,0,550);
////////////////////////////////////////////////////

return shapes;
}