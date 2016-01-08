/* LivAnnò
 *
 * ~/main.js - main entry point for client
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import React from "react";
import ReactDOM from "react-dom";

import LivAnno from "./components/livanno"

ReactDOM.render(
    <LivAnno comments={ window.app.data.livanno } />,
    document.querySelector( "main .container" )
);
