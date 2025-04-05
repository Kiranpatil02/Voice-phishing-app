import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Theme } from '@radix-ui/themes'
import { Upload } from './Components/Upload/Upload.jsx'
import { Body } from './Components/Body/Body.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path: 'home',
        element: <Body />       },
      {
        path: 'test',
        element: <Upload />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme  accentColor="tomato" radius="small">
      <RouterProvider router={router}/>
    </Theme>
  </StrictMode>,
)
