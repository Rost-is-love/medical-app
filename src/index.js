import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';

const runApp = async () => {
  const appContainer = document.querySelector('#app');
  const vdom = '<div>adf</div>';
  console.log('asdasd');
  ReactDOM.render(vdom, appContainer);
};

runApp();
