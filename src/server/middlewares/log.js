/* LivAnnò
 *
 * ~/middlewares/log.js - immediate logging in console.
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import zouti from "zouti";

export default function( oRequest, oResponse, fNext ) { // eslint-disable-line func-style
    zouti.log( `(${ oRequest.method }) ${ oRequest.url }`, "LivAnnò:server:log" );
    fNext();
}
