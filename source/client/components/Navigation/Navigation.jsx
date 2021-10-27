import React, {useContext} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {useFlow} from '../../../packages/hyperverse/flow';

import {Icon} from '../../components/Icons';
import Authentication from './Authentication.jsx';

const styles = StyleSheet.create({
  Navigation: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: '1',
    maxWidth: '960px',
    padding: '0.5rem 3rem',
    '@media (max-width: 1024px)': {
      padding: '0.5rem 1.5rem',
    }
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1',
    fontSize: '18px',
  },
  logo: {
    width: '30px',
    height: '30px',
    margin: '0 8px 0 0',
  },
  authentication: {
  },
});

function Navigation(props) {
  const flow = useFlow();

  return (
    <nav
      className={css(styles.Navigation)}
    >
      <div className={css(styles.container)}>
        <div className={css(styles.title)}>
          <img
            className={css(styles.logo)}
            src="/assets/images/decentology-logo-mark-circle.png"
          />
          Client
        </div>
        {flow.isInitialized &&
          <Authentication />
        }
      </div>
    </nav>
  );
}

export default Navigation;