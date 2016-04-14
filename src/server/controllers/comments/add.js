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
            "id": Date.now(),
            "author": sAuthor,
            "content": sContent
        },
        aComments = JSON.parse( fs.readFileSync( sCommentsFilePath, "utf-8" ) );

    if ( !sAuthor || !sContent ) {
        return oResponse.json( {
            "error": "submission",
            "post": oComment
        } );
    }

    aComments.push( oComment );

    fs.writeFile( sCommentsFilePath, JSON.stringify( aComments, null, 2 ), "utf-8", ( oError ) => {
        if ( oError ) {
            zouti.error( oError, "LivAnnò:post:add" );
            aComments.pop();
            return oResponse.json( {
                "error": "save",
                "post": oComment
            } );
        }

        return oResponse.json( {
            "comments": aComments,
            "error": false
        } );
    } );
}
