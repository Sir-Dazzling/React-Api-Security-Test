import React from 'react';
import { Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/History';
import { alertActions } from './redux/alert/AlertActions';
import { userActions } from './redux/user/UserActions';

import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import ContentManagerHubPage from './pages/ContentManagerHubPage/ContentManagerHubPage';

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
            <nav className="navbar  navbar-expand-md navbar-dark bg-info">
                <Link to={"/"} className="navbar-brand">
                DazzlingStar
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className = "collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                            Home
                            </Link>
                        </li>

                        {(showAdminBoard || showContentManagerBoard ) && (
                            <li className="nav-item">
                            <Link to={"/content_manager_hub"} className="nav-link">
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

                </ul>
            

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
                </div>
            </nav>
            
            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={HomePage} />
                    <Route exact path="/login" render={() => this.props.user? (<Redirect to="/" />) : (<LoginPage />) } />
                    <Route exact path="/content_manager_hub" render={() => !this.props.user? (<Redirect to="/login" />) : (<ContentManagerHubPage />) }/>
                </Switch>
            </div>
      </Router>
        );
        
    }
}

function mapStateToProps(state) 
{

    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);