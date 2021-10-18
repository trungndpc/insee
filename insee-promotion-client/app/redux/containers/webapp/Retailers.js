import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../actions/app'
import WebAppLayout from '../../../components/layout/WebAppLayout'
import { ContentSideBar } from '../../../components/layout/SideBar'
import LocationInput from '../../../components/promotions/LocationInput'
import RetailerModel from '../../../model/RetailerModel'
import { City, District } from '../../../data/Location'
import * as CementEnum from '../../../components/enum/CementEnum'
import PhoneUtil from '../../../utils/PhoneUtil'

class Retailers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 0,
            district: 0,
            page: 0,
            pageSize: 10,
            list: [],
            cement: 0
        }
        this.scroll = this.scroll.bind(this)
        this.find = this.find.bind(this)
        this.onChangeLocationInput = this.onChangeLocationInput.bind(this)
        this.onChangeCement = this.onChangeCement.bind(this)
        // this.setLocation = this.setLocation.bind(this)
    }


    componentDidMount() {
        // this.getLocation()
        this.checkUserInterval = setInterval(function () {
            if (this.props.app.user) {
                this.setState({ city: this.props.app.user.customer.mainAreaId })
                this.find(this.props.app.user.customer.mainAreaId, this.state.district, this.state.cement,
                    this.state.page, this.state.pageSize)
                clearInterval(this.checkUserInterval)
            }
        }.bind(this), 50);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.scroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll, false);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        }
    }

    getDistrictAndCity(resp) {
        let rs = {};
        let results = resp.results;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            let types = result.types;
            if ((types.length >= 2 && types[0] == 'establishment' && types[1] == 'point_of_interest')
                || (types.length >= 2 && types[0] == 'administrative_area_level_2' && types[1] == 'political')) {
                let address_components = result.address_components;
                for (var j = 0; j < address_components.length; j++) {
                    let address_component = address_components[j];
                    if (address_component.types[0] == 'administrative_area_level_2') {
                        rs.district = address_component.short_name;
                    }
                    if (address_component.types[0] == 'administrative_area_level_1') {
                        rs.city = address_component.short_name
                    }
                }
                return rs;
            }
        }
    }

    // setLocation(position) {
    //     let lat = position.coords.latitude;
    //     let lon = position.coords.longitude;
    //     GeoModel.getLocation(lat, lon)
    //         .then(resp => {
    //             console.log(resp)
    //             let location = this.getDistrictAndCity(resp);
    //             console.log(location)
    //             let district = location.district;
    //             let city = location.city;
    //             GeoModel.detectId(city, district)
    //                 .then(resp => {
    //                     if (resp.error >= 0) {
    //                         let district_id = resp.data.district;
    //                         let city_id = resp.data.city;
    //                         if (district_id > 0 && city_id > 0) {
    //                             this.setState({ district: district_id, city: city_id, list: [] })
    //                             this.find(city_id, district_id,
    //                                 this.state.page, this.state.pageSize)
    //                         }
    //                     }
    //                     console.log(resp)
    //                 })
    //                 .catch(error => {
    //                     console.log(error)
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

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
            this.find(this.state.city, this.state.district, this.state.cement, page, this.state.pageSize)
            this.setState({ page: page })
        }
    }


    find(city, district, cement, page, pageSize) {
        RetailerModel.find(city, district, cement, page, pageSize)
            .then(resp => {
                if (resp.error == 0) {
                    let list = [...this.state.list]
                    list.push.apply(list, resp.data.list)
                    this.setState({ list: list })
                }
            })
            .catch(err => {

            })
    }

    onChangeLocationInput(city, district) {
        if (city && city != this.state.city) {
            this.setState({ city: city, district: 0, page: 0, list: [] })
            this.find(city, 0, this.state.cement, 0, this.state.pageSize)
        }
        if (district && district != this.state.district) {
            this.setState({ district: district, page: 0, list: [] })
            this.find(this.state.city, district, this.state.cement, 0, this.state.pageSize)
        }
    }

    onChangeCement(e) {
        let cement = e.target.value;
        this.setState({ cement: cement, page: 0, list: [] });
        this.find(this.state.city, this.state.district, cement, 0, this.state.pageSize)

    }

    render() {
        const list_retailer = this.state.list
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
                                                    </div>
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
                                                                        {this.state.city != 0 &&
                                                                            <LocationInput onChange={this.onChangeLocationInput} district={this.state.district} city={this.state.city} />
                                                                        }
                                                                    </div>
                                                                    <div className="form-row select-cement">
                                                                        <select value={this.state.cement} onChange={this.onChangeCement} ref={e => this.productInputRef = e}>
                                                                            <option value={0}>Tất cả xi măng</option>
                                                                            {CementEnum.getListForRetailer().map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item.id}>{item.name}</option>
                                                                                )
                                                                            })}
                                                                        </select>
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
                                                    {(list_retailer && list_retailer.length > 0) &&
                                                        <ul className="nearby-contct">
                                                            {list_retailer.map((item, index) => {
                                                                let address = item.address && item.address.trim()
                                                                item.district && (address = address + " - " + District.getName(item.district + ''))
                                                                item.city && (address = address + " - " + City.getName(item.city))
                                                                return (
                                                                    <li key={item.id}>
                                                                        <div className="nearly-pepls">
                                                                            <div className="pepl-info">
                                                                                <h5 className="name-retailer">{item.name && item.name.trim()}</h5>
                                                                                {item.mobilePhone && <p className="phone"><span className="icon fa fa-phone"></span>{PhoneUtil.format(item.mobilePhone.trim())}</p>}
                                                                                <p className="address"><span className="icon fa fa-map-marker"></span>{address}</p>
                                                                                {item.products && <p className="lb-products">Sản phẩm: </p>}
                                                                                <ul>
                                                                                    {item.products && item.products.map((product, pindex) => {
                                                                                        return (
                                                                                            <li key={pindex} style={{ color: CementEnum.findById(product).color, fontWeight: 'bold' }}>{CementEnum.findById(product).name}</li>
                                                                                        )
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )

                                                            })}
                                                        </ul>
                                                    }
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

