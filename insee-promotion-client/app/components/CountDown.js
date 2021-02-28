import React, { Component } from 'react'

class CountDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count : this.props.count
        }
        this.countdown = this.countdown.bind(this);
        this.done = this.done.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        if (this.state.count > 0) {
            this.countdown();
        }
    }

    reset() {
        this.setState({
            count: this.props.count
        })
    }

    countdown() {
        var x = setInterval(function(){
            let count = this.state.count - 1;
            this.setState({
                count: count
            })
            if (count <= 0) {
                clearInterval(x);
                this.props.done()
            }
        }.bind(this), 1000);
    }

    toCountString(count) {
        let rs = "";
        let m = parseInt(count / 60);
        if (m > 0) {
            rs = rs + m + " phút "
        }
        let s = count - m*60;
        if (s > 0) {
            rs = rs + s + " giây"
        }
        return rs;
    }

    done() {
        this.props.done && this.props.done();
    }


    render() {
        return (
            <span style={{color: '#b71c1c', fontWeight: '600'}}>{this.toCountString(this.state.count)}</span>
        )
    }
}

export default CountDown
