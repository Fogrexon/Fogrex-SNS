import React from 'react';
import {
  Card,
  CardActions,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Like extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLike: props.like,
    }
    this.postId = props.postId;
  }

  handleClick(){
    axios
      .post(`/api/${ this.state.isLike ? 'unlike' : 'like' }/${this.postId}`)
      .then(() => {
        this.setState({
          isLike: !this.state.isLike,
        });
      });
  }

  render() {
    return (
      <span onClick={this.handleClick}>
        <Icon >
          { this.state.isLike ? 'favorite' : 'favorite_board' }
        </Icon>
      </span>
    );
  }
}

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.username = props.username;
    this.postId = props.postId;
    this.text = props.text;
    this.isLike = props.isLike;
    this.me = props.me;
  }

  render() {
    return (
      <Card key={this.postId}>
        <CardTitle title={this.username} subtitle='' />
        <CardText>
          {this.text}
        </CardText>
        <CardActions>
          <Like isLike={this.isLike} postId={this.postId} />
        </CardActions>
      </Card>
    );
  }
}

export default class Posts extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      posts: [],
      redirect: false,
    }
    this.me = props.username;
    this.tick();
    setInterval(() => this.tick(), 10 * 1000);

  }

  tick() {
    axios
      .get('/api/post')
      .then((res) => {
        if(res.status !== 200) return;
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setStatus({
            redirect: true,
          });
        }
      });
  }

  render(){
    return (
      <ul>
        { 
          this.status.redirect
          ? (<Redirect to='/signin' />)
          : this.posts.map(post => {
            return <Post username={post.username} postId={post.id} text={post.text} isLike={post.likes.indexOf()} me={this.me} />
          })
        }
      </ul>
    );
  }
}
