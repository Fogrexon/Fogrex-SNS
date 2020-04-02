import React from 'react';
import Posts from './Post';

const Timeline = (props) => {
  console.log(props.username);
  return (
    <div>
      <Posts username={props.username} />
    </div>
  );
}

export default Timeline;