// pages/_app.js
import React from "react";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import makeStore from '../store';
import {Sidenav} from '../components/Menu/Sidenav';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { useRouter } from 'next/router'

const { Header, Content, Footer } = Layout;

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {

    // we can dispatch from here too
    //ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  render() {
    const {Component, pageProps, store} = this.props;

    const containerProvider = <Container>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Container>;

    const sidenavWithContainerProvider =   <Layout>
      <Sidenav/>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Container>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </Container>
          </div>
        </Content>
      </Layout>
    </Layout>;
    return (
      <main>
        {this.props.router.asPath.includes('/login') || this.props.router.asPath.includes('/logout') ?  (containerProvider) : (sidenavWithContainerProvider)}
      </main>
    );
  }

}

export default withRedux(makeStore)(MyApp);