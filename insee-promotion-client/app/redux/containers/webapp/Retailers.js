import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { ContentSideBar } from '../../../components/layout/SideBar'
import LocationInput from '../../../components/promotions/LocationInput'
import RetailerModel from '../../../model/RetailerModel'
import { City, District } from '../../../data/Location'

class Retailers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 0,
            district: 0,
            page: 0,
            pageSize: 10,
            list: null
        }
        this.scroll = this.scroll.bind(this)
        this.find = this.find.bind(this)
        this.onChangeLocationInput = this.onChangeLocationInput.bind(this)
    }


    shouldComponentUpdate(nextProp, nextState) {
        if (nextProp.app.user != null && !this.props.app.user) {
            nextState.city = nextProp.app.user.customer.mainAreaId
            this.find(nextState.city, this.props.district, this.state.page, this.state.pageSize)
        }
        return true
    }


    componentDidMount() {
        this.find(this.state.city, this.state.district, this.state.page, this.state.pageSize)
    }

    componentWillMount() {
        window.addEventListener('scroll', this.scroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll, false);
    }


    scroll() {
        let innerHeight = window.innerHeight;
        let scrollHeight = document.scrollingElement.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop == 0) {
            scrollTop = document.getElementsByTagName("BODY")[0].scrollTop;
        }
        scrollTop = Math.abs(scrollTop)
        if (innerHeight + scrollTop + 500 >= scrollHeight) {
            let page = this.state.page + 1;
            this.find(this.state.city, this.state.district, page, this.state.pageSize)
            this.setState({ page: page })
        }
    }


    find(city, district, page, pageSize) {
        RetailerModel.find(city, district, page, pageSize)
            .then(resp => {
                if (resp.error == 0) {
                    // let list = [...this.state.list]
                    //     list.push.apply(list, resp.data.list)
                    //     console.log(list.length)
                    //     this.setState({ index: list.length, list: list })


                    this.setState({ retailers: resp.data })
                }
            })
            .catch(err => {

            })
    }

    onChangeLocationInput(city, district) {
        this.find(city, district, 0, this.state.pageSize)
    }

    render() {
        const retailers = this.state.retailers;
        const list_retailer = retailers && retailers.list;
        const pageSize = retailers && retailers.pageSize;
        const user = this.props.app.user;
        return (
            <div>
                <WebAppLayout {...this.props}>
                    <section>
                        <div className="gap gray-bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row merged20" id="page-contents">
                                            <div className="col-lg-3">
                                                <aside className="sidebar static">
                                                    <div className="widget">
                                                        <h4 className="widget-title">Thông tin</h4>
                                                        <ContentSideBar />
                                                    </div>{/* Shortcuts */}
                                                </aside>
                                            </div>
                                            {user &&
                                                <div className="col-lg-9">
                                                    <div className="loadMore">
                                                        <div className="m-content">
                                                            <div className="central-meta">
                                                                <div className="about">
                                                                    <div className="personal">
                                                                        <h5 style={{ textAlign: 'center' }} className="f-title">CỬA HÀNG GẦN BẠN</h5>
                                                                    </div>
                                                                    <div className="form-row">
                                                                        <LocationInput onChange={this.onChangeLocationInput} city={this.state.city} ref={e => this.locationInputRef = e} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-12 retailers-rs">
                                        <div className="row merged20">
                                            <div className="loadMore">
                                                <div className="m-content">
                                                    {(!list_retailer || list_retailer.length == 0) && <div style={{ textAlign: 'center' }}>Danh sánh cửa hàng chưa được cập nhật tại khu vực này.</div>}
                                                    {/* <div className="central-meta"> */}
                                                    {(list_retailer && list_retailer.length > 0) &&
                                                        <ul className="nearby-contct">
                                                            {list_retailer.map((item, index) => {
                                                                let address = item.address && item.address.trim()
                                                                item.district && (address = address + " - " + District.getName(item.district + ''))
                                                                item.city && (address = address + " - " + City.getName(item.city))
                                                                return (
                                                                    <li>
                                                                        <div className="nearly-pepls">
                                                                            <div className="pepl-info">
                                                                                <h5 className="name-retailer">{item.name && item.name.trim()}</h5>
                                                                                <p className="phone"><span className="icon fa fa-phone"></span>{item.homePhone && ("0" + item.homePhone.trim())}</p>
                                                                                <p><span className="icon fa fa-map-marker"></span>{address}</p>
                                                                                {/* <em><i className="fa fa-map-marker" />400m away</em> */}
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )

                                                            })}
                                                        </ul>
                                                    }
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </WebAppLayout>
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
)(Retailers)

