import React from 'react'

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home/Home'
import Product from './components/Product/Product'
import Users from './components/Users/Users'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Admin from './components/Admin/Admin'
import CreateProduct from './components/CreateProduct/Createproduct'
import Updateproduct from './components/Updateproduct/Updateproduct'
import Cart from './components/Cart/Cart'
import GetProduct from './components/CreateProduct/Getproduct'
import GetCart from './components/Cart/GetCart'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path={"/"} element={ <Home />}/>
          <Route  path={"/admin"} element={ <Admin />}/>
          <Route  path={"/signup"} element={ <Signup />}/>
          <Route  path={"/login"} element={ <Login />}/>
          <Route  path={"/product"} element={ <Product />}/>
          <Route  path={"/admin/users"} element={ <Users />}/>
          <Route  path={"/admin/createproduct"} element={ <CreateProduct />}/>
          <Route  path={"/admin/getproduct"} element={ <GetProduct />}/>
          <Route  path={"/updateproduct/:id"} element={ <Updateproduct />}/>
          <Route path={"/cart"} element={ <Cart />} />
          <Route path={"/getcart"} element={ <GetCart />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App