import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import App from './Containers/app.js';
import SearchPanel from './Containers/Search-Panel/SearchPanel.js';
import Store from './Redux/index.js';

class Routes extends Component {

	render() {

		return (
			<Provider store={Store}>
				<Switch>
                	<Route exact path="/" component={App} />
                	<Route exact path="/search" component={SearchPanel} />
            	</Switch>
			</Provider>
		)
	}
}

export default Routes;