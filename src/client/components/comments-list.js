/* LivAnnò
 *
 * ~/components/comments-list.js
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import React from "react";

import Comment from "./comment";

export default class CommentsList extends React.Component {
    render() {
        let aCommentsTags = [];

        for ( let oComment of this.props.comments ) {
            aCommentsTags.push( <Comment key={ oComment.id } timestamp={ oComment.id } author={ oComment.author } content={ oComment.content } /> );
        }

        return (
            <section className="comments">
                <h2>Comments</h2>

                <ul>
                    { aCommentsTags }
                </ul>
            </section>
        );
    }
}
