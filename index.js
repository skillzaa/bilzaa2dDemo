import Bilzaa2d from "./node_modules/bilzaa2d/dist/Bilzaa2d.js";

import fallingRectangle from "./presets/fallingRect.js";
import title from "./presets/title.js";
import title2 from "./presets/title2.js";

const bilzaa2d =  new Bilzaa2d();
bilzaa2d.shapes = fallingRectangle(bilzaa2d.shapes);
bilzaa2d.shapes = title(bilzaa2d.shapes);
bilzaa2d.shapes = title2(bilzaa2d.shapes);

bilzaa2d.play();
//console.log(bilzaa2d);