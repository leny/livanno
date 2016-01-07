/* LivAnnò
 *
 * ~/server.js - main entry point & express setup
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import zouti from "zouti";
import marked from "marked";

import log from "./middlewares/log";

let app,
    sLogContext = "LivAnnò:server",
    iPort = 12345;

zouti.log( "launching server…", sLogContext );
zouti.bench( "configure server" );

app = express();

app.use( responseTime() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    "extended": true
} ) );
app.use( express.static( `${ __dirname }/../static` ) );
app.use( log );
app.use( ( oRequest, oResponse, fNext ) => {
    oResponse.locals.marked = marked;
    fNext();
} );

app.set( "views", `${ __dirname }/views` );
app.set( "view engine", "jade" );
app.locals.pretty = false;
app.set( "view cache", false );

import commentListController from "./controllers/comments/list";
import commentAddController from "./controllers/comments/add";
app.route( "/" )
    .get( commentListController )
    .post( commentAddController );

zouti.bench( "configure server" );

app.listen( iPort );
zouti.log( "server launched.", sLogContext );
zouti.log( `server is listening on port ${ iPort }`, sLogContext );
