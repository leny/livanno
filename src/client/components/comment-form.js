/* LivAnnò
 *
 * ~/components/comment-form.js
 *
 * coded by leny@flatLand!
 * started at 07/01/2016
 */

import React from "react";
import reqwest from "reqwest";

export default class CommentsForm extends React.Component {
    constructor( oProps ) {
        super( oProps );

        this._oInitialState = {
            "author": "",
            "content": "",
            "error": false
        };

        this.state = this._oInitialState;
    }

    authorHasChanged( e ) {
        this.setState( {
            "author": e.target.value
        } );
    }

    contentHasChanged( e ) {
        this.setState( {
            "content": e.target.value
        } );
    }

    formHasBeenSubmitted( e ) {
        e.preventDefault();
        let sAuthor = this.state.author.trim(),
            sContent = this.state.content.trim();

        if ( !sAuthor || !sContent ) {
            this.setState( {
                "error": "submission"
            } );
            return;
        }

        reqwest( {
            "url": "/",
            "method": "post",
            "data": {
                "author": sAuthor,
                "content": sContent
            },
            "success": ( oResponse ) => {
                if( oResponse.error ) {
                    this.setState( {
                        "error": oResponse.error
                    } );
                    return;
                }
                this.setState( this._oInitialState );
                this.props.onSubmitSuccess( oResponse.comments );
            },
            "error": ( oXHR, sStatus, oError ) => {
                console.error( "addComment:", sStatus, oError );
                this.setState( {
                    "error": "save"
                } );
            }
        } );

    }

    render() {
        let $error;

        if ( this.state.error === "submission" ) {
            $error = ( <p className="error">Oops! There's an error! Please, fill all the fields!</p> );
        }

        if ( this.state.error === "save" ) {
            $error = ( <p className="error">Oops! There was an error with the server! Please, try again!</p> );
        }

        return (
            <section className="form">
                <h2>Leave a comment!</h2>
                <form action="/" method="post" onSubmit={ this.formHasBeenSubmitted.bind( this ) }>
                    <fieldset>
                        { $error }
                        <div className="form-elt">
                            <label htmlFor="author">Name:</label>
                            <input type="text" name="author" id="author" placeholder="Your name" value={ this.state.author } onChange={ this.authorHasChanged.bind( this ) } />
                        </div>
                        <div className="form-elt">
                            <label htmlFor="content">Content:</label>
                            <textarea type="text" name="content" id="content" placeholder="Your comment" value={ this.state.content } onChange={ this.contentHasChanged.bind( this ) } />
                        </div>
                        <div className="actions">
                            <button type="submit">Send</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        );
    }
}
