var gulp = require('gulp'),
compass = require('gulp-compass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
livereload = require('gulp-livereload'),
plumber = require('gulp-plumber'),
path = require('path'),
ngAnnotate = require('gulp-ng-annotate'),
embedTemplates = require('gulp-angular-embed-templates'),
fs = require('fs'),
q = require('q'),
pkg = require('./package.json'),
sourcemaps = require('gulp-sourcemaps'),
jshint = require('gulp-jshint'),
browserSync = require('browser-sync').create(),
awspublish = require('gulp-awspublish'),
runSequence = require('run-sequence'),
cloudfront = require('gulp-cloudfront-invalidate-aws-publish'),
toMarkdown = require('gulp-to-markdown');

var notifyInfo = {
	title: 'Gulp',
	icon: path.join(__dirname, 'gulp.png')
};

var plumberErrorHandler = {
	errorHandler: notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: "Error: <%= error.message %>"
	})
};


var appName = pkg.name === 'starter' ? path.basename(__dirname) : pkg.name;



/*
* Update to use the files/directotries you want to watch and minify
*/

var stylesToDo = [
	'src/style/*.scss',
];

var stylesToDoVender = [
	'bower_components/fontawesome/css/font-awesome.css'
];

var htmlToDo = [
	'*.html',
	'src/html/*.html'
];

var app_scripts = [
	'src/script/*.js'
];

var vendor_scripts = [
	'bower_components/angular/angular.min.js',
	'bower_components/angular-cookies/angular-cookies.js',
	'bower_components/angular-resource/angular-resource.js',
	'bower_components/angular-sanitize/angular-sanitize.js',
	'bower_components/angular-route/angular-route.js',
	'bower_components/angular-loader/angular-loader.js',
	'bower_components/angular-animate/angular-animate.min.js',
	'bower_components/ckc-angularjs-utility/dist/utility.min.js',
	'bower_components/ngstorage/ngStorage.min.js',

	'bower_components/snap.svg/dist/snap.svg-min.js',
	'bower_components/jquery/dist/jquery.min.js',
	'bower_components/mfly-commands/src/mflyCommands.js'
];




/*
* Just a test function
*/

gulp.task('teststuff', function() {
	// pkg.name = path.basename(__dirname);
	// fs.writeFileSync("./package.json", JSON.stringify(pkg, null, "\t"));
	// pkg = require('./package.json');
	// console.log(pkg);
});





/* INSTALL
* Updates package.json name
* Creates index.html
* Creates an nginx.conf file if needed
* Creates bower.json
*/

gulp.task('install', ['package', 'index', 'bower']);





/* PACKAGE
* Updates package.json name
*/

gulp.task('package', function() {
	if(pkg.name === 'starter'){
		pkg.name = path.basename(__dirname);
		fs.writeFileSync("./package.json", JSON.stringify(pkg, null, "\t"));
		pkg = require('./package.json');
	}
});





/* INDEX
* Creates index.html
*/

gulp.task('index', function() {
	var d = q.defer();

	var html = '<!doctype html>' + "\r" +
	'<html ng-app="app">' + "\r" +
	'<head>' + "\r" +
	"\t" + '<meta charset="utf-8">' + "\r" +
	"\t" + '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + "\r" +
	"\t" + '<meta name="description" content="">' + "\r" +
	"\t" + '<meta name="viewport" content="width=device-width">' + "\r" +
	"\t" + '<link rel="icon" type="image/png" href="./favicon.png">' + "\r" +
	"\t" + '<link rel="stylesheet" href="/demo/style.css">' + "\r" +
	"\t" + '<link rel="stylesheet" href="/dist/css/' + appName + '_vendor.min.css">' + "\r" +
	"\t" + '<link rel="stylesheet" href="/dist/css/' + appName + '.min.css">' + "\r" +
	"\t" + '<base href="/" />' + "\r" +
	'</head>' + "\r" +
	'<body ng-controller="AppCtlr as app">' + "\r" +
	"\t" + '<navigation></navigation>' + "\r" +
	"\t" + '<div ng-view=""></div>' + "\r" +
	"\t" + '<script src="/dist/js/' + appName + '_vendor.min.js"></script>' + "\r" +
	"\t" + '<script src="/demo/app.js"></script>' + "\r" +
	"\t" + '<script src="/demo/demo-compile.js"></script>' + "\r" +
	"\t" + '<script src="/demo/demo-date-string.js"></script>' + "\r" +
	"\t" + '<script src="/demo/demo-input.js"></script>' + "\r" +
	"\t" + '<script src="/demo/demo-json-text.js"></script>' + "\r" +
	"\t" + '<script src="/demo/do-cks.js"></script>' + "\r" +
	"\t" + '<script src="/demo/demo-toggle-parent.js"></script>' + "\r" +
	"\t" + '<script src="/dist/js/' + appName + '.min.js"></script>' + "\r" +
	'</body>' + "\r" +
	'</html>';

	fs.writeFile('./index.html', html, function() {
		d.resolve(true);
	});

	return d.promise;
});





