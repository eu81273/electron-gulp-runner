var gulp = require('gulp');
var electronPackager = require('electron-packager');
var projectPackage = require('./package.json');

var platform = process.platform;
var packagePaths = undefined;
var defaultOptions = {
	'dir': '.',
	'arch': 'x64',
	'name': projectPackage.name,
	'platform': platform,
	'version': '0.36.10',
	'asar': true,
	'out': 'dist',
	'ignore': 'dist',
	'overwrite': true,
	'app-version': projectPackage.version
};
var variations = {
	darwin: {
		'asar': false,
		'icon': 'app/icon/icon.icns',
		'app-category-type': 'public.app-category.developer-tools'
	},
	linux: {},
	win32: {
		'arch': 'all',
		'icon': 'app/icon/icon.ico'
	}
};

gulp.task('build:packaging', function (done) {
	electronPackager(Object.assign(defaultOptions, variations[platform]), function (err, result) {
		packagePaths = result;
		done(err);
	});
});

gulp.task('build:darwin', ['build:packaging'], function (done) {
	done();
});

gulp.task('build:linux', ['build:packaging'], function () {
	return gulp.src('app/icon/icon.png')
		.pipe(gulp.dest(packagePaths + '/resources'));
});

gulp.task('build:win32', ['build:packaging'], function (done) {
	done();
});

gulp.task('build', ['build:' + platform]);
