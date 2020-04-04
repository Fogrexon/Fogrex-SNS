import React from 'react';
import Grid from '@material-ui/core/Grid';
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid container>
        <form>
          <label>
            <textarea value={this.state.text} onChange={this.handleTextChange} />
          </label>
          <input type='submit' value='Submit' onClick={this.handleSubmit} />
        </form>
      </Grid>
    );
  }
}