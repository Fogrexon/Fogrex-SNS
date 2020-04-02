import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      signedin: false,
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit() {
    const options = {
      headers: {
          'Content-Length': '10000'
      },
      json: true
    };
    console.log({ username: this.state.username, password: this.state.password });
    axios
      .post('/api/signin', { username: this.state.username, password: this.state.password }, options)
      .then((res) => {
        console.log(res.status);
        if(res.status !== 200) {
          this.setState({
            message: res.data.message,
          });
          return;
        }
        this.setState({
          // signedin: true,
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <div>
          { this.state.message }
        </div>
        <form>
          <label>
            Username:
            <input type='text' value={this.state.username} onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input type='password' value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <input type='button' value='Submit' onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}