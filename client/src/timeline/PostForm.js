import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit() {
    axios
      .post('/api/post', { text: this.state.text })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea value={this.state.text} onChange={this.handleTextChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}