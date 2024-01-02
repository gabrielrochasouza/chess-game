import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer 
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
)
