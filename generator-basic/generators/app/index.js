const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    // have yeoman greet user
    this.log(yosay(`let's make your next ${chalk.yellow('dope project')}`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name your project.',
        // defaults to project's folder name if input is skipped
        default: this.appname,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your project.',
        default: 'This is my cool new project.',
      },
      {
        type: 'confirm',
        name: 'react',
        message: 'Will you be using react?',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
    // Generate our package.json. Make sure to also include the required dependencies for styles
    const defaultSettings = this.fs.readJSON(this.templatePath('package.json'));
    const packageSettings = {
      name: this.props.name,
      author: defaultSettings.author,
      version: '0.0.0',
      description: this.props.description,
      main: 'src/index.js',
      scripts: defaultSettings.scripts,
      repository: '',
      keywords: [],
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies,
      license: defaultSettings.license,
    };

    if (this.props.react) {
      packageSettings.dependencies = Object.assign(
        packageSettings.dependencies,
        {
          'prop-types': '*',
          react: '*',
          'react-dom': '*',
        }
      );

      packageSettings.devDependencies = Object.assign(
        packageSettings.devDependencies,
        {
          'babel-preset-react': '*',
          'eslint-plugin-jsx-a11y': '*',
          'eslint-plugin-react': '*',
        }
      );
    }

    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.props.name,
        description: this.props.description,
      }
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year: new Date().getFullYear(),
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name: this.props.name,
      }
    );

    // these templates are not modified by any user input
    const otherTemplates = [
      'webpack.config.js',
      '.babelrc',
      '.gitignore',
      '.eslintrc.js',
      'src/styles/main.scss',
    ];
    otherTemplates.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template)
      );
    });

    if (this.props.react) {
      this.fs.copyTpl(
        this.templatePath('src/react-templates/index.js'),
        this.destinationPath('src/index.js')
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('src/index.js'),
        this.destinationPath('src/index.js')
      );
    }
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
    });
  }
};
