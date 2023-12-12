
import {createBrowserRouter ,RouterProvider} from "react-router-dom"
import Choice from "./component/choice/Choice"
import Root from "./component/mainpage/root/Root"
import Login from "./component/auth/Login"
import Shop from "./component/shopList/Shop"


const router = createBrowserRouter([
  {path : "" , children :[
    {index : true , element:<Root></Root>},
    {path : "Login", element :<Login></Login>},
    {path : ":foodMenu", element : <Shop></Shop>}

  ]},

])

function App() {


  return (
  <RouterProvider router={router}></RouterProvider>
  )
   
  
}

export default App;
