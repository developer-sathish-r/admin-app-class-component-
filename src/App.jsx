//import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Private_Layout from './pages/privateLayout/privateLayout';
import Login from './pages/login/login';
import Register from './pages/register/register';
import { NotFound } from './pages/404/PageNotFound';
import React from 'react';
import AddUser from './pages/privateLayout/sider/addUser';
import { connect } from 'react-redux';
import Dashboard from "./pages/privateLayout/sider/dashboard";


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        {this.props.login ?
          <Private_Layout />
          :
          <>
            <Routes >
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes >
          </>
        }
      </>
    );
  }
}
//const login = useSelector((Item) => Item.login);
const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(App);