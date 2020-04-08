import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '5px auto',
  }
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

  handleClick(){
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
  return (
    <Card key={post.id} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.posStatic} alt={post.username}>{post.username.charAt(0)}</Avatar>
        }
        title={post.username}
        subheader={new Date(post.date).toString()}
      />
      <CardContent>
        <Typography variant='body2' component='p'>
          { post.text }
        </Typography>
      </CardContent>
      <CardActions>
        <Like like={post.likes.indexOf(props.me) >= 0} num={post.likes.length} postId={post.id} />
      </CardActions>
    </Card>
  );
}

export default Post;