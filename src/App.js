import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from '@firebase/app';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount(){
    var config = {
      apiKey: "",
      authDomain: "zadanie-dbm.firebaseapp.com",
      databaseURL: "https://zadanie-dbm.firebaseio.com",
      projectId: "zadanie-dbm",
      storageBucket: "zadanie-dbm.appspot.com",
      messagingSenderId: "917139000605"
    };
  
    firebase.initializeApp(config);
  }
  render(){
    const logger = createLogger()
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(logger, ReduxThunk))}  >
        <Router />
      </Provider>
    );
  }
}


export default App