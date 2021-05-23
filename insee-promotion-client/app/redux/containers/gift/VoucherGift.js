import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import { RECEIVED, GiftStatus, WAITING_RECEIVE } from '../../../components/enum/GiftStatus'
import { NetworkCardPhoneEnum, VIETEL_CARD, VINAPHONE_CARD} from '../../../components/enum/NetworkCardPhoneEnum'

class VoucherGift extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
        }
        this.show = this.show.bind(this)
    }

    show() {
        this.props.appActions.receivedGift(this.props.giftId)
    }

    render() {
        const gift = this.props.app.gift;
        const contractor = this.props.app.customer;
        const status = gift && GiftStatus.findByStatus(gift.status)
        return (
            <div>
                <div className="cm-title">
                    <h3>CHÚC MỪNG <br /> Anh {contractor && contractor.fullName}</h3>
                </div>
                <div className="cm-desc">
                    <p>Chúc mừng anh đã nhận được phần thưởng <span>{gift && gift.name}</span></p>
                </div>
                <div style={{paddingTop: '20px'}} className="cards">
                    <img style={{height: '250px'}} src="https://dotb.vn/wp-content/uploads/2020/12/6658860_preview.png"/>
                </div>
                {status && status == WAITING_RECEIVE &&
                    <div style={{marginTop: '30px'}} className="cm-content">
                        <p>Vui lần nhấn nút đã nhận để xác nhận đã nhận quà tặng</p>
                        <div className="btn-container">
                            <div style={{ width: '170px', display: 'inline-block', textAlign: 'center' }}>
                                <button onClick={this.show} className="btn-insee btn-insee-bg">Đã nhận</button>
                            </div>
                        </div>
                    </div>
                }
                <p style={{ textAlign: 'center' }}>Lưu ý: Chỉ bấm xác nhận khi đã nhận voucher. Mọi thắc mắc xin liên hệ hotline 1800 1718.</p>
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
)(VoucherGift)



class PhoneCard extends React.Component {
    constructor(props) {
        super(props)
        this.getImage = this.getImage.bind(this)
        this.copy = this.copy.bind(this)
    }

    getImage() {
        let network = NetworkCardPhoneEnum.findById(this.props.network);
        if (network == VINAPHONE_CARD) {
            return require('../../../resources/images/vinaphone.png');
        } else if (network == VIETEL_CARD) {
            return require('../../../resources/images/vietel.png');
        } else {
            return require('../../../resources/images/mobi.png');
        }
    }

    copy() {
        var copyText = document.getElementById("code_" + this.props.index);
        var tooltip = document.getElementById("tooltip_" + this.props.index);
        tooltip.style.display = "none";
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        tooltip.style.display = "block";

        setTimeout(function () {
            let value = encodeURIComponent('*100*' + this.props.code + '#')
            window.open('tel:' + value, '_system');
        }.bind(this), 1000)
    }

    render() {
        return (
            <div className="card-item">
                <img src={this.getImage()} />
                <ul>
                    <li onClick={this.copy}>
                        <span className="tooltiptext" id={"tooltip_" + this.props.index}>Đã copy</span>
                        <span>Mã nạp thẻ: </span>
                        <span> <input id={'code_' + this.props.index} className="code-cardphone" readOnly="readonly" value={this.props.code} /></span>
                    </li>

                </ul>
            </div>
        )
    }
}