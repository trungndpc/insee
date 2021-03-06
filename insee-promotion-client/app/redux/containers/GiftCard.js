import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import { RECEIVED, GiftStatus, WAITING_RECEIVE } from '../../components/enum/GiftStatus'
import FormLayout from '../../components/layout/FormLayout'
import { NetworkCardPhoneEnum, VIETEL_CARD, VINAPHONE_CARD, MOBILE_PHONE } from '../../components/enum/NetworkCardPhoneEnum'

class GiftCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMsg: null,
        }
        this.show = this.show.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getCustomer();
        this.props.appActions.getGiftById(this.props.giftId);
    }

    show() {
        this.props.appActions.receivedGift(this.props.giftId)
    }

    render() {
        const gift = this.props.app.gift;
        const contractor = this.props.app.customer;
        const status = gift && GiftStatus.findByStatus(gift.status)
        console.log(status)
        return (
            <FormLayout {...this.props}>
                <div className="cm-title">
                    <h3>CHÚC MỪNG <br /> Anh {contractor && contractor.fullName}</h3>
                </div>
                <div className="cm-desc">
                    <p>Chúc mừng anh đã nhận được phần thưởng <span>{gift && gift.name}</span></p>
                </div>
                {status && status == WAITING_RECEIVE &&
                    <div className="cm-content">
                        <p>Vui lần nhấn nút xác nhận bên dưới để nhận</p>
                        <div className="btn-container">
                            <div style={{ width: '170px', display: 'inline-block', textAlign: 'center' }}>
                                <button onClick={this.show} className="btn-insee btn-insee-bg">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                }
                {status && status == RECEIVED &&
                    <div className="cards">
                        {gift.cards.map((item, index) => {
                            return <PhoneCard key={index} index={index} network={item.network} seri={item.seri} code={item.code} />
                        })}
                    </div>
                }
                {status && status == RECEIVED && 
                <p style={{padding: '20px 40px'}}>***Hướng dẫn: Sử dụng bàn phím di động bấm: *100* (mã nạp thẻ) # OK</p>
                }
                <div className="cm-note">
                    Lưu ý:
                    <p>
                        Phẩn thưởng chỉ có giá trị sử dụng 1 lần, nhà thầu nên sử dụng ngay và không chia sẻ với người khác.
                    </p>
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
)(GiftCard)



class PhoneCard extends React.Component {
    constructor(props) {
        super(props)
        this.getImage = this.getImage.bind(this)
        this.copy = this.copy.bind(this)
    }

    getImage() {
        let network = NetworkCardPhoneEnum.findById(this.props.network);
        if (network == VINAPHONE_CARD) {
            return require('../../resources/images/vinaphone.png');
        } else if (network == VIETEL_CARD) {
            return require('../../resources/images/vietel.png');
        } else {
            return require('../../resources/images/mobi.png');
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

        setTimeout(function() {
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