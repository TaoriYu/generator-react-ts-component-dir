"use strict";
const Generator = require("yeoman-generator");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this._createComponentNameArgument();
    this._createPathArgument();

    this._createStylesOption();
    this._createLessOption();
    this._createSassOption();

    if (this.options.less === true && this.options.sass === true) {
      this.log("Wrong flags combination! Choose either less or sass.");
    }
  }

  async prompting() {
    this.log(yosay(`Let's generate react components!`));
  }

  writing() {
    const capitalizeComponentName = this._capitalize(
      this.options.componentName
    );
    const dir = mkdirp.sync(`${this.options.path}/${capitalizeComponentName}`);
    let stylesExt = "css";

    if (this.options.less) stylesExt = "less";
    if (this.options.sass) stylesExt = "sass";

    const styleFilename = `${this.options.componentName.toLowerCase()}.${stylesExt}`;

    this.fs.copyTpl(
      this.templatePath("Component.ejs"),
      this.destinationPath(dir, `${capitalizeComponentName}.tsx`),
      {
        componentName: capitalizeComponentName,
        stylesName: styleFilename,
        withStyles: this.options.styles
      }
    );

    this.fs.copyTpl(
      this.templatePath("reexport.ejs"),
      this.destinationPath(dir, "index.ts"),
      { componentName: capitalizeComponentName }
    );

    if (this.options.styles === true) {
      this.fs.copyTpl(
        this.templatePath("styles.ejs"),
        this.destinationPath(dir, styleFilename)
      );
    }
  }

  _capitalize(str) {
    return str[0].toUpperCase().concat(str.slice(1));
  }

  _createComponentNameArgument() {
    return this.argument("componentName", {
      desc: "name of the component",
      type: String,
      optional: true,
      default: "Component"
    });
  }

  _createPathArgument() {
    return this.argument("path", {
      desc: "path where to generate component",
      type: String,
      optional: true,
      default: "./"
    });
  }

  _createStylesOption() {
    return this.option("styles", {
      desc: "styles will be generated if this option is added",
      alias: "s",
      type: Boolean,
      default: true
    });
  }

  _createLessOption() {
    return this.option("less", {
      desc: "generate less styles files if set",
      alias: "le",
      type: Boolean,
      default: false
    });
  }

  _createSassOption() {
    return this.option("sass", {
      desc: "generate sass styles files if set",
      alias: "sa",
      type: Boolean,
      default: false
    });
  }
};
