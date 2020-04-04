import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const styles = {
  root: {
    minWidth: "95%",
  },
};

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

class Post extends React.Component {
  render() {
    return (
      <Card key={this.props.postId} className={this.props.classes.root}>
        <CardHeader
          avatar={
            <Avatar alt={this.props.username}>{this.props.username.charAt(0)}</Avatar>
          }
          title={this.props.username}
          subheader={this.props.date.toString()}
        />
        <CardContent>
          <Typography variant='body2' component='p'>
            { this.props.text }
          </Typography>
        </CardContent>
        <CardActions>
          <Like like={this.props.likes.indexOf(this.props.me) >= 0} num={this.props.likes.length} postId={this.props.postId} />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);