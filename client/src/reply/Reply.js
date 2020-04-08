import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '5px auto',
  }
});

export default (props) => {
  const post = props.post;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.posStatic} alt={post.username}>{post.username.charAt(0)}</Avatar>
        }
        title={post.username}
        subheader={post.date.toString()}
      />
      <CardContent>
        <Typography variant='body2' component='p'>
          { post.text }
        </Typography>
      </CardContent>
    </Card>
  );
}