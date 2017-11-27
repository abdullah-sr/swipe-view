import 'typeface-roboto';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import './css/material-icons.css';
import App from './components/App';


render(<App />, document.getElementById('app'));
