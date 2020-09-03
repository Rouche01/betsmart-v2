import React from 'react';
import { navigate } from '@reach/router';
import { isLoggedIn } from '../utils/auth';


class PrivateRoute extends React.Component {
    render() {
        const { component: Component, location, ...rest } = this.props;
        if(!isLoggedIn())  {
            navigate(`/login`)
            return null;
        }
        return <Component {...rest} />
    }
}


export default PrivateRoute