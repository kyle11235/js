import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-roboto';
import CssBaseline from 'material-ui/CssBaseline';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#80d6ff',
            main: '#2196f3',
            dark: '#0077c2',
            contrastText: '#fff',
        },
        secondary: {
            light: '#b2fab4',
            main: '#5cb85c',
            dark: '#519657',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiButton: {
            // Name of the styleSheet
            root: {
            },
            label: {
                textTransform: 'none'
            }
        },
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <React.Fragment>
            <CssBaseline/>
            <App/>
        </React.Fragment>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
