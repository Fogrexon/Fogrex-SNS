import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '5px auto',
  },
  reply: {
    width: '90%',
    margin: '5px 0px 5px auto',
  },
});

class Like extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      like: props.like,
      num: props.num,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.stopPropagation();
    axios
      .post(`/api/${ this.state.like ? 'unlike' : 'like' }/${this.props.postId}`)
      .then((res) => {
        this.setState({
          like: !this.state.like,
          num: this.state.num + (this.state.like ? -1 : 1),
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <span>
        <IconButton onClick={this.handleClick}>
            { this.state.like ? <Icon>{'favorite'}</Icon> : <Icon>{'favorite_border'}</Icon> }
        </IconButton>
        { this.state.num }
      </span>
    );
  }
}



const Post = (props) => {
  const post = props.post;
  const classes = useStyles();

  const handleClick = (path) => (e) => {
    e.stopPropagation();
    props.history.push(path);
    if(props.match.url.split('/')[1] === path.split('/')[1]) props.history.go(0);
  }

  return (
    <Card key={post.id} className={props.isReply ? classes.reply : classes.root} onClick={handleClick(`/detail/${post.id}`)} >
      <CardHeader
        avatar={
          <Avatar className={classes.posStatic} alt={post.username}>{post.username.charAt(0)}</Avatar>
        }
        title={post.username}
        subheader={new Date(post.createAt).toString()}
      />
      <CardContent>
        <Typography variant='body2' component='p'>
          { post.text }
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleClick(`/reply/${post.id}`)}><ChatBubbleIcon /></IconButton>
        { !!post.replied ? post.replied.length : 0 }
        <Like like={post.isLiked} num={post.likeNum} postId={post.id} />
      </CardActions>
    </Card>
  );
}

export default withRouter(Post);