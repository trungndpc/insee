import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import { INIT, PUBLISHED, StatusPost } from '../enum/StatusPost'
import DateTimeUtil from '../../utils/DateTimeUtil'
import { City } from '../../data/Location'
import AreYouSureModal from '../modal/AreYouSureModal'
import { Pagination } from 'antd';
import PostModel from '../../model/PostModel'

class ListPost extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            pageSize: 10,
            status: -1,
            isShowDeleteModal: false,
            page_post: null
        }
        this.delete = this.delete.bind(this)
        this.clickDelete = this.clickDelete.bind(this)
        this._onChangeStatus = this._onChangeStatus.bind(this)
        this._onChangePage = this._onChangePage.bind(this)
    }

    componentDidMount() {
        this.getList(this.state.status, this.state.page, this.state.pageSize)
    }


    getList(status, page, pageSize) {
        PostModel.getList(status, page - 1, pageSize)
            .then(resp => {
                this.setState({ page_post: resp.data })
            })
    }

    clickDelete(id) {
        this.delete_id = id;
        this.setState({ isShowDeleteModal: true })
    }

    delete() {
        let id = this.delete_id;
        if (id) {
            this.props.appActions.deletePromotion(id);
        }
        this.setState({ isShowDeleteModal: false })
    }

    _onChangeStatus(event) {
        let status = event.target.value;
        this.setState({ status: status })
        this.getList(status, this.state.page, this.state.pageSize)
    }

    _onChangePage(pageNumber, pageSize) {
        this.getList(this.state.status, pageNumber, this.state.pageSize)
        this.setState({ page: pageNumber })
    }

    render() {
        let promotions = this.state.page_post;
        return (
            <div className="frnds">
                <div className="inbox-lists">
                    <div className="inbox-action">
                        <ul>
                            <li>
                                <label>Trạng thái:</label>
                                <select onChange={this._onChangeStatus} value={this.state.status} className="form-control">
                                    <option value={-1}>Tất cả</option>
                                    <option value={INIT.getStatus()}>{INIT.getName()}</option>
                                    <option value={PUBLISHED.getStatus()}>{PUBLISHED.getName()}</option>
                                </select>
                            </li>
                            <li style={{float: 'right', paddingTop: '14px', textAlign: 'center', margin: '0'}}><a className="add-butn post-btn" href="/post/create"><span style={{color : '#fff !important'}} className="mbtn">Thêm</span></a></li>
                        </ul>
                    </div>
                </div>

                <div className="tab-content">
                    <div className="tab-pane active fade show" id="frends">
                        <ul className="nearby-contct posts">
                            {promotions && promotions.list && promotions.list.map(function (item, key) {
                                return (
                                    <li key={key}>
                                        <div className="nearly-pepls">
                                            <div className="pepl-info row">
                                                <div className="col-md-3">
                                                    <figure className="cover">
                                                        <img src={item.cover} alt="" />
                                                    </figure>
                                                </div>
                                                <div className="col-md-7 pdtop">
                                                    <h4>{item.title}</h4>
                                                    <ul>
                                                        {item.user && <li>{item.user.name}</li>}
                                                        <li>{StatusPost.findBySatus(item.status).getName()}</li>
                                                        <li>{DateTimeUtil.diffTime(item.updatedTime)}</li>
                                                    </ul>
                                                    <ul>
                                                        <span style={{ marginRight: '5px' }} className="fas fa-map-marker-alt"></span>
                                                        {item.location.map(function (id, k) {
                                                            return (
                                                                <li key={k}>{City.getName(id)}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 action">
                                                    <Link to={`/post/${item.id}`} className="add-butn post-btn">Chi tiết</Link>
                                                    <a onClick={() => { this.clickDelete(item.id) }} style={{ backgroundColor: '#d9d9d9' }} className="add-butn post-btn" >Xóa</a>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                )
                            }.bind(this))}
                            {promotions && promotions.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}

                        </ul>
                        <div className="paging-container">
                            {promotions && <Pagination defaultCurrent={1} current={this.state.page} onChange={this._onChangePage} total={promotions.totalPage * promotions.pageSize} />}
                        </div>
                    </div>
                </div>
                <AreYouSureModal isOpen={this.state.isShowDeleteModal} onClose={() => {
                    this.delete_id = null;
                    this.setState({ isShowDeleteModal: false })
                }} onOK={this.delete} />
            </div>
        )
    }
}

export default ListPost
