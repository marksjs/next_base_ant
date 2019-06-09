import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../utils/auth';

import {PageLoader} from '../components/PageLoader';

const serverUrl = 'http://cipa.velow.com.br';

// set up cookies
const cookies = new Cookies();

class Admins extends React.Component {

  constructor(){
    super();
    this.state = {pageLoading: true}
  }

  componentDidMount(){
    this.setState({pageLoading: false});
  }


  render() {
    return (
      <div id="main">
        {this.state.pageLoading ? <PageLoader/> : ""}
        <div>
          Login realizado com sucesso
        </div>
      </div>
    );
  }
}

// Server-Side Rendering
// Secret.getInitialProps = async (ctx) => {
//   // Must validate JWT
//   // If the JWT is invalid it must redirect
//   // back to the main page. You can do that
//   // with Router from 'next/router
//   await handleAuthSSR(ctx);
//
//   // Must return an object
//   return {}
// }

export default Admins;