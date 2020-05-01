import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../redux/user/UserActions';

class HomePage extends React.Component 
{
    componentDidMount() 
    {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user } = this.props;

        if(user)
        {
            return (
            <div>
                <div className="jumbotron text-center mt-5">
                    <h1>Hi {user.username}!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <p>Roles: {user.roles}</p>
                    <p>
                        <a href="/login" onClick = {userActions.logout}>Logout</a>
                    </p>
                </div>
            </div>
            );
        }
        else
        {
            return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Hi Guest!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <p>Roles: </p>
                    <p>
                        <a href="/login">Login</a>
                    </p>
                </div>
            </div>
            );
        }
        
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };