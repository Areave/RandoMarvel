import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.min.css'
import service from './APIServices/service'


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

