import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { GiftStatus, ROLLED, WAITING_RECEIVE } from '../../../components/enum/GiftStatus'
import LuckyRotationGift from '../../../components/enum/LuckyRotationGift'
import GiftModel from '../../../model/GiftModel'

class LuckyRotation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
            nameGift: null
        }
        this.showNameGift = this.showNameGift.bind(this)
        this.startRoll = this.startRoll.bind(this);
        this.endRoll = this.endRoll.bind(this)
        this.rolled = this.rolled.bind(this)
    }


    showNameGift(deg) {
        let name = LuckyRotationGift.getNameGift(deg);
        this.setState({ nameGift: name })
    }

    startRoll() {
        const gift = this.props.app.gift;
        if (gift) {
            const wheel = document.querySelector('.wheel');
            const startButton = document.querySelector('.btn-roll');
            startButton.style.pointerEvents = 'none';
            const deg = Math.floor(gift.rotation.excepted + (360 * 15));
            wheel.style.transition = 'all 5s ease-out';
            wheel.style.transform = `rotate(${deg}deg)`;
            wheel.classList.add('blur');

            wheel.addEventListener('transitionend', () => {
                this.endRoll()
            });

        }
    }

    endRoll() {
        const gift = this.props.app.gift;
        const wheel = document.querySelector('.wheel');
        wheel.classList.remove('blur');
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${gift.rotation.excepted}deg)`;
        this.showNameGift(gift.rotation.excepted)
        this.rolled(gift.rotation.excepted)
    }

    rolled(deg) {
        const gift = this.props.app.gift;
        GiftModel.rolledGiftById(gift.id, deg)
            .then(resp => {
                this.props.appActions.getGiftById(gift.id);
            })
            .catch(err => {

            })
    }



    render() {
        const gift = this.props.app.gift;
        const status = gift && GiftStatus.findByStatus(gift.status)
        return (
            <div>
                <div className="cm-title">
                    <h3>CHÚC MỪNG</h3>
                    {status ==  WAITING_RECEIVE && <p>Anh đã nhận được 1 lượt quay vòng quay may mắn</p>}
                    {status == ROLLED && <p>Anh đã nhận được <b>{LuckyRotationGift.getNameGift(gift.rotation.rs)}</b></p>}
                </div>
                <div className="lr-content">
                    {status == ROLLED &&
                        <img style={{ transform: `rotate(${gift ? gift.rotation.excepted : 0}deg)` }} className="wheel" src={require('../../../resources/images/wheel.png')} />
                    }
                    {status == WAITING_RECEIVE &&
                        <img className="wheel" src={require('../../../resources/images/wheel.png')} />
                    }
                    <img className="marker" src={require('../../../resources/images/marker.png')} />
                </div>
                {status == WAITING_RECEIVE &&
                    <div className="btn-container btn-roll-container">
                        <button onClick={this.startRoll} style={{ width: 'auto' }} className="btn-insee btn-insee-bg btn-roll">Quay</button>
                    </div>
                }
            </div>
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


