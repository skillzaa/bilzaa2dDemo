import { rollup } from "rollup";
//import { uglify } from "rollup-plugin-uglify";
//import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/Bilzaa2d.js',
 //   plugins: [terser()],
    output: {
      file: 'dist/Bilzaa2dCjs.js',
      format: 'cjs'
    }
  };