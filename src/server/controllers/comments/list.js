/* LivAnnò
 *
 * ~/controllers/comments/list.js - list comments controller
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

export default function( oRequest, oResponse ) { // eslint-disable-line func-style
    let aComments = require( "../../../data/comments.json" ); // eslint-disable-line global-require

    oResponse.render( "list.jade", {
        "comments": aComments
    } );
}
