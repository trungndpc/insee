import React, { Component } from 'react'
import ImgViewer from '../layout/ImgViewer'
import { TypeConstruction, NEXT_CONSTRUCTION, NOW_CONSTRUCTION } from '../enum/TypeConstruction'
import { ImageStatus, WAITING_APPROVAL, APPROVED, REJECTED } from '../enum/ImageStatus'
import {City} from '../../data/Location'
import DateTimeUtil from '../../utils/DateTimeUtil'
import {findByStatus} from '../enum/StatusConstruction'

class DetailConstruction extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.appActions.getConstructionById(this.props.id)
    }

    countApproved(bills) {
        let arr = bills.filter(e =>  e.status == APPROVED.getStatus() );
        return arr ? arr.length : 0
    }


    render() {
        const construction = this.props.app.construction;
        const type = construction && TypeConstruction.findByType(construction.type)
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="central-meta">
                        <div className="about">
                            <div className="personal">
                                <h5 className="f-title">THÔNG TIN CÔNG TRÌNH</h5>
                            </div>
                            <table className="table table-responsive table-info-contractor">
                                <tbody>
                                    <tr>
                                        <th>Địa chỉ</th>
                                        <td>{construction && construction.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Tỉnh thành</th>
                                        <td>{construction && City.getName(construction.city)} - Quận 1</td>
                                    </tr>
                                    {type == NEXT_CONSTRUCTION &&
                                        <tr>
                                            <th>Tên: </th>
                                            <td>{construction && construction.name}</td>
                                        </tr>
                                    }
                                    {type == NEXT_CONSTRUCTION &&
                                        <tr>
                                            <th>SDT: </th>
                                            <td>{construction && construction.phone}</td>
                                        </tr>
                                    }
                                    {type == NOW_CONSTRUCTION &&
                                        <tr>
                                            <th>Tên cửa hàng: </th>
                                            <td>{construction && construction.name}</td>
                                        </tr>
                                    }
                                    {type == NOW_CONSTRUCTION &&
                                        <tr>
                                            <th>SDT cửa hàng: </th>
                                            <td>{construction && construction.phone}</td>
                                        </tr>
                                    }
                                    {type == NEXT_CONSTRUCTION &&
                                        <tr>
                                            <th>Khởi công: </th>
                                            <td>{construction && DateTimeUtil.toString(new Date(construction.estimateTimeStart * 1000))}</td>
                                        </tr>
                                    }
                                    {type == NEXT_CONSTRUCTION &&
                                        <tr>
                                            <th>Loại CT: </th>
                                            <td>{construction && construction.typeConstruction}</td>
                                        </tr>
                                    }
                                    {type == NOW_CONSTRUCTION &&
                                        <tr>
                                            <th>Số lượng: </th>
                                            <td>{construction && construction.quantity}</td>
                                        </tr>
                                    }
                                    <tr>
                                        <th>Trạng thái</th>
                                        <td>{construction && findByStatus(construction.status).getName()}</td>
                                    </tr>
                                    {type == NOW_CONSTRUCTION &&
                                        <tr>
                                            <th>Đã duyệt</th>
                                            <td>{construction && construction.bills && this.countApproved(construction.bills)} hóa đơn,  {construction && construction.images && this.countApproved(construction.images)} hình ảnh</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {(type && type == NOW_CONSTRUCTION) &&
                        <div className="central-meta">
                            <h5 className="f-title bill">HÓA ĐƠN ({construction && construction.bills && construction.bills.length})</h5>
                            <ul className="photos">
                                {construction && construction.bills && construction.bills.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            <a className="strip" href="#">
                                                <img onClick={() => { this.imgViewerRef.open(item) }} src={item.link} alt="" />
                                                {item.status == REJECTED.getStatus() && <div style={{ color: ImageStatus.getColor(item.status) }} className="status"></div>}
                                            </a>
                                        </li>
                                    )
                                })
                                }

                            </ul>
                            <h5 className="f-title bill">HÌNH ẢNH CÓ XI MĂNG INSEE ({construction && construction.images && construction.images.length})</h5>
                            <ul className="photos">
                                {construction && construction.images && construction.images.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            <a className="strip" href="#">
                                                <img onClick={() => { this.imgViewerRef.open(item) }} src={item.link} alt="" />
                                                {item.status == REJECTED.getStatus() && <div style={{ color: ImageStatus.getColor(item.status) }} className="status"></div>}
                                            </a>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    }

                </div>
                <ImgViewer ref={e => this.imgViewerRef = e} />

            </div>
        )
    }
}

export default DetailConstruction
