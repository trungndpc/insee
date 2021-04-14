import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import { RECEIVED, GiftStatus, WAITING_RECEIVE } from '../../components/enum/GiftStatus'
import FormLayout from '../../components/layout/FormLayout'
import LuckyRotationGift from '../../components/enum/LuckyRotationGift'

class LuckyRotation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
            nameGift : null
        }
        this.showNameGift = this.showNameGift.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getCustomer();
        this.props.appActions.getGiftById(this.props.giftId);
        this.roll()
    }

    showNameGift(deg) {
        let name  = LuckyRotationGift.getNameGift(deg);
        this.setState({nameGift: name})
    }

    roll() {
        const wheel = document.querySelector('.wheel');
        const startButton = document.querySelector('.btn-roll');
        let deg = 0;

        startButton.addEventListener('click', () => {
            startButton.style.pointerEvents = 'none';
            var rd  = Math.random() * 5000;
            deg = Math.floor(rd + 10000);
            wheel.style.transition = 'all 10s ease-out';
            wheel.style.transform = `rotate(${deg}deg)`;
            wheel.classList.add('blur');
        });

        wheel.addEventListener('transitionend', () => {
            wheel.classList.remove('blur');
            startButton.style.pointerEvents = 'auto';
            wheel.style.transition = 'none';
            const actualDeg = deg % 360;
            this.showNameGift(actualDeg)
            wheel.style.transform = `rotate(${actualDeg}deg)`;
        });
    }


    render() {
        const gift = this.props.app.gift;
        const contractor = this.props.app.customer;
        const status = gift && GiftStatus.findByStatus(gift.status)
        return (
            <FormLayout {...this.props}>
                <div className="cm-title">
                    <h3>CHÚC MỪNG</h3>
                    {!this.state.nameGift ? 
                    <p>Anh đã nhận được 1 lượt quay vòng quay may mắn</p>
                    :
                    <p>Anh đã nhận được <b>{this.state.nameGift}</b></p>
                    }
                </div>
                <div className="lr-content">
                    <img className="wheel" src={require('../../resources/images/wheel.png')} />
                    <img className="marker" src={require('../../resources/images/marker.png')} />
                </div>
                <div className="btn-container btn-roll-container">
                    <button style={{ width: 'auto' }} className="btn-insee btn-insee-bg btn-roll">Quay</button>
                </div>
            </FormLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LuckyRotation)


