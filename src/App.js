import React from 'react';
import { Router, Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/History';
import { alertActions } from './redux/alert/AlertActions';
import { userActions } from './redux/user/UserActions';


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

        this.state = {
            showContentManagerBoard: false,
            showAdminBoard: false,
            currentUser: undefined
          };

    }

    componentDidMount() 
    {
        this.props.dispatch(userActions.getAll());
        const {user}  = this.props;
        
        if(user)
        {
            console.log(user.username);
            this.setState({
                currentUser: user,
                showContentManagerBoard: user.roles.includes("ROLE_CONTENT_MANAGER"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            })
        }
    }

    render() 
    {
       const {currentUser, showContentManagerBoard, showAdminBoard} = this.state;

        return(
         <Router history = {history}>
            <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                DazzlingStar
                </Link>
                <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                    Home
                    </Link>
                </li>

                {showContentManagerBoard && (
                    <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                        Content Manager Hub
                    </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                        Admin Hub
                    </Link>
                    </li>
                )}

                </div>

                {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                    </Link>
                    </li>
                    <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={userActions.logout}>
                        LogOut
                    </a>
                    </li>
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                    </li>

                    <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Sign Up
                    </Link>
                    </li>
                </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                <Route exact path={["/", "/home"]} component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                </Switch>
            </div>
            </div>
      </Router>
        );
        
    }
}

function mapStateToProps(state) 
{
    const { alert } = state;
    const { authentication } = state;
    const { user } = authentication;
    return {
        alert,
        user
    };
}

export default connect(mapStateToProps)(App);