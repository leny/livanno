/* LivAnnò
 *
 * ~/controllers/comments/add.js - add comment controller
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import fs from "fs";
import zouti from "zouti";

let sCommentsFilePath = `${ __dirname }/../../../data/comments.json`;

export default function( oRequest, oResponse ) { // eslint-disable-line func-style
    let sAuthor = ( oRequest.body.author || "" ).trim(),
        sContent = ( oRequest.body.content || "" ).trim(),
        oComment = {
            "id": ( new Date() ).getTime(),
            "author": sAuthor,
            "content": sContent
        },
        aComments = JSON.parse( fs.readFileSync( sCommentsFilePath, "utf-8" ) );

    if ( !sAuthor || !sContent ) {
        if ( oRequest.headers[ "x-requested-with" ] === "XMLHttpRequest" ) {
            return oResponse.json( {
                "error": "submission",
                "post": oComment
            } );
        }

        return oResponse.render( "list.jade", {
            "comments": aComments,
            "error": "submission",
            "post": oComment
        } );
    }

    aComments.push( oComment );

    fs.writeFile( sCommentsFilePath, JSON.stringify( aComments, null, 2 ), "utf-8", ( oError ) => {
        if ( oError ) {
            zouti.error( oError, "LivAnnò:post:add" );
            aComments.pop();
            if ( oRequest.headers[ "x-requested-with" ] === "XMLHttpRequest" ) {
                return oResponse.json( {
                    "error": "save",
                    "post": oComment
                } );
            }

            return oResponse.render( "list.jade", {
                "comments": aComments,
                "error": "save",
                "post": oComment
            } );
        }

        if ( oRequest.headers[ "x-requested-with" ] === "XMLHttpRequest" ) {
            return oResponse.json( {
                "comments": aComments,
                "error": false
            } );
        }

        oResponse.render( "list.jade", {
            "comments": aComments
        } );
    } );
}
