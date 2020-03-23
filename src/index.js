import React from 'react';
import ReactDOM from 'react-dom';
import { setGlobal } from 'reactn'
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

setGlobal({
  auth: {}
})
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
serviceWorker.unregister();
