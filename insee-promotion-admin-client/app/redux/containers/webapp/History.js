import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'
import { GiftStatus } from '../../../components/enum/GiftStatus'
import DateTimeUtil from '../../../utils/DateTimeUtil'


class History extends React.Component {


    componentDidMount() {
        this.props.appActions.getHistoryGift();
    }

    render() {
        const historyGift = this.props.app.historyGift;
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
                                        <div className="col-lg-9">
                                            <div className="loadMore">
                                                <div className="m-content">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-12 ">
                                                            <table className="table">
                                                                <thead className=" insee-color">
                                                                    <tr className="insee-color">
                                                                        <th scope="col">STT</th>
                                                                        <th scope="col">Chương trình</th>
                                                                        <th scope="col">Quà tặng</th>
                                                                        <th scope="col">Nhà thầu</th>
                                                                        <th scope="col">Tình trạng</th>
                                                                        <th scope="col">Thời gian gửi</th>
                                                                        <th scope="col">Thời gian nhận</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {historyGift && historyGift.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <th scope="row">{index + 1}</th>
                                                                                <td>{item.promotion.title}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.customer.fullName}</td>
                                                                                <td>{GiftStatus.getName(item.status)}</td>
                                                                                <td>{DateTimeUtil.diffTime(item.createdTime)}</td>
                                                                                <td>{item.status == 2 && DateTimeUtil.diffTime(item.updatedTime)}</td>
                                                                            </tr>
                                                                        )
                                                                    })}


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
)(History)
