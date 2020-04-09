import React from 'react';
import Posts from './Posts';

import { ViewFrame, Redirector } from '../components/ViewComponents';

const Timeline = (props) => {
  props.auth();
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