import React from 'react';
import Posts from './Posts';

import { ViewFrame, Redirector } from '../components/ViewComponents';

const Timeline = (props) => {
  props.auth(props.match.url)();
  return (
    <React.Fragment>
      <ViewFrame title='Home'>
        <Redirector />
        <Posts />
      </ViewFrame>
    </React.Fragment>
  );
}

export default Timeline;