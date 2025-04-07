import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './routes/Routes'
import { RouterProvider } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
