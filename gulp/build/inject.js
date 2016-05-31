var gulp = require('gulp'),
    config = require('../../gulp.config'),
    del = require('del'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files');

gulp.task('clean:inject', function() {
    return del(config.build + '*.html');
});

gulp.task('getRequirements', function() {
    
})

gulp.task('inject', ['clean:inject', 'scripts', 'app-config', 'bower-fonts', 'styles'], function() {
    var target = gulp.src(config.index),
        bowerFiles = gulp.src([].concat(mainBowerFiles({filter: ['!**/algoliasearch/dist/algoliasearch.js', '**/*.js', '**/*.css']}), '**/algoliasearch/dist/algoliasearch.angular.js'), {read: false}),
        appFiles = gulp.src([].concat(config.appFiles, config.components.styles.css), {read: false});

    return target
        .pipe(inject(bowerFiles, {name: 'bower'}))
        .pipe(inject(appFiles))
        .pipe(gulp.dest(config.build));
});
