
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { SetAuthToken } from './config/axios-configuration';

// // ⬇️ Automatically set token from localStorage (on page reload)
// const token = localStorage.getItem('token');
// if (token) {
//   SetAuthToken(token);
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SetAuthToken } from './config/axios-configuration';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// ⬇️ Automatically set token from localStorage (on page reload)
const token = localStorage.getItem('token');
if (token) {
  SetAuthToken(token);
}

// ⬇️ Optional: customize your theme here
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2' // MUI blue
    },
    secondary: {
      main: '#9c27b0'
    }
  },
  shape: {
    borderRadius: 8
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
