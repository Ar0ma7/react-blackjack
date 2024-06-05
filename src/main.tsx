import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.css';
import { AppContainer } from '@/components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
