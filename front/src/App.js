
import {createBrowserRouter ,RouterProvider} from "react-router-dom"
import Choice from "./component/choice/Choice"
import Root from "./component/mainpage/root/Root"
import Login from "./component/auth/Login"


const router = createBrowserRouter([
  {path : "" , children :[
    {index : true , element:<Root></Root>},
    {path : "Login", element :<Login></Login>}

  ]},

])

function App() {


  return (
  <RouterProvider router={router}></RouterProvider>
  )
   
  
}

export default App;
