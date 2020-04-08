import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import Reply from './Reply';

const styles = {
  inputForm: {
    width: '100%',
    margin: '10px auto 0 auto',
  },
  paper: {
    margin: '10px auto 0 auto',
    padding: '15px',
  },
  primaryTheme: {
    borderColor: '#1976d2',
    borderWidth: 2,
    borderStyle: 'solid',
    color: '#1976d2',
  },
  secondaryTheme: {
    borderColor: '#dc004e',
    borderWidth: 2,
    borderStyle: 'solid',
    color: '#dc004e',
  },
  button: {
    display: 'block',
    margin: '10px 0 0 auto',
  },
};

class RepFormProto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errorMessage: null,
      okMessage: null,
      redirect: false,
      post: {
        username: ' ',
        date: new Date(0),
        text: null,
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  handleSubmit() {
    axios
      .post('/api/post', { text: this.state.text, reply: this.props.postid })
      .then((res) => {
        this.setState({ okMessage: res.data.message, errorMessage: null });
        setInterval(() => this.setState({redirect: true}), 2000);
      })
      .catch((error) => {
        if(!error.response) this.setState({ errorMessage: error.response.data.message, okMessage: null });
      });
  }

  componentDidMount() {
    axios
      .get(`/api/post/${ this.props.postid }`)
      .then((res) => {
        this.setState({ post: res.data });
      })
      .catch((error) => {
        if(!error.response) this.setState({ errorMessage: error.response.data.message, okMessage: null });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Reply post={this.state.post} />
        <form>
          { !this.state.redirect || <Redirect to='/' /> }
          { this.state.errorMessage ? <Paper variant='elevation' className={ [this.props.classes.paper, this.props.classes.secondaryTheme].join(" ") }>{ this.state.errorMessage }</Paper> : null }
          { this.state.okMessage ? <Paper variant='elevation' className={ [this.props.classes.paper, this.props.classes.primaryTheme].join(" ") }>{ this.state.okMessage }</Paper> : null }
          <TextField
            className={ this.props.classes.inputForm }
            label='Content'
            multiline
            rows='8'
            variant='outlined'
            onChange={this.handleChange}
          />
          <Button variant='contained' color='primary' className={this.props.classes.button} onClick={this.handleSubmit}>POST</Button>
        </form>
      </React.Fragment>

    );
  }
}

export default withStyles(styles)(RepFormProto)
