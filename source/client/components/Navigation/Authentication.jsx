import React, {useContext, useState} from 'react';
import classNames from 'classnames';
import {StyleSheet, css} from 'aphrodite/no-important';

import {useHyperverse, useFlow} from '../../../packages/hyperverse';

import {Icon} from '../../components/Icons';

import {colors} from '../../../utilities/index.js';

const constants = {
  flowscan: {
    testnet: `https://testnet.flowscan.org/account/`,
    mainnet: `https://flowscan.org/account/`
  }
};

const styles = StyleSheet.create({
  Authentication: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    margin: '0 16px 0 4px',
    fontSize: '12px',
  },
  action: {}
});

function Authentication(props) {
  const hyperverse = useHyperverse();
  const flow = useFlow();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = flow.isInitialized && flow.state.user.loggedIn;

  const onAuthenticate = async () => {
    setIsLoading(true);
    await flow.authenticate();
    setIsLoading(false);
  };
  const onUnauthenticate = async () => {
    setIsLoading(true);
    await flow.unauthenticate();
    setIsLoading(false);
  };

  return (
    <div className={css(styles.Authentication)}>
      {isAuthenticated &&
        <div className={css(styles.user)}>
          <Icon name="Person" color={colors.cyan[400]} />
          <span className={css(styles.address)}>
            <a
              href={`${hyperverse.network === 'Mainnet' ? constants.flowscan.mainnet : constants.flowscan.testnet}${flow.state.user.addr}`}
              target="_blank"
            >
              {flow.state.user.addr}
            </a>
          </span>
        </div>
      }
      <div className={css(styles.action)}>
        <button
          className={classNames({
            'button': true,
            'is-small': true,
            'is-rounded': true,
            'is-primary': !isAuthenticated,
            'is-loading': isLoading
          })}
          onClick={
            isAuthenticated ?
            onUnauthenticate :
            onAuthenticate
          }
        >
          {isAuthenticated ? 'Unauthenticate' : 'Authenticate'}
        </button>
      </div>
    </div>
  );
}

export default Authentication;