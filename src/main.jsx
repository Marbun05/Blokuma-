import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import CustomCursor from "../components/ui/CustomCursor.jsx";
import { KikoErrorBoundary } from '../components/ui/KikoErrorBoundary.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KikoErrorBoundary>
      <BrowserRouter>
        <App />
        <CustomCursor />
      </BrowserRouter>
    </KikoErrorBoundary>
  </React.StrictMode>
);
