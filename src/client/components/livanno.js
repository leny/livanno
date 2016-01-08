/* LivAnnò
 *
 * ~/components/livanno.js - general component class
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import React from "react";
import ReactDOM from "react-dom";

import CommentsList from "./comments-list";
import CommentForm from "./comment-form";

export default class LivAnno extends React.Component {
    constructor( oProps ) {
        super( oProps );

        this.state = {
            "comments": [],
            "operationStatus": false
        };
    }

    componentWillMount() {
        this.setState( {
            "comments": this.props.comments
        } );
    }

    formSubmittedWithSuccess( aComments ) {
        this.setState( {
            "comments": aComments
        } );
    }

    render() {
        return (
            <div>
                <CommentsList comments={ this.state.comments } />
                <CommentForm onSubmitSuccess={ this.formSubmittedWithSuccess.bind( this ) } />
            </div>
        );
    }
}
