import React from 'react';
import validation from '../utils/validation';

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
    event.target.value = '';
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validation(errors, name, value);
    this.setState({
      name: [value],
      errors,
    });
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

export default LogIn;
