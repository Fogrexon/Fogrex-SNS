import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default class Posts extends React.Component {
  constructor(props)
  {
    console.log(props.username);
    super(props);
    this.state = {
      posts: [],
      redirect: false,
    };
    this.tick();
    setInterval(() => this.tick(), 10 * 1000);

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  

  tick() {
    if(!this.props.username) return;
    axios
      .get('/api/post')
      .then((res) => {
        if(res.status !== 200) return;
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
          this.setState({
            redirect: true,
          });
        }
      });
  }

  componentDidUpdate(prevProps) {
    
    if(prevProps.username !== this.props.username) {
      this.tick();
    }
  }

  render(){
    return (
      <Grid container>
        { 
          this.state.redirect
          ? (<Redirect to='/signin' />)
          : this.state.posts.map(post => {
            return (
              <Grid container key={post.id}>
                <Post username={post.username} postId={post.id} text={post.text} likes={post.likes} me={this.props.username} date={new Date(post.date)} />
              </Grid>
            );
          })
        }
      </Grid>
    );
  }
}
