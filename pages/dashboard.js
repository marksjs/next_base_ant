import React from 'react';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../utils/auth';
import {PageLoader} from '../components/PageLoader';

// set up cookies
const cookies = new Cookies();

class Dashboard extends React.Component {

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


// Admins.getInitialProps = async (ctx) => {
//   // Must validate JWT
//   // If the JWT is invalid it must redirect
//   // back to the main page. You can do that
//   // with Router from 'next/router
//   await handleAuthSSR(ctx);
//
//   // Must return an object
//   return {}
// }
export default Dashboard;