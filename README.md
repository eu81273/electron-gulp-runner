## Electron Gulp Runner
[Electron](http://electron.atom.io/) based [Gulp](http://gulpjs.com/) task runner.

This application is aiming that running a gulpfile without installing node.js or gulp.js( and its plugins).
No need to install node.js and gulp.js because gulpfile.js is launched by Electron itself instead of node.js.

![Preview](https://cdn.rawgit.com/eu81273/electron-gulp-runner/master/preview.png)

### Install
```bash
# Clone this repository
$ git clone https://github.com/eu81273/electron-gulp-runner

# Go into the repository
$ cd electron-gulp-runner

# Install the dependencies and run
$ npm install && npm start
```

### Packaging
```bash
# Install Gulp plugins that you want to build-in.
$ npm install gulp-plugins-you-want-to-built-in

# Packaging electron application for current OS
$ npm run build
```

## License

The MIT License.

Copyright ⓒ 2016 AHN JAE-HA.

See [LICENSE](https://github.com/eu81273/electron-gulp-runner/blob/master/LICENSE)
