import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import Location from '../../../../data/Location'
import * as StatusConstruction from '../../../../components/enum/StatusConstruction'
import {NEXT_CONSTRUCTION, NOW_CONSTRUCTION} from '../../../../components/enum/TypeConstruction'
class ListConstruction extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10,
      type: NOW_CONSTRUCTION.getType()
    }
    this.onChangeType = this.onChangeType.bind(this)
  }

  componentDidMount() {
    this.props.appActions.getListConstruction();
  }

  onChangeType(type) {
    this.setState({type: type})
  }

  render() {
    let constructions = this.props.app.constructions;
    return (
      <div className="frnds">
        <div className="inbox-lists">
          <div className="inbox-action">
            <ul>
              <li onClick={() => this.onChangeType(NOW_CONSTRUCTION.getType())} className={`item-left ${this.state.type == NOW_CONSTRUCTION.getType() && 'active'}`}><label>Công trình hiện tại</label></li>
              <li onClick={() => this.onChangeType(NEXT_CONSTRUCTION.getType())} className={`item-left ${this.state.type == NEXT_CONSTRUCTION.getType() && 'active'}`}><label>Công trình tiếp theo</label></li>
              <li className="item-right">
                <select class="form-control">
                  <option>Tất cả</option>
                  <option>Chờ duyệt</option>
                  <option>Đã duyệt</option>
                </select>
              </li>
            </ul>
          </div>
          {/* <div className="mesages-lists">
            <form method="post">
              <input type="text" placeholder="Search" />
            </form>
          </div> */}
        </div>
        {/* <div className="frnds" style={{margin: '28px 0px'}}>
          <ul className="nav nav-tabs">
          <li className="nav-item"><a className={this.state.currentStatus == 10 ? 'active' : ''} >Tất cả</a></li>
          <li className="nav-item"><a className={this.state.currentStatus == 2 ? 'active' : ''} >Chờ duyệt</a><span>60</span></li>
          <li className="nav-item"><a className={this.state.currentStatus == 1 ? 'active' : ''} >Đã duyệt</a><span>20</span></li>
        </ul> 
        </div> */}

        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <ul className="nearby-contct">
              {constructions && constructions.list && constructions.list.map(function (item, key) {
                return (
                  <li key={key}>
                    <div className="nearly-pepls">
                      <div className="pepl-info row">
                        <div className="col-md-1">
                          <figure>
                            <a href="time-line.html" ><img src={item.user.avatar} alt="" /></a>
                          </figure>
                        </div>
                        <div className="col-md-7">
                          <h4>{item.address}</h4>
                          <ul>
                            <li>{Location.getName(item.city)}</li>
                            <li>{item.phone}</li>
                            <li>{StatusConstruction.findByStatus(item.status).getName()}</li>
                          </ul>
                        </div>
                        <div className="col-md-4 action">
                          <Link to={`/construction/${item.id}`} className="add-butn" data-ripple>Xem chi tiết</Link>
                        </div>

                      </div>
                    </div>
                  </li>
                )
              })}

            </ul>
            <div className="lodmore"><button className="btn-view btn-load-more" /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListConstruction
