import React from 'react';
import i18next from 'i18next';
import * as yup from 'yup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import App from './components/App.jsx';
import resources from './locales/ru.js';
import reducer from './slices';
import yupDictionary from './locales/yup.js';

export default async () => {
  const store = configureStore({ reducer });

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });
  yup.setLocale(yupDictionary);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};
