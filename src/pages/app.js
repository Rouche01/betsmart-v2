import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../component/PrivateRoute';
import TipDashboard from '../component/tip-dashboard';


const App = () => {
    return (
        <Router>
            <PrivateRoute path="/app/dashboard" component={TipDashboard} />
        </Router>
    );
}

export default App;