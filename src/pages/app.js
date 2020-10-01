import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../component/PrivateRoute';
import TipDashboard from '../component/tip-dashboard';
import AdminDashboard from '../component/adminDashboard/adminDashboard';


const App = () => {
    return (
        <Router>
            <PrivateRoute path="/app/dashboard" component={TipDashboard} />
            <PrivateRoute path="app/admin-dashboard" component={AdminDashboard} />
        </Router>
    );
}

export default App;