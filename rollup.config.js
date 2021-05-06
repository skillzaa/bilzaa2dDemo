import { rollup } from "rollup";
//import { uglify } from "rollup-plugin-uglify";
//import { terser } from 'rollup-plugin-terser';

export default {
    input: './index.js',
 //   plugins: [terser()],
    output: {
      file: 'dist/',
      format: 'es'
    }
  };