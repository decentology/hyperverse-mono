import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite/no-important';

import * as Hyperverse from '../packages/hyperverse';
import * as HyperverseSimpleNFT from '../packages/hyperverse-simple-nft';

import Icons from './components/Icons';
import Navigation from './components/Navigation';
import Tabs from './components/Tabs.jsx';

import * as pages from './pages';

const hyperversePromise = Hyperverse.initialize({
  blockchain: 'Flow',
  network: 'Testnet',
  modules: [
    {package: HyperverseSimpleNFT, tenantID: '0xccea6c9965b5831a.14594196'}
  ]
});

const styles = StyleSheet.create({
  App: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    fontFamily: 'sans-serif'
  }
});

function App(props) {
  return (
    <div className={css(styles.App)}>
      <Icons />
      <Navigation />
      <Tabs
        pages={[
          {title: 'Home', path: '/'},
          {title: 'SimpleNFT', path: '/simple-nft'}
        ]}
      />
      <Switch>
        <Route path="/" exact component={pages.Home} />
        <Route path="/simple-nft" component={pages.SimpleNFT} />
      </Switch>
    </div>
  );
}

function WrappedApp(props) {
  return (
    <Hyperverse.Provider hyperverse={hyperversePromise}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Hyperverse.Provider>
  );
}

export default WrappedApp;