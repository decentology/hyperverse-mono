import * as PropTypes from 'prop-types';
import './button.css';
import { useNFT } from '../source';

export const GetBalance = ({ tenantId, account, ...props }) => {
	const { getBalance } = useNFT();
    const { balance } = getBalance(tenantId, account);

	return (
        <div className="Balance">
            Balance: <b>{balance}</b>
        </div>
);
};

GetBalance.propTypes = {
    tenantId: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired
};
