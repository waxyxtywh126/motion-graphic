import React from 'react';
import ReactDOM from 'react-dom/client';
import { RemotionRoot } from 'remotion';
import { App } from './Root';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RemotionRoot>
      <App />
    </RemotionRoot>
  </React.StrictMode>,
);
