import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import favicons from './images'
import './index.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker()