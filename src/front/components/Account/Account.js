import React from 'react';
import { connect } from 'react-redux';
import { bind } from '../../utils/reactness';

import api from '../../api';

class Account extends React.Component {

    constructor() {
        super();
        bind(this, [
            'handleSignup',
            'handleAuth',
            'handleLogout'
        ]);
    }

    handleSignup() {
        this.props.signup({
            username: 'john',
            password: 'doe123'
        });
    }

    handleAuth() {
        this.props.auth({
            username: 'john',
            password: 'doe123'
        });
    }

    handleLogout() {
        //this.props.logout();
    }

    render() {
        return (
            <div>
                <h1>Account</h1>
                <button onClick={this.handleSignup}>signup</button>
                <button onClick={this.handleAuth}>auth</button>
                <button onClick={this.handleLogout}>logout</button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        //comments: state.comments.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (data) => dispatch(api.actions.signup.sync({}, toBody(data))),
        auth: (data) => dispatch(api.actions.auth.sync({}, toBody(data))),
        //logout: () => dispatch(logoutUser)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);