import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginView from '../Components/login/index.js';
import { HeaderView } from '../Components/header/index.js';
import './app.css';

class App extends Component {

    render() {

        return (
            <div className="App">
                <HeaderView/>
                <div className="Login-container">
                	<LoginView {...this.props}/>
                </div>
            </div>
        );
    }
}

export default connect()(App);