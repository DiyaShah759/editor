import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerLicense } from '@syncfusion/ej2-base';

import './index.css';
import App from './App.jsx';

registerLicense('Ngo9BigBOggjHTQxAR8/V1JHaF1cXmhOYVdpR2NbeU5xdl9CZFZTTGYuP1ZhSXxVdkNjXX9edHBWQmBUVEd9XEE=');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);