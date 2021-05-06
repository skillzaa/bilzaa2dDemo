export default function title (shapes){
////////////////////////////////////////////////////
const rect = shapes.addText("txt");

rect.setAttr("x",150);
rect.setAttr("y",300);
rect.setAttr("fontSize",0);
rect.setAttr("title","Bilzaa2d.js");
rect.setAttr("color","yellow");

rect.widen(2,4,0,150);
// rect.heighten(1,2,0,550);
////////////////////////////////////////////////////

return shapes;
}