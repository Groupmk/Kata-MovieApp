import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import 'normalize.css';

const container = document.getElementById('root');
createRoot(container).render(<App />);

