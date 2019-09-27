import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthHelperMethods from '../_authentication/authHelperMethods';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthHelperMethods();
    this.state = {
      username: '',
      password: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.Auth.loggedIn());
    if (this.Auth.loggedIn()) {
      this.props.history.push('/');
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.signup(this.state.username, this.state.password)
      // eslint-disable-next-line consistent-return
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    console.log(this.state);
  }

  render() {
    return (
      <>
        <div className="main-wrapper">
          <div className="box">
            <div className="box-header">
              <h1>Signup</h1>
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
                Signup
              </button>
            </form>
            <Link className="link" to="/login">
              Already have an account?
              <span className="link-signup">Login</span>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
