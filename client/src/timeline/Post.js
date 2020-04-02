import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Like extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      like: props.like,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    axios
      .post(`/api/${ this.state.like ? 'unlike' : 'like' }/${this.props.postId}`)
      .then((res) => {
        this.setState({
          like: !this.state.like,
        });
      });
  }

  render() {
    return (
      <span onClick={this.handleClick}>
          { this.state.like ? <Icon>{'favorite'}</Icon> : <Icon>{'favorite_border'}</Icon> }
      </span>
    );
  }
}

class Post extends React.Component {

  render() {
    return (
      <Card key={this.props.postId}>
        <CardContent>
          <Typography color='textSecondary' gutterBottom>
            { this.props.username }
          </Typography>
          <Typography variant='body2' component='p'>
            { this.props.text }
          </Typography>
        </CardContent>
        <CardActions>
          <Like like={this.props.isLike} postId={this.props.postId} />
        </CardActions>
      </Card>
    );
  }
}

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
      <ul>
        { 
          this.state.redirect
          ? (<Redirect to='/signin' />)
          : this.state.posts.map(post => {
            return <Post key={post.id} username={post.username} postId={post.id} text={post.text} isLike={(post.likes.indexOf(this.props.username) >= 0)} me={this.props.username} />
          })
        }
      </ul>
    );
  }
}
