var gulp = require('gulp');
var tsc = require('gulp-typescript');
var merge = require('merge2');
var path = require('path');
var config = require('../gulpconfig.json')["typescript-build"];

var tsSrcDir = "./src";
var tsConfigPath = path.join(tsSrcDir, "tsconfig.json");
var tsSource = path.join(tsSrcDir, "/**/*.ts");
var tsProject = tsc.createProject(tsConfigPath, { declaration: true, outDir: config.outDir });

var outDir = config.outDir;
gulp.task(config.taskName, function() {
	var tsResult = gulp.src(tsSource)
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js.pipe(gulp.dest(outDir)),
		tsResult.dts.pipe(gulp.dest(outDir))
	]);
});

gulp.task(config.watchTaskName, [config.taskName], function() {
	gulp.watch(tsSource, [config.taskName]);
});