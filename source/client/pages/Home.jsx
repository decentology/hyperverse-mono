import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import classNames from 'classnames';

import {useFlow} from '../../packages/hyperverse';

import Page from '../components/Page.jsx';
import Transaction from '../components/Transaction.jsx';

const styles = StyleSheet.create({
});

function Home(props) {
  const flow = useFlow();
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [isWaiting, setIsWaiting] = useState(null);

  const onSend = async () => {
    setIsWaiting(true);
    const transactionId = await flow.sendFlow(recipient, amount);
    setIsWaiting(false);
    setTransaction(transactionId);
  };
  
  useEffect(() => {
    if (flow.state.user && flow.state.user.loggedIn) {
      flow.updateBalance();
    }
  }, [flow.state.user]);

  return (
    <Page>
      <section className="section">
        <h3 className="title">Account</h3>
        {flow.state.user && flow.state.user.loggedIn &&
          <table className="table is-bordered is-striped">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Address</td>
                <td>{flow.state.user?.addr}</td>
              </tr>
              <tr>
                <td>FLOW Balance</td>
                <td>{flow.state.balance}</td>
              </tr>
            </tbody>
          </table>
        }
        <h3 className="title">Transfer FLOW</h3>
        {transaction &&
          <Transaction id={transaction} />
        }
        {flow.state.user && flow.state.user.loggedIn &&
          <div className="block">
            <div className="field">
              <label className="label">Recipient</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Address"
                  value={recipient || ''}
                  onChange={(event) => setRecipient(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Amount</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Amount"
                  value={amount || ''}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className={classNames({
                    'button': true,
                    'is-primary': true,
                    'is-loading': isWaiting
                  })}
                  onClick={onSend}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        }
      </section>
    </Page>
  );
}

export default Home;