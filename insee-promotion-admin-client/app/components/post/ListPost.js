import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom";
import { StatusPost } from '../enum/StatusPost'
import DateTimeUtil from '../../utils/DateTimeUtil'
import { City } from '../../data/Location'
import AreYouSureModal from '../modal/AreYouSureModal'

class ListPost extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isShowDeleteModal : false
        }
        this.delete = this.delete.bind(this)
        this.clickDelete = this.clickDelete.bind(this)
    }

    componentDidMount() {
        this.props.appActions.getListPromotion();
    }

    clickDelete(id) {
        this.delete_id = id;
        this.setState({isShowDeleteModal: true})
    }

    delete() {
        let id = this.delete_id;
        if (id) {
            this.props.appActions.deletePromotion(id);
        }
        this.setState({isShowDeleteModal: false})
    }

    render() {
        let promotions = this.props.app.promotions;
        return (
            <div className="frnds">
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
                                                        <span style={{marginRight: '5px'}} className="fas fa-map-marker-alt"></span>
                                                        {item.location.map(function(id, k) {
                                                            return (
                                                                <li key={k}>{City.getName(id)}</li>
                                                            )  
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="col-md-2 action">
                                                    <Link to={`/post/${item.id}`} className="add-butn post-btn">Chi tiết</Link>
                                                    <a onClick={() => {this.clickDelete(item.id)}} style={{backgroundColor: '#d9d9d9'}} className="add-butn post-btn" >Xóa</a>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                )
                            }.bind(this))}
                            {promotions && promotions.list.length == 0 && <div style={{ textAlign: 'center' }}>Không có công trình nào ở đây</div>}

                        </ul>
                        <div className="paging-container">
                            {/* {promotions && <Pagination defaultCurrent={1} current={this.state.page + 1} onChange={this.onChangePage} total={promotions.totalPage * promotions.pageSize} />} */}
                        </div>
                    </div>
                </div>
                <AreYouSureModal isOpen={this.state.isShowDeleteModal} onClose={() => {
                    this.delete_id = null;
                    this.setState({isShowDeleteModal: false})
                }} onOK={this.delete}/>
            </div>
        )
    }
}

export default ListPost
