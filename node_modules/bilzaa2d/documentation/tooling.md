# Following is my Tooling Strategy

- 1--each module inside typescript (src folder actually) gets bundled to intermediateBundle folder as one file per bundle. one module one file.
- 2--this intermediateBundles are then converted to require for testing so not much files.
- 3--the same intermediateBundles are then once again bundled into dist with just one object exported - one file for the whole project.
- 4--i will try to send out npm-packages as and when they r really ready.