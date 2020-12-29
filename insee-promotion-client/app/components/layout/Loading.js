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
            return (
                <div className="insee-app">
                    <div className="bg-loading"></div>
                    <img className="img-loading" src={require('../../resources/images/loading.gif')} />
                </div>
            )
        }else {
            return <div></div>
        }
        
    }
}

export default Loading
