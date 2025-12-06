import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import {Provider} from "react-redux"
import store from './utils/store/app.js'
import Login from './Components/Login.jsx'
import Home from './Components/Home.jsx'
import ProtectRoute from './Components/ProtectRoute.jsx'
import TaskDetails from './Components/shared/TaskDetails.jsx'
import EditTask from './Components/shared/EditTask.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "login", Component: Login },

      {
        element: <ProtectRoute />,
        children: [
          { path: "/", Component: Home },
          {path:"add-task", Component:TaskDetails} ,
          {path:"edit-task/:_id", Component:EditTask}  
        ]
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store= {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
