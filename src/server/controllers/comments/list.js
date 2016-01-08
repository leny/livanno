/* LivAnnò
 *
 * ~/controllers/comments/list.js - list comments controller
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import fs from "fs";
import React from "react";
import ReactDomServer from "react-dom/server";

import LivAnno from "../../components/livanno"

let sCommentsFilePath = `${ __dirname }/../../../data/comments.json`;

export default function( oRequest, oResponse ) { // eslint-disable-line func-style
    let aComments = JSON.parse( fs.readFileSync( sCommentsFilePath, "utf-8" ) ),
        sPreRenderedComponent;

    sPreRenderedComponent = ReactDomServer.renderToString( <LivAnno comments={ aComments } /> );

    oResponse.render( "list.jade", {
        "components": {
            "render": {
                "livanno": sPreRenderedComponent
            },
            "data": {
                "livanno": aComments
            }
        }
    } );
}
