import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';

const NewQuestion  = (props) => {
  const [state, setState] = useState({
    disabled: false,
    title: '',
    description: '',
  });

  const updateDescription = (value) => {
    setState({
      ...state,
      description: value,
    });
  }

  const updateTitle = (value) => {
    setState({
      ...state,
      title: value,
    });
  }

  const submit = async () => {
    setState({
      disabled: true,
    });

    await axios.post('http://localhost:8081', {
      title: state.title,
      description: state.description,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    props.history.push('/');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-header">New Question</div>
            <div className="card-body text-left">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title:</label>
                <input
                  disabled={state.disabled}
                  type="text"
                  onBlur={(e) => {updateTitle(e.target.value)}}
                  className="form-control"
                  placeholder="Give your question a title."
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description:</label>
                <input
                  disabled={state.disabled}
                  type="text"
                  onBlur={(e) => {updateDescription(e.target.value)}}
                  className="form-control"
                  placeholder="Give more context to your question."
                />
              </div>
              <button
                disabled={state.disabled}
                className="btn btn-primary"
                onClick={() => {submit()}}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NewQuestion);
