import 'typeface-overpass';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import App from './components/App';
require.context('./images');


render(<App />, document.getElementById('app'));
