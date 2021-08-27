import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Header from './Header.jsx';
import MainPage from './MainPage.jsx';
import Modals from './Modals.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => (
  <>
    <div className="d-flex flex-column h-100 min-vh-100 pt-3">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
    <Modals />
  </>
);

export default App;
