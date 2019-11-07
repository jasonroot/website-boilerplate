## Getting Started

### Dependencies
Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into `src`.
2. Run `npm install` to install required files.
3. When it's done installing, run `gulp` to compile to view current build.

## File Structure

Add your files to the appropriate `src` subdirectories. Gulp will process and and compile them into `build`.

- Content in subdirectories `js`, `pages`, `templates`, and `scss` folder will be concatenated and copied into the `build` directory.
- Files in the `img` directory will be compressed and copied into the `build/img` directory.

## Working with the Source Files

### Sass

Sass files are located in `src` > `sass`. Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you if required by the last two versions of a browser.


### Templates

The `templates` directory in `src` contains the `_layout.html` and `_footer.html` templates. These are automatically added to the beginning and end of each page. The page templates are located in the `pages` directory. 


## Options and Settings

### Updating Project Details
Open up `package.json` to change the name, version, URL and other data about the project.

### Changing the Directory Structure
Inside `gulpfile.js` you'll see a variable named `paths`. Adjust the paths to suit your workflow.




