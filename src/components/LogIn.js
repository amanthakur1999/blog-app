import React from 'react';
import validation from '../utils/validation';
import { loginURL } from '../utils/constant';
import { withRouter } from 'react-router';

class LogIn extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validation(errors, name, value);
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);

        this.props.history.push('/');
      })
      .catch((errors) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            error: {
              ...prevState.errors,
              email: 'Email or password is not correct',
            },
          };
        })
      );
  };

  render() {
    let { email, password, errors } = this.state;
    return (
      <section>
        <h2>Sign In</h2>
        <button>Need an account?</button>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
          />
          <span className="text-red-500">{errors.email}</span>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
          />
          <span className="text-red-500 block">{errors.password}</span>
          <button type="submit" disabled={errors.email || errors.password}>
            Sign In
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(LogIn);
