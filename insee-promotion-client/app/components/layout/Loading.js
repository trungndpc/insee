import React, { Component } from 'react'

class Loading extends Component {

    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.app.isLoading != nextProps.app.isLoading) {
            return true;
        }
        return false;
    }

    render() {
        if (this.props.app.isLoading) {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
            return (
                <div className="insee-app">
                    <div className="bg-loading"></div>
                    <img className="img-loading" src={require('../../resources/images/loading.gif')} />
                </div>
            )
        } else {
            return <div></div>
        }

    }
}

export default Loading