/* NGINX
* Creates an nginx.conf file if needed
*/

gulp.task('nginx', function() {
	var d = q.defer();

	var filename = appName + '.loc.conf';
	var base = path.dirname(fs.realpathSync(__filename)) + '/';
	var file = 'server { listen ' + appName + '.loc; server_name ' + appName + '.loc; root ' + base + '; index index.html; error_page 404 index.html;}';
	fs.writeFile('./' + filename, file, function() {
		d.resolve(true);
	});

	return d.promise;
});





/* BOWER
* Creates bower.json
*/

gulp.task('bower', function() {
	var d = q.defer();
	var bowerJson = {
		_comment: 'THIS FILE IS AUTOMATICALLY GENERATED.  DO NOT EDIT.',
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		ignore: [
			".DS_Store",
			".git",
			".gitignore",
			"node_modules",
			"bower_components",
			".sass-cache",
			"npm-debug.log"
		],
		dependencies: pkg.bower
	};

	bowerJson = JSON.stringify(bowerJson, null, '\t')

	fs.writeFile('./bower.json', bowerJson, function() {
		d.resolve(true);
	});

	return d.promise;
});





/* BROWSER SYNC
* Starts bower server
*/

gulp.task('browser-sync', function() {
	var url = require("url");
	var defaultFile = "index.html"

	browserSync.init({
		server: {
			baseDir: "./",
			middleware: function(req, res, next) {
				var fileName = url.parse(req.url);
				fileName = fileName.href.split(fileName.search).join("");
				var fileExists = fs.existsSync(__dirname + fileName);
				if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
					req.url = "/" + defaultFile;
				}
				return next();
			}
		}
	});
});






/* STYLES
* Minifies/compiles sass
*/

