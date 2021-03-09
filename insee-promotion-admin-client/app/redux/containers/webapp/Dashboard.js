import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import SideBar from '../../../components/layout/SideBar'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };

class Dashboard extends React.Component {


    componentDidMount() {
    }

    render() {
        const user = this.props.app.user;
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
                                                        <div className="x_panel sum">
                                                            <ul>
                                                                <li> 1,245 <span>Tổng số nhà thầu</span> </li>
                                                                <li> 535 <span>Nhà thầu chờ duyệt</span> </li>
                                                                <li> 994 <span>Khuyến mãi chờ duyệt</span> </li>
                                                            </ul>
                                                        </div>
                                                        <div className="x_panel">
                                                            <div className="x_title">
                                                                <h2>Nhà thầu đã đăng ký theo ngày</h2>
                                                            </div>
                                                            <ul className="toolbox">
                                                            </ul>
                                                            <div className="x_content">
                                                            <HighchartsReact highcharts={Highcharts} options={options} />
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
