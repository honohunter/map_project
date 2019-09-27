import React, { Component } from 'react';
import AuthHelperMethods from './authHelperMethods';

export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        confirm: null,
        loaded: false,
      };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const confirm = Auth.getConfirm();
          console.log('confirmation is:', confirm);
          this.setState({
            confirm,
            loaded: true,
          });
        } catch (err) {
          console.log(err);
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.loaded === true) {
        if (this.state.confirm) {
          console.log('confirmed!');
          return <AuthComponent history={this.props.history} confirm={this.state.confirm} />;
        }
        console.log('not confirmed!');
        return null;
      }
      return null;
    }
  };
}
