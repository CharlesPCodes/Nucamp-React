import React, { Component } from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
//set store 
const store = ConfigureStore();

class App extends Component {
    render() {
        return (
          // setting Provider to include store so that we can use json server & db.json
            <Provider store={store}>
            <BrowserRouter>
              <div className="App">
                  {/* Calls the main function from MainComponent.js */}
                <Main />
              </div>
            </BrowserRouter>
          </Provider>
        );
    };
}

export default App;