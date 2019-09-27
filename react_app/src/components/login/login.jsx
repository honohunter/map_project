import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHelperMethods from '../_authentication/authHelperMethods';

class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthHelperMethods();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        this.props.history.replace('/');
        return true;
      })
      .catch(error => {
        alert(error);
      });
  }

  componentDidMountMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  render() {
    return (
      <>
        <div className="main-wrapper">
          <div className="box">
            <div className="box-header">
              <h1>Login</h1>
            </div>
            <form className="box-form">
              <input
                className="form-item"
                placeholder="Username"
                name="username"
                type="text"
                onChange={this.handleChange}
              />
              <input
                className="form-item"
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <button className="form-submit" onClick={this.handleFormSubmit} type="submit">
                Login
              </button>
            </form>
            <Link className="link" to="/signup">
              Dont have an account? <span className="link-signup">Signup</span>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
