import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Question/Question';

const App = () => {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Questions} />
      <Route exact path='/question/:questionId' component={Question}/>
    </div>
  );
}

export default App;
