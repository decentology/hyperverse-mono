import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useFlow } from '@decentology/hyperverse-flow/source';

export const CreateTenant = ({ ...props }) => {
	const { createTenant } = useTribes();
	const { user, loggedIn } = useFlow();
    const newTenant = createTenant();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				console.log('Calling mutate');
				if (user) {
                    // if user is logged in
                    // is initilized is set to true
				} else {
					// otherwise initialized is set
                    // to false and user needs to connect
                }
			}}
		>
			{user ? 'New Instance' : 'Connect'}
		</button>
	);
};

CreateTenant.propTypes = {
};

CreateTenant.defaultProps = {};
