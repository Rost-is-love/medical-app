import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import init from './init.jsx';

import '../assets/application.scss';

const runApp = async () => {
  const appContainer = document.querySelector('#app');
  const vdom = await init();

  ReactDOM.render(vdom, appContainer);
};

runApp();
