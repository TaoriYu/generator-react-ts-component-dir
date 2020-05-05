'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // TODO: descriptions
    this.argument('component_name', { type: String, optional: true, default: 'Component' });
    this.argument('path', { optional: true, default: './' });

    // this.option('styles', {
    //   desc: 'styles will not be generated if this option is added',
    //   alias: 'nos',
    //   type: Boolean,
    //   default: true
    // });
  }

  async prompting() {
    this.log(yosay(`Welcome to the react component generator!`));

    const prompts = [
      // {
      //   type: 'input',
      //   name: 'component_name',
      //   message: 'What is the name of this component?',
      //   default: 'Component'
      // }
    ];

    this.props = await  this.prompt(prompts);
    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    // });
  }

  writing() {
    const dir = mkdirp.sync(`${this.options['path']}/${this._capitalize(this.options['component_name'])}`);

    this.fs.copyTpl(
      this.templatePath('Component.tsx'),
      this.destinationPath(dir, `${this._capitalize(this.options['component_name'])}.tsx`),
      {
        component_name: this._capitalize(this.options['component_name']),
        styles_name: this.options['component_name'].toLowerCase()
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.ts'),
      this.destinationPath(dir, 'index.ts'),
      { component_name: this._capitalize(this.options['component_name']) }
    );

    this.fs.copyTpl(
      this.templatePath('component.css'),
      this.destinationPath(dir, `${this.options['component_name'].toLowerCase()}.css`)
    );
  }

  _capitalize(str) {
    return str[0].toUpperCase().concat(str.slice(1));
  }

  // install() {
  //   this.installDependencies();
  // }
};
