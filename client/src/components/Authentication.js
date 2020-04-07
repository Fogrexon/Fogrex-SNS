import React from 'react';
import axios from 'axios';

const Authentication = React.createContext(null);

export default Authentication;

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
    }
  }

  componentDidMount() {
    console.log('whoami');
    this.whoami();
  }

  whoami() {
    axios.get('/api/whoami').then(
      (res) => this.setState({auth: { username: res.data.username }})
    ).catch(
      (err) => this.setState({auth: { username: null }})
    );
  }

  render() {
    return (
      <Authentication.Provider value={this.state.auth}>
        { this.props.children }
      </Authentication.Provider>
    );
  }
}