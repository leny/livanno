/* LivAnnò
 *
 * ~/components/comment.js
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import React from "react";
import marked from "marked";
import moment from "moment";

export default class Comment extends React.Component {
    formatDate( bReadable ) {
        let dDate = ( new Date( this.props.timestamp ) );

        return bReadable ? moment( dDate ).format( "DD/MM/YYYY HH:mm" ) : dDate.toISOString();
    }

    getMarkup() {
        let sRawContent = this.props.content;

        return {
            "__html": marked( sRawContent )
        };
    }

    render() {
        return (
            <li>
                <div className="content" dangerouslySetInnerHTML={ this.getMarkup() }></div>
                <time dateTime={ this.formatDate() }>{ this.formatDate( true ) }</time>
                <span className="author">by { this.props.author }</span>
            </li>
        );
    }
}
