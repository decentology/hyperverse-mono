import React, {useEffect, useState, useContext, useReducer} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import classNames from 'classnames';

import {useFlow} from '../../packages/hyperverse';
import {useSimpleNFT} from '../../packages/hyperverse-simple-nft';

import Page from '../components/Page.jsx';
import Transaction from '../components/Transaction.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'startWaiting': {
      return {
        ...state,
        isWaiting: true
      };
    }
    case 'stopWaiting': {
      return {
        ...state,
        isWaiting: false
      };
    }
    default:
      return state;
  }
}

function SimpleNFT(props) {
  const flow = useFlow();
  const simpleNFT = useSimpleNFT();
  const [state, dispatch] = useReducer(reducer, {
    isWaiting: false
  });
  const [name, setName] = useState(null);
  const [NFTs, setNFTs] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [isWaiting, setIsWaiting] = useState(null);

  const [recipient, setRecipient] = useState(null);
  const [NFTID, setNFTID] = useState(null);

  const onCreatePackage = async () => {
    const transactionID = await simpleNFT.package.create();
    console.log(transactionID);
  };
  const onRemovePackage = async () => {
    const transactionID = await simpleNFT.removePackage();
    console.log(transactionID);
  };
  const onGetInstance = async () => {
    const transactionID = await simpleNFT.getInstance();
    console.log(transactionID);
  };

  const onMint = async () => {
    dispatch({type: 'startWaiting'});
    const transactionID = await simpleNFT.mintNFT(flow.state.user?.addr, name);
    dispatch({type: 'stopWaiting'});
    setTransaction(transactionID);
  };

  const onTransfer = async () => {
    dispatch({type: 'startWaiting'});
    const transactionID = await simpleNFT.transferNFT(recipient, NFTID);
    dispatch({type: 'stopWaiting'});
    setTransaction(transactionID);
  };

  const loadNFTs = async () => {
    const nextNFTs = [];
    const IDs = await simpleNFT.getNFTIDs(flow.state.user.addr);
    for (const ID of IDs) {
      const metadata = await simpleNFT.getNFTMetadata(flow.state.user.addr, ID);
      nextNFTs.push({
        ID,
        metadata
      });
    }

    setNFTs(nextNFTs.sort((a, b) => a.ID - b.ID));
  };

  const queryPackage = async () => {
    console.log(flow.state.user);
    const result = await simpleNFT.package.query(flow.state.user.addr);
    console.log(result);
  };
  
  useEffect(() => {
    if (flow.state.user && flow.state.user.loggedIn) {
      // loadNFTs();
      queryPackage();
    }
  }, [flow.state.user]);

  return (
    <Page>
      <section className="section">
        <h3 className="title">NFTs</h3>
        {flow.state.user && flow.state.user.loggedIn &&
          <table className="table is-bordered is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {NFTs && NFTs.map((NFT) => {
                return (
                  <tr key={NFT.ID}>
                    <td>{NFT.ID}</td>
                    <td>{NFT.metadata.name}</td>
                  </tr>
                );
              })}
              {!NFTs &&
                <tr>
                  <td colSpan={2}>Loading...</td>
                </tr>
              }
            </tbody>
          </table>
        }
        <h3 className="title">Mint NFT</h3>
        {transaction &&
          <Transaction id={transaction} />
        }
        <div className="block">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={name || ''}
                onChange={(event) => setName(event.target.value)}
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
                onClick={onMint}
              >
                Mint
              </button>
            </div>
          </div>
        </div>

        <h3 className="title">Transfer NFT</h3>
        <div className="block">
          <div className="field">
            <label className="label">Recipient</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Recipient"
                value={recipient || ''}
                onChange={(event) => setRecipient(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NFT ID</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="ID"
                value={NFTID || ''}
                onChange={(event) => setNFTID(event.target.value)}
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
                onClick={onTransfer}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>

        <h3 className="title">Admin</h3>
        <div className="block">
          <div className="field">
            <div className="control">
              <div className="buttons">
                <button
                  className={classNames({
                    'button': true,
                    'is-primary': true
                  })}
                  onClick={onCreatePackage}
                >
                  Create Package
                </button>
                <button
                  className={classNames({
                    'button': true,
                    'is-danger': true
                  })}
                  onClick={onRemovePackage}
                >
                  Remove Package
                </button>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className={classNames({
                  'button': true,
                  'is-primary': true
                })}
                onClick={onGetInstance}
              >
                Create Instance
              </button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default SimpleNFT;