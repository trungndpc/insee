import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import * as appActions from '../../actions/app'
import Loading from '../../../components/layout/Loading'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import MatchModel from '../../../model/MatchModel'
import PromotionModel from '../../../model/PromotionModel'
import PredictModel from '../../../model/PredictModel'
import { City } from '../../../data/Location';
import { MatchStatus, DONE } from '../../../components/enum/MatchStatus'
import DateTimeUtil from '../../../utils/DateTimeUtil'

class PredictFootbalPromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            matches: null
        }
        this.loadData = this.loadData.bind(this)
        this.onClickJoin = this.onClickJoin.bind(this)
        this.getLeaderBoard = this.getLeaderBoard.bind(this)

    }

    componentDidMount() {
        this.loadData();
        this.getLeaderBoard()
    }

    loadData() {
        PromotionModel.get(this.props.promotionId)
            .then(resp => {
                if (resp.data) {
                    MatchModel.find(resp.data.season)
                        .then(resp => {
                            if (resp.error == 0) {
                                this.setState({ matches: resp.data })
                            }
                        })
                }
            })

    }

    getLeaderBoard() {
        PredictModel.leaderboard(this.props.promotionId)
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({ leaderboard: resp.data })
                }
            })
    }

    onClickJoin(matchId) {
        MatchModel.join(this.props.promotionId, matchId)
            .then(resp => {
                if (resp.error == 0) {
                    let link = "https://zalo.me/" + resp.data;
                    console.log(link)
                    window.location.href = link;
                }
            })
    }


    render() {
        const matches = this.state.matches;
        const leaderboard = this.state.leaderboard;
        let isKg = window.location.pathname.includes('/du-doan-ket-qua-bong-da/kq');
        return (
            <div>
                <WebAppLayout {...this.props}>
                    <section>
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 retailers-rs football">
                                        <div className="row merged20">
                                            <div className="loadMore">
                                                {this.props.promotionId == 1022 && 
                                                <div>
                                                    <ul className="sub-menu">
                                                        <li className={`${!isKg && 'active'}`}><Link to={`/khuyen-mai/${this.props.promotionId}/du-doan-ket-qua-bong-da`}>Lịch thi đấu</Link></li>
                                                        <li className={`${isKg && 'active'}`}><Link to={`/khuyen-mai/${this.props.promotionId}/du-doan-ket-qua-bong-da/kq`}>DS trúng thưởng</Link></li>
                                                    </ul>
                                                </div>
                                                }
                                                <div className="m-content">
                                                    <Switch>
                                                        <Route path="/khuyen-mai/:promotionId/du-doan-ket-qua-bong-da/kq">
                                                            <div className="leadboard">
                                                                <div className="banner">
                                                                    <img src={require('../../../resources/images/euro2021.png')} />
                                                                </div>
                                                                <div className="content">
                                                                    <h4 className="hd">DANH SÁCH TRÚNG THƯỞNG CHƯƠNG TRÌNH <br />"DỰ ĐOÁN KẾT QUẢ EURO CÙNG INSEE - VÒNG BẢNG"</h4>
                                                                </div>
                                                                <div style={{ paddingTop: '20px' }}>
                                                                    <table className="tbcontent" style={{ width: '100%' }}>
                                                                        <tr>
                                                                            <th style={{ paddingLeft: '10px' }}>STT</th>
                                                                            <th style={{ width: '40%' }}>Tên</th>
                                                                            <th>Tỉnh</th>
                                                                            <th>Số lượng</th>
                                                                        </tr>
                                                                        {leaderboard && leaderboard.map((item, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item.name}</td>
                                                                                    <td>{City.getName(item.city)}</td>
                                                                                    <td>{item.amount}</td>
                                                                                </tr>
                                                                            )
                                                                        })}

                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </Route>
                                                        <Route path="/khuyen-mai/:promotionId/du-doan-ket-qua-bong-da">
                                                            <ul className="nearby-contct ">
                                                                {matches && matches.map((item, index) => {
                                                                    let matchStatus = MatchStatus.findById(item.status)
                                                                    let strPredict = null;
                                                                    if (item.predict) {
                                                                        let predict = item.predict;
                                                                        let teamOneScore = predict.teamOneScore;
                                                                        let teamTwoScore = predict.teamTwoScore;
                                                                        let str = 'Anh đã dự đoán '
                                                                        if (teamOneScore > teamTwoScore) {
                                                                            str = str + item.teamOne.name + ' thắng với tỉ số '
                                                                        } else if (teamOneScore == teamTwoScore) {
                                                                            str = str + item.teamOne.name + ' hòa với tỉ số '
                                                                        } else {
                                                                            str = str + item.teamOne.name + ' thua với tỉ số '
                                                                        }
                                                                        str = str + teamOneScore + ' - ' + teamTwoScore;
                                                                        strPredict = str;
                                                                    }
                                                                    return (
                                                                        <li >
                                                                            <div className="nearly-pepls">
                                                                                <div className="pepl-info">
                                                                                    <div className="football-header">
                                                                                        <p style={{ color: matchStatus.color }} className="time">{DateTimeUtil.hourAndMinute(item.timeStart)}</p>
                                                                                    </div>
                                                                                    <div className="team done">
                                                                                        <div className="team-one">
                                                                                            <h5>
                                                                                                {item.teamOne.name}
                                                                                                {matchStatus.id == DONE.id && <p>{item.teamOneScore}</p>}

                                                                                            </h5>
                                                                                            <img src={item.teamOne.icon} />
                                                                                        </div>
                                                                                        <div className="team-two">
                                                                                            <img src={item.teamTwo.icon} />
                                                                                            <h5>
                                                                                                {item.teamTwo.name}
                                                                                                {matchStatus.id == DONE.id && <p>{item.teamTwoScore}</p>}
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="football-footer">
                                                                                        {strPredict ?
                                                                                            <p>{strPredict}</p>
                                                                                            :
                                                                                            <p><Link style={{ color: '#b71c1c' }} onClick={() => { this.onClickJoin(item.id) }}>Click vào đây để dự đoán</Link></p>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Route>

                                                    </Switch>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </WebAppLayout>
                <Loading {...this.props} />
            </div >
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
)((props) => {
    let { promotionId } = useParams();
    return <PredictFootbalPromotion promotionId={promotionId} {...props} />
})


