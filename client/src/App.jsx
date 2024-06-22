import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import ForgetPassword from './pages/forgetPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <Router>
      <Switch>
     

          <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/forgotPassword/">
          <ForgetPassword />
        </Route>
        <Route path="/reset-password/:token">
          <ResetPassword/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
