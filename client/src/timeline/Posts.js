import React from 'react';
import axios from 'axios';
import Post from './Post';

import Authentication from '../components/Authentication';

export default class Posts extends React.Component {

  static contextType = Authentication;

  constructor(props)
  {
    super(props);
    this.prevContext = this.context;
    this.state = {
      posts: [],
    };
    this.tick();
    this.interval = setInterval(() => this.tick(), 10 * 1000);
  }

  componentDidUpdate() {
    if(this.prevContext !== this.context) {
      this.tick();
      this.prevContext = this.context;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  

  tick() {
    if(!this.context) return;
    axios
      .get('/api/post')
      .then((res) => {
        if(res.status !== 200) return;
        this.setState({
          posts: res.data,
        });
      });
  }

  

  render(){
    return (
      <React.Fragment>
        { 
          this.state.posts.map(post => {
            return (
              <React.Fragment key={post.id} >
                <Post post={post} me={this.context.username} />
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}
