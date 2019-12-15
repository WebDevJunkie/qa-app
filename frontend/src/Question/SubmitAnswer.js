import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

const SubmitAnswer  = (props) => {
    const [answer, setAnswer] = useState('');

    const updateAnswer = (value) => {
        setAnswer(value);
    }

    const submit = () => {
        props.submitAnswer(answer);
        setAnswer('');
    }

    if (!auth0Client.isAuthenticated()) return null;

    return (
        <Fragment>
            <div className="form-group text-center">
            <label htmlFor="exampleInputEmail1">Answer:</label>
            <input
                type="text"
                onChange={(e) => {updateAnswer(e.target.value)}}
                className="form-control"
                placeholder="Share your answer."
                value={answer}
            />
            </div>
            <button
            className="btn btn-primary"
            onClick={() => {submit()}}>
            Submit
            </button>
            <hr className="my-4" />
        </Fragment>
    );
}

export default withRouter(SubmitAnswer);
