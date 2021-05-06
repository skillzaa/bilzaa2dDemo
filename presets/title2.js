export default function title2 (shapes){
////////////////////////////////////////////////////
const rect = shapes.addText("txt");

rect.setAttr("x",0);
rect.setAttr("y",-20);
rect.setAttr("fontSize",80);
rect.setAttr("title","A 2D Javascript Animation library.");
rect.setAttr("color","red");
rect.moveDiagonal(5,7,1,100,1,625);
// rect.widen(2,4,0,150);
// rect.heighten(1,2,0,550);
////////////////////////////////////////////////////

return shapes;
}