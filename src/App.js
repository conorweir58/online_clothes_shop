import './App.css';
// import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Pages/layout';
import HomePage from './Pages/home';
import FourOhFour from './Pages/fourohfour';

import AllCategories from './Components/all_categories';
import ProductsCategory from './Components/products_category';
import AllStatus from './Components/all_status_orders';
import AllCustomers from './Components/all_customers';
import SingleCustomer from './Components/single_customer';
import AllOrders from './Components/all_orders';
import OrderInfo from './Components/order_info';
import AddProduct from './Components/update_order_info';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />

          <Route path="/categories" element={<AllCategories />} />
          <Route path="/products/:categorycode" element={<ProductsCategory />} />

          <Route path="/orders" element={<AllOrders />} />    
          <Route path="/orders-status" element={<AllStatus />} />
          <Route path="/order/:orderid" element={<OrderInfo />} />

          <Route path="/customers" element={<AllCustomers />} />
          <Route path="/customers/:customerid" element={<SingleCustomer />} />

          <Route path="/order-update/:orderid" element={<AddProduct />} />
          

          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
