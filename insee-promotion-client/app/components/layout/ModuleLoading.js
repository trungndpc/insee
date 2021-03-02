import React, { Component } from 'react'

class ModuleLoading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="insee-app">
                <div className="bg-loading"></div>
                <img className="img-loading" src={require('../../resources/images/loading.gif')} />
            </div>
        )
    }
}

export default ModuleLoading
