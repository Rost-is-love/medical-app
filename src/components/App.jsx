import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { has } from 'lodash';

import Header from './Header.jsx';
import MainPage from './MainPage.jsx';
import AddModal from './AddModal.jsx';

const App = () => (
  <>
    <div className="d-flex flex-column h-100 min-vh-100 pt-3">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          {/* <Route path="*">
            <NotFoundPage />
          </Route> */}
        </Switch>
      </Router>
    </div>
    <AddModal />
  </>
);

export default App;
