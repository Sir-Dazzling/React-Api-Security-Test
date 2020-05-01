import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { userActions } from '../../redux/user/UserActions';

const TopNavBar= ({currentUser}) => (
    <div className="header">
        <Link to="/" className="logo-container alert">
            <h1 className="logo">Denvato</h1>
        </Link>
        <div className="options">
            <Link to="/" className="option">
                HOME
            </Link>
            <Link to="/shop" className="option">
                SHOP
            </Link>
            <Link to="/contact" className="option">
                CONTACT
            </Link>
            {
                //To check if user is currently signed in and display conditionally sign in or sign out. 
                currentUser ? (
                    <div className="option" onClick={() => {}}>SIGN OUT</div>
                )
                : (
                    <Link to="/signin" className="option">SIGN IN</Link>
                )
            }
        </div>
    </div>
);



function mapStateToProps(state) 
{
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedSignUpPage = connect(mapStateToProps)(SignUpPage);
export { connectedSignUpPage as SignUpPage };

export default connect(mapStateToProps)(TopNavBar);