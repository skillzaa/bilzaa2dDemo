//import { terser } from "rollup-plugin-terser";
export default {
	input: 'src/ArrayOfObjects.js',
//	plugins: [terser()],
	output: {
	  file: 'dist/ArrayOfObjects.js',
	  format: 'cjs',
	}
  };