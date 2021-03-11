import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'
import StatisticalModel from '../../../model/StatisticalModel'
import RegisterDateChart from './dashboard/RegisterDateChart'
import RegisterLocationChart from './dashboard/RegisterLocationChart'
import ContructionLocationChart from './dashboard/ContructionLocationChart'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
        this.getDashboard = this.getDashboard.bind(this)
    }


    componentDidMount() {
        this.getDashboard()
    }

    getDashboard() {
        StatisticalModel.getDashboard()
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({
                        data: resp.data
                    })
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const data = this.state.data;
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
                                                    <div className="central-meta">
                                                        {data &&
                                                            <div className="x_panel sum">
                                                                <ul>
                                                                    <li> {data.total_register} <span>Tổng số nhà thầu</span> </li>
                                                                    <li> {data.total_register_waiting} <span>Nhà thầu chờ duyệt</span> </li>
                                                                    <li> {data.total_construction_waiting} <span>Khuyến mãi chờ duyệt</span> </li>
                                                                </ul>
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className="central-meta">
                                                        <div className="x_panel ">
                                                            <div className="col50">
                                                                {data && <RegisterLocationChart data={data.register_by_location}/>}
                                                            </div>
                                                            <div className="col50">
                                                                {data && <ContructionLocationChart data={data.construction_by_location} />}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {data && <RegisterDateChart data={data.register_by_date} />}

                                                 
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
)(Dashboard)
