import React from 'react';
import { connect } from 'react-redux';
import { bind } from '../../utils/reactness';
import toBody from '../../utils/toBody';

import api from '../../api';

class Account extends React.Component {

    constructor() {
        super();
        bind(this, [
            'handleSignup'
        ]);
    }

    handleSignup() {
        this.props.signup({
            name: 'john',
            email: 'john@gmail.com',
            password: 'doe123'
        });
    }

    render() {
        return (
            <div>
                <h1>Account</h1>
                <button onClick={this.handleSignup}>signup</button>
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
        signup: (data) => dispatch(api.actions.signup.sync({}, toBody(data)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);