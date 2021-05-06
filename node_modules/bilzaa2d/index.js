import Bilzaa2d from "./dist/Bilzaa2d.js";
const bilzaa2d =  new Bilzaa2d();
const arc = bilzaa2d.shapes.addArc("arc01");
const txt = bilzaa2d.shapes.addText("txt");
txt.setAttr("color","red");

arc.setAttr("x",300);
arc.setAttr("y",300);
arc.widen(1,5,10,100);
arc.moveDiagonal(5,10,300,600,300,600);
bilzaa2d.play();
console.log(bilzaa2d);