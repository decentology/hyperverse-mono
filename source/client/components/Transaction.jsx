import React, {useEffect, useState} from 'react';
import * as fcl from '@onflow/fcl';
import {StyleSheet, css} from 'aphrodite/no-important';

import {colors} from '../../utilities';

const constants = {
  statuses: [
    {
      title: 'unknown',
      code: 0,
      color: colors.grey['400']
    },
    {
      title: 'pending',
      code: 1,
      color: colors.purple['a400']
    },
    {
      title: 'finalized',
      code: 2,
      color: colors.lightBlue['a400']
    },
    {
      title: 'executed',
      code: 3,
      color: colors.teal['a400']
    },
    {
      title: 'sealed',
      code: 4,
      color: colors.green['a400']
    },
    {
      title: 'expired',
      code: 5,
      color: colors.red['a400']
    },
  ]
};

function findStatus(code) {
  return constants.statuses.find((candidate) => candidate.code === code);
}

const styles = StyleSheet.create({
  status: {
    position: 'relative',
    overflow: 'hidden',
  },
  statusBackground: {
    position: 'absolute',
    left: '0%',
    width: '100%',
    height: '100%',
  },
  statusTitle: {
    zIndex: '10',
  }
});

function Transaction(props) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fcl.tx(props.id).subscribe((message) => {
      setStatus(
        findStatus(message.status)
      );
    });
  }, [props.id]);

  return (
    <div className="tags has-addons are-medium">
      <span className="tag">{props.id}</span>
      {status === null &&
        <span className="tag" style={{backgroundColor: colors.grey[50]}}>
          fetching...
        </span>
      }
      {status &&
        <span
          className={[
            'tag',
            css(styles.status)
          ].join(' ')}
          style={{
            backgroundColor: status.color,
            color: 'white'
          }}
        >
          {status.title}
        </span>
      }
    </div>
  );
}

export default Transaction;