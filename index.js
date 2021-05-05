const log = console.log;
import Bilzaa2d from "./Bilzaa2d.js";

// import Bilzaa2d from "./node_modules/bilzaa2d/src/bilzaa2d.js";
const bilzaa2d = new Bilzaa2d();

const wao = bilzaa2d.shapes.addArc("waooooo");

bilzaa2d.play();
log(bilzaa2d);