import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './router.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	<MuiThemeProvider>
		<BrowserRouter>
			<Routes/>
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById('root')
);
registerServiceWorker();