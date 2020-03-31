import React from 'react';
import Posts from './Post';

const Timeline = (props) => {
  return (
    <div>
      <Posts username={props.username} />
    </div>
  );
}

export default Timeline;