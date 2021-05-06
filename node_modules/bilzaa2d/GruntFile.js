module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            files: {
              cwd: './src',  // set working folder / root to copy
              src: '**/*',           // copy all files and subfolders
              dest: 'test/',    // destination folder
              expand: true           // required when using cwd
            }},
//////////////////////////////////////////////////////////////      
concat: {
    arrayOfObjects: {
        src: ['typescript/arrayOfObjects/*.ts'],
        dest: './src/arrayOfObjects.ts',
    },
    baseGenerator: {
        src: ['typescript/baseGenerator/*.ts'],
        dest: './src/baseGenerator.ts',
    },
    baseShape: {
        src: ['typescript/baseShape/*.ts'],
        dest: './src/baseShape.ts',
    },
    core: {
        src: ['typescript/core/bilzaa2d.ts'],
        dest: './src/bilzaa2d.ts',
    },
    generators: {
        src: ['typescript/generators/*.ts'],
        dest: './src/generators.ts',
    },
    metal: {
      src: ['typescript/metal/*.ts'],
      dest: 'src/metal.ts',
    },
    playHead: {
      src: ['typescript/playHead/*.ts'],
      dest: 'src/playHead.ts',
    },
    shapes: {
      src: ['typescript/shapes/*.ts'],
      dest: 'src/shapes.ts',
    },
    validator: {
      src: ['typescript/validator/*.ts'],
      dest: 'src/validator.ts',
    },
  }
//////////////////////////////////////////////////////////////      
        });
//////////////////////////////////////////////////////////////      
grunt.loadNpmTasks('grunt-contrib-copy'); 
grunt.loadNpmTasks('grunt-contrib-concat');  
grunt.registerTask('default', ['copy']);
  
//////////////////////////////////////////////////////////////    
}