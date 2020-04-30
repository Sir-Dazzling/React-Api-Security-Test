import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/History';
import { alertActions } from './redux/alert/AlertActions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';

class App extends React.Component 
{
    constructor(props) 
    {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => 
        {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) 
{
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);