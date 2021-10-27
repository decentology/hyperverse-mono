import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import classNames from 'classnames';

import {useFlow} from '../../packages/hyperverse';
import {useSimpleNFT} from '../../packages/hyperverse-simple-nft';

import Page from '../components/Page.jsx';
import Transaction from '../components/Transaction.jsx';

const styles = StyleSheet.create({
});

function SimpleNFT(props) {
  const flow = useFlow();
  const simpleNFT = useSimpleNFT();
  const [name, setName] = useState(null);
  const [NFTs, setNFTs] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [isWaiting, setIsWaiting] = useState(null);

  const onGetPackage = async () => {
    const transactionID = await simpleNFT.getPackage();
    console.log(transactionID);
  };
  const onGetInstance = async () => {
    const transactionID = await simpleNFT.getInstance();
    console.log(transactionID);
  };

  const onMint = async () => {
    setIsWaiting(true);
    const transactionID = await simpleNFT.mintNFT(flow.state.user?.addr, name);
    setIsWaiting(false);
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

    setNFTs(nextNFTs);
  };
  
  useEffect(() => {
    if (flow.state.user && flow.state.user.loggedIn) {
      loadNFTs();
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
        {flow.state.user && flow.state.user.loggedIn &&
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
        }

        <h3 className="title">Admin</h3>
        <div className="block">
          <div className="field">
            <div className="control">
              <button
                className={classNames({
                  'button': true,
                  'is-primary': true
                })}
                onClick={onGetPackage}
              >
                Get Package
              </button>
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
                Get Instance
              </button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default SimpleNFT;