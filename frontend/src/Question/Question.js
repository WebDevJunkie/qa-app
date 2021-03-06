import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';

const Question = (props) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        refreshQuestion();
    }, []);

    const refreshQuestion = async () => {
        const { match: { params } } = props;
        const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        setQuestion(
            question,
        );
    }

    const submitAnswer = async (answer) => {
        await axios.post(`http://localhost:8081/answer/${question.id}`, {
            answer,
        }, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });

        await refreshQuestion();
    }

    if (question === null) return <p>Loading ...</p>;

    return (
        <div className="container">
            <div className="row">
                <div className="jumbotron col-12">
                    <h1 className="display-3">{question.title}</h1>
                    <p className="lead">{question.description}</p>
                    <hr className="my-4" />
                    <SubmitAnswer questionId={question.id} submitAnswer={submitAnswer} />
                    <p>Answers:</p>
                    {
                    question.answers.map((answer, idx) => (
                        <p className="lead" key={idx}>{answer.answer}</p>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Question;
