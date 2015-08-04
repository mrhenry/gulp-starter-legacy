//
// Editable configs
//
var clientName    = 'hello-world';
var publicAssets  = './public/assets'; // Change if your build location is different


// -----------------------------------------------------------------------------
// Normally you don't have to edit below
// -----------------------------------------------------------------------------

var sourceFiles   = './gulp/assets';
var exec          = require('child_process').execSync;

module.exports = {
  publicAssets: publicAssets,
  browserSync: {
    proxy: 'client-' + clientName + '.dev',
    host: (function () {
      return exec('ifconfig | grep broadcast | cut -d: -f2 | cut -d" " -f2').toString().replace(/\s*/gi, '');
    }()),
    files: ['./app/views/**', './public/assets/.', './wp-content/themes/**'],
    xip: true,
    open: false,
    port: 3000
  },
  sass: {
    src: [
      sourceFiles + '/stylesheets/*.scss',
      sourceFiles + '/stylesheets/**/*.scss'
    ],
    dest: publicAssets + '/stylesheets',
    settings: {
      imagePath: '/assets/images', // Used by the image-url helper
//      includePaths: [
//        sourceFiles + '/vendor/'
//      ],
      indentedSyntax: false // Enable .sass syntax!
    }
  },
  images: {
    src: sourceFiles + '/images/**',
    dest: publicAssets + '/images'
  },
  fonts: {
    src: sourceFiles + '/fonts/**',
    dest: publicAssets + '/fonts'
  },
  iconFont: {
    name: clientName,
    src: sourceFiles + '/icons/*.svg',
    dest: publicAssets + '/fonts',
    sassDest: sourceFiles + '/stylesheets/base',
    template: './gulp/tasks/iconFont/template.scss',
    sassOutputName: '_icons.scss',
    fontPath: '../fonts',
    className: 'icon',
    options: {
      fontName: clientName + '-icons',
      appendCodepoints: true,
      normalize: false
    }
  }
};
