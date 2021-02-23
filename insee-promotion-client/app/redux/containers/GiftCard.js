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
                            return <ViettelCard key={index} index={index} network={item.network} seri={item.seri} code={item.code} />
                        })}
                    </div>
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



class ViettelCard extends React.Component {
    constructor(props) {
        super(props)
        this.onClickCopy = this.onClickCopy.bind(this)
        this.getImage = this.getImage.bind(this)
    }


    onClickCopy() {
        var elm = document.getElementById("cpcode" + this.props.index);
        // for Internet Explorer
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(elm);
            range.select();
            document.execCommand("Copy");
        }
        else if (window.getSelection) {
            // other browsers
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(elm);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("Copy");
        }
    }


    getImage() {
        let network = NetworkCardPhoneEnum.findById(this.props.network);
        if (network == VINAPHONE_CARD) {
            return "https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/vina-bg.jpg";
        } else if (network == VIETEL_CARD) {
            return "https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/vietel-bg.png";
        } else {
            return "https://insee-promotion-vn.s3.us-east-2.amazonaws.com/static/images/mobi-bg.jpg";
        }
    }

    render() {
        return (
            <div onClick={this.onClickCopy} className="card-item">
                <img src={this.getImage()} />
                <ul>
                    <li>
                        <span className="idam">Seri: </span>
                        <span>{this.props.seri}</span>
                    </li>
                    <li>
                        <span className="idam">Code: </span>
                        <span id={'cpcode' + this.props.index}>{this.props.seri}</span>
                    </li>

                </ul>
            </div>
        )
    }
}