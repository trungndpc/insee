import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { SideBar } from '../../../components/layout/SideBar'
import {GiftStatus} from '../../../components/enum/GiftStatus'
import Location from '../../../data/Location'


class GiftHistory extends React.Component {


    componentDidMount() {
        this.props.appActions.getHistoryGift()
    }

    render() {
        const gifts = this.props.app.gifts;
        console.log(gifts)
        return (
            <WebAppLayout {...this.props}>
                <section>
                    <div className="gap gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row merged20" id="page-contents">
                                        <div className="col-lg-3">
                                            <SideBar />
                                        </div>
                                        {gifts && gifts.length == 0 && <div className="empty-container"><p>Bạn chưa tham gia chương trình nào</p></div>} 
                                        <div style={{ padding: 0 }} className="col-lg-9">
                                            {gifts && gifts.map((item, index) => {
                                                let nameConstruction = item.construction.address + ' - ' + Location.getName(item.construction.city)
                                                return (
                                                    <div key={index} className="history-promotion">
                                                        <h4 className="title">{item.promotion.title}</h4>
                                                        <div className="content">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Công trình</th>
                                                                        <td>{nameConstruction}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Quà tặng</th>
                                                                        <td>{item.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Trạng thái</th>
                                                                        <td style={{color: `${GiftStatus.getColor(item.status)}`}}>{GiftStatus.getName(item.status)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </WebAppLayout>
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
)(GiftHistory)
