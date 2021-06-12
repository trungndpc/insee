import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Link,
    useParams
} from "react-router-dom";

import * as appActions from '../../actions/app'
import Loading from '../../../components/layout/Loading'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import MatchModel from '../../../model/MatchModel'
import { DONE, MatchStatus } from '../../../components/enum/MatchStatus';
import DateTimeUtil from '../../../utils/DateTimeUtil'
import PromotionModel from '../../../model/PromotionModel'

class PredictFootbalPromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            matches: null
        }
        this.loadData = this.loadData.bind(this)
        this.onClickJoin = this.onClickJoin.bind(this)

    }

    componentDidMount() {
        this.loadData();
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
                                                <div className="m-content">
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
                                                                                {/* <p style={{ color: matchStatus.color }} className="status">{matchStatus.name}</p> */}
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
                                                                                    <p><Link style={{color: '#b71c1c'}} onClick={() => {this.onClickJoin(item.id)}}>Click vào đây để dự đoán</Link></p>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
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
    let { promotionId} = useParams();
    return <PredictFootbalPromotion promotionId={promotionId} {...props} />
})


