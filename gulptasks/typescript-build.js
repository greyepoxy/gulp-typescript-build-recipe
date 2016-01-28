var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var path = require('path');

var tsBuildTaskName = 'build';
var tsWatchBuildTaskname = 'autoBuild';
var compileOutDir = './dist';
// the tsconfig file is in the root directory because vscode uses this file to inform its intellisense. The excludes in the file will not in fact make any difference to the gulp build script but will make the processing time for vscode significantly better.
var tsConfigPath = 'tsconfig.json';
var tsSourceBase = 'src';
var tsSource = path.join(tsSourceBase, '/**/*.ts');
var tsProject = tsc.createProject(tsConfigPath, { declaration: true, outDir: compileOutDir });

gulp.task(tsBuildTaskName, function() {
	var tsResult = gulp.src([tsSource], { base: tsSourceBase })
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(compileOutDir)),
		tsResult.dts.pipe(gulp.dest(compileOutDir))
	]);
});

gulp.task(tsWatchBuildTaskname, [tsBuildTaskName], function() {
	gulp.watch(tsSource, [tsBuildTaskName]);
});