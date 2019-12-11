import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Question = (props) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        async function fetchQuestion() {
            const { match: { params } } = props;
            const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;

            setQuestion(question);
        }

        fetchQuestion();
    }, []);

    if (question === null) return <p>Loading ...</p>;

    return (
        <div className="container">
            <div className="row">
                <div className="jumbotron col-12">
                    <h1 className="display-3">{question.title}</h1>
                    <p className="lead">{question.description}</p>
                    <hr className="my-4" />
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
