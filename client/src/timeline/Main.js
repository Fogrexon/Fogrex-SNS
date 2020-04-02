import React from 'react';
import Posts from './Post';
import PostForm from './PostForm';

const Timeline = (props) => {
  console.log(props.username);
  return (
    <div>
      <PostForm />
      <Posts username={props.username} />
    </div>
  );
}

export default Timeline;