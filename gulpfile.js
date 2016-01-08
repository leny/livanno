/* LivAnnò
 *
 * /gulpfile.js - tasks
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

/* eslint-disable */

"use strict";

var gulp = require( "gulp" ),
    gbabel = require( "gulp-babel" ),
    gstylus = require( "gulp-stylus" ),
    gcsso = require( "gulp-csso" ),
    koutoSwiss = require( "kouto-swiss" ),
    browserify = require( "browserify" ),
    babelify = require( "babelify" ),
    source = require( "vinyl-source-stream" );

// server tasks

gulp.task( "server-babel", function() {
    gulp.src( "./src/server/**/*.js" )
        .pipe( gbabel( {
            "presets": [ "es2015", "react" ]
        } ) )
        .pipe( gulp.dest( "./bin" ) );
} );

gulp.task( "server-components", function() {
    gulp.src( "./src/client/components/*.js" )
        .pipe( gbabel( {
            "presets": [ "es2015", "react" ]
        } ) )
        .pipe( gulp.dest( "./bin/components" ) );
} );

gulp.task( "server-jade", function() {
    gulp.src( "./src/server/views/*.jade" )
        .pipe( gulp.dest( "./bin/views" ) );
} );

gulp.task( "server", [ "server-babel", "server-jade", "server-components" ] );

// styles tasks

gulp.task( "styles", function() {
    gulp.src( "./static/stylus/*.styl" )
        .pipe( gstylus( {
            "use": koutoSwiss()
        } ) )
        .pipe( gcsso() )
        .pipe( gulp.dest( "./static/css" ) );
} );

// react tasks

gulp.task( "react", function() {
    return browserify( "./src/client/main.js" )
        .transform( babelify, {
            "presets": [ "es2015", "react" ]
        } )
        .bundle()
        .pipe( source( "main.js" ) )
        .pipe( gulp.dest( "./static/js" ) );
} )

// default task

gulp.task( "default", [ "server", "styles", "react" ] );
