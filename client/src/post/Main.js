import React from 'react';
import { ViewFrame, Redirector } from '../components/ViewComponents';
import PostForm from './PostForm';


export default (props) => {
  props.auth(props.match.url)();
  return (
    <React.Fragment>
      <ViewFrame title='Post'>
        <Redirector />
        <PostForm />
      </ViewFrame>
    </React.Fragment>
  );
}