gulp.task('styles', function() {
	return gulp.src(stylesToDo)
	.pipe(plumber(plumberErrorHandler))
	.pipe(gulp.dest('dist/css/build/sass'))
	.pipe(compass({
		css: 'dist/css/build/css',
		sass: 'dist/css/build/sass',
		image: 'app/css/images'
	}))
	.pipe(autoprefixer('last 2 version', 'Safari', 'ie', 'opera', 'ios', 'android', 'chrome', 'firefox'))
	.pipe(concat(appName + '.css'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'));
});





/* STYLES VENDOR
* Minifies/compiles sass from bower components
*/

gulp.task('styles_vendor', function() {
	return gulp.src(stylesToDoVender)
	.pipe(plumber(plumberErrorHandler))
	.pipe(concat(appName + '_vendor.css'))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'));
});


var moveFonts = [
	'bower_components/font-awesome/fonts/*.*'
];


gulp.task('move_fonts', function(done) {
	return gulp.src(moveFonts).pipe(gulp.dest('dist/fonts/'));
});







/* SCRIPTS VENDOR
* Minifies bower components js files
*/


gulp.task('vendor_scripts', function() {
	return gulp.src(vendor_scripts)
	.pipe(plumber(plumberErrorHandler))
	.pipe(concat(appName + '_vendor.min.js'))
	.pipe(gulp.dest('dist/js'))
});






/* SCRIPTS
* Minifies js files
*/

gulp.task('app_scripts', function() {
	return gulp.src(app_scripts)
	.pipe(plumber(plumberErrorHandler))
	.pipe(sourcemaps.init())
	.pipe(ngAnnotate({
		// true helps add where @ngInject is not used. It infers.
		// Doesn't work with resolve, so we must be explicit there
		add: true
	}))
	.pipe(embedTemplates())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat(appName + '.min.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dist/js'))
});






var moveToLib = [
	// 'bower_components/font-awesome/css/font-awesome.min.css',
	// 'bower_components/font-awesome/css/font-awesome.css.map',
	// 'bower_components/font-awesome/fonts/*.*'
];


gulp.task('move_to_lib', function(done) {
	return gulp.src(moveToLib, {base: './'}).pipe(gulp.dest('lib'));
});

var moveSourceMaps = [
	'bower_components/angular/angular.min.js.map'
];


gulp.task('move_source_maps', function(done) {
	return gulp.src(moveSourceMaps).pipe(gulp.dest('dist/js'));
});









var awsConfObject = require('./aws-config.json');

var localConfig = {
	buildSrc: './build/**/*',
	getAwsConf: function (environment) {
		// var conf = require('../../config/aws');

		if (!awsConfObject[environment]) {
			throw 'No aws conf for env: ' + environment;
		}
		if (!awsConfObject[environment + 'Headers']) {
			throw 'No aws headers for env: ' + environment;
		}
		return { keys: awsConfObject[environment], headers: awsConfObject[environment + 'Headers'], distribution: awsConfObject[environment + 'Distribution'] };
	}
};



var buildFiles = [
	'lib/bower_components/font-awesome/css/font-awesome.min.css',
	'lib/bower_components/font-awesome/css/font-awesome.css.map',
	'lib/bower_components/font-awesome/fonts/*.*',
	'dist/css/'+ appName +'_vendor.min.css',
	'dist/css/'+ appName +'.min.css',
	'dist/js/'+ appName +'_vendor.min.js',
	'dist/js/'+ appName +'.min.js',
	'dist/js/'+ appName +'.min.js.map',
	'dist/js/utility.min.js.map',
	'favicon.png',
	'app.js',
	'demo.html',
	'index.html'
];

gulp.task('build', function(done) {
	return gulp.src(buildFiles, {base: './'}).pipe(gulp.dest('build'));
});

gulp.task('publish', function(done) {
	var awsConf = localConfig.getAwsConf('production');
	var publisher = awspublish.create(awsConf.keys);
	var cfSettings = {
		distribution: awsConf.distribution,
		accessKeyId: awsConf.keys.accessKeyId,
		secretAccessKey: awsConf.keys.secretAccessKey,
		//wait: true,
		indexRootPaths: true
	};

	runSequence('build', function() {
		gulp.src(localConfig.buildSrc)
		//.pipe(awspublish.gzip({ ext: '' }))
		.pipe(publisher.publish(awsConf.headers))
		.pipe(cloudfront(cfSettings))
		.pipe(publisher.cache())
		.pipe(publisher.sync())
		.pipe(awspublish.reporter());
		done();
	});
});





gulp.task('readme', function() {
	return gulp.src('./demo.html')
	.pipe(toMarkdown())
	.pipe(gulp.dest('./dist'));
});





/* LIVE
* Watches for file changes
*/

gulp.task('live', function() {
	livereload.listen();
	gulp.watch(stylesToDo, ['styles']);
	gulp.watch(stylesToDoVender, ['styles_vendor']);
	gulp.watch(moveFonts, ['move_fonts']);
	gulp.watch(vendor_scripts, ['vendor_scripts']);
	gulp.watch(app_scripts, ['app_scripts']);
	gulp.watch(htmlToDo, ['app_scripts']);
	gulp.watch(moveToLib, ['move_to_lib']);
	gulp.watch(moveSourceMaps, ['move_source_maps']);
	gulp.watch("dist/**").on('change', browserSync.reload);
});

gulp.task('default', [
	'move_to_lib',
	'move_source_maps',
	'move_fonts',
	'styles',
	'styles_vendor',
	'vendor_scripts',
	'app_scripts',
	'browser-sync',
	'live'
], function(){});
