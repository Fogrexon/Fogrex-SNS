import React from 'react';
import Favs from './Favs';

import { ViewFrame, Redirector } from '../components/ViewComponents';

const Timeline = (props) => {
  props.auth();
  return (
    <React.Fragment>
      <ViewFrame title='Favorites'>
        <Redirector />
        <Favs />
      </ViewFrame>
    </React.Fragment>
  );
}

export default Timeline;