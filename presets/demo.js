export default function fallingRectangle (shapes){
////////////////////////////////////////////////////
const arc = shapes.addArc("arc01");
const txt = shapes.addText("txt");
txt.setAttr("color","red");

arc.setAttr("x",300);
arc.setAttr("y",300);
arc.widen(1,5,10,100);
arc.moveDiagonal(5,10,300,600,300,600);
////////////////////////////////////////////////////

return shapes;
}