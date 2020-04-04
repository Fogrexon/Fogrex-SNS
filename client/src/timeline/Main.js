import React from 'react';
import Grid from '@material-ui/core/Grid';
import Posts from './Posts';
import PostForm from './PostForm';

const Timeline = (props) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        menu
      </Grid>
      <Grid item xs={12} sm={9}>
        <PostForm />
        <Posts username={props.username}/>
      </Grid>
    </Grid>
  );
}

export default Timeline;