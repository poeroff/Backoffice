
import {createBrowserRouter ,RouterProvider} from "react-router-dom"

import Root from "./component/mainpage/root/Root"
import Login from "./component/auth/Login"
import Shop , {loader as shoploader}from "./component/shopList/Shop"
import Mypage ,{loader as pageloader}from "./component/mypage/Mypage"
import Shopdetail ,{loader as shopdetailloader } from "./component/shopList/shopdetail/Shopdetail"


const router = createBrowserRouter([
  {path : "" , children :[
    {index : true , element:<Root></Root>},
    {path : "Login", element :<Login></Login>},
    {path : ":foodMenu",children :[
      {index : true , element : <Shop></Shop>, loader : shoploader},

      {path :":shopid" ,element : <Shopdetail></Shopdetail>, loader : shopdetailloader}
    ]},
    {path : "mypage", element : <Mypage></Mypage> ,loader : pageloader}

  ]},

])

function App() {


  return (
  <RouterProvider router={router}></RouterProvider>
  )
   
}

export default App;
