import React from 'react';
import {withRouter} from 'react-router-dom';
import SignedInNavs from './SignedIn';
import SignInNavs from './SignIn';

import Authentication from '../components/Authentication';


const NavProto = (props) => {
  let location = props.location.pathname.split('/')[1];
  location = location === '' ? 'home' : location;

  return (
    <Authentication.Consumer>
      {
        value => {
          if(!!value) return <SignInNavs location={ location }/>
          return <SignedInNavs location={ location } />
        }
      }
    </Authentication.Consumer>
  );
}

const Navigationbar = withRouter(props => <NavProto {...props}/>);

export default Navigationbar;