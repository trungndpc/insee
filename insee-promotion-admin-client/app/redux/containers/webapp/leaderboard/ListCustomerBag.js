import React, { Component } from 'react'
import { Pagination } from 'antd';
import CustomerModel from '../../../../model/CustomerModel';
import { City } from '../../../../data/Location';
import GiftModal from '../../../../components/modal/gift/GiftModal'
import {
    Link,
} from "react-router-dom";
import { VOUCHER } from '../../../../components/enum/TypeGift';

class ListCustomerBag extends Component {


    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pageSize: 10,
            location: -1,
            page_customers: null,
            isSendingGift: false,
            exchange: null
        }
        this.getList = this.getList.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangePage = this.onChangePage.bind(this)

    }

    componentDidMount() {
        this.getList(this.state.location, this.state.page, this.state.pageSize)
    }

    getList(location, page, pageSize) {
        CustomerModel.getLeaderBoard(location, page - 1, pageSize)
            .then(resp => {
                if (resp.error == 0) {
                    this.setState({ page_customers: resp.data })
                }
            })
    }


    onChangeLocation(event) {
        let location = event.target.value;
        this.setState({ location: location, page: 1 });
        this.getList(location, 1, this.state.pageSize)
    }


    onChangePage(pageNumber, pageSize) {
        this.setState({ page: pageNumber })
        this.getList(this.state.location, pageNumber, this.state.pageSize)
    }



    render() {
        const page_customers = this.state.page_customers;
        return (

            <div className="frnds">
                <div style={{ paddingBottom: '30px' }} className="inbox-lists">
                    <div className="inbox-action">
                        <ul>
                            <li>
                                <label>Tỉnh thành</label>
                                <select onChange={this.onChangeLocation} value={this.state.location} className="form-control">
                                    <option value={-1}>Tất cả</option>
                                    {City.getList().map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{item.value}</option>
                                        )
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content">
                    <div style={{ padding: '0' }} className="central-meta">
                        <div className="about">
                            <div className="col-lg-12 col-sm-12 pading0">
                                <table className="table">
                                    <thead className=" insee-color">
                                        <tr className="insee-color">
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Tỉnh Thành</th>
                                            <th scope="col">Số bao</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {page_customers && page_customers.list && page_customers.list.map(function (item, key) {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{City.getName(item.provinceId)}</td>
                                                    <td>{item.bags}</td>
                                                </tr>
                                            )
                                        }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="paging-container">
                                {page_customers && <Pagination defaultCurrent={1} current={this.state.page} onChange={this.onChangePage} total={page_customers.totalPage * page_customers.pageSize} />}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.exchange &&
                    <GiftModal {...this.props}
                        typeGift={VOUCHER.getType()}
                        customerId={this.state.exchange.customerId}
                        amountPoint={this.state.exchange.amountPoint}
                        isOpen={this.state.isSendingGift}
                        onClose={() => { this.setState({ isSendingGift: false }) }} />
                }
            </div>
        )
    }
}

export default ListCustomerBag
