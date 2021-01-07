import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
import Location from '../../../../data/Location'
class ListConstruction extends Component {


  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageSize: 10,
      currentStatus: 10
    }
  }

  componentDidMount() {
    this.props.appActions.getListConstruction();
  }

  render() {
    let constructions = this.props.app.constructions;
    return (
      <div className="frnds">
        <ul className="nav nav-tabs">
          <li className="nav-item"><a className={this.state.currentStatus == 10 ? 'active' : ''} >Tất cả</a></li>
          <li className="nav-item"><a className={this.state.currentStatus == 2 ? 'active' : ''} >Chờ duyệt</a><span>60</span></li>
          <li className="nav-item"><a className={this.state.currentStatus == 1 ? 'active' : ''} >Đã duyệt</a><span>20</span></li>
          <li className="nav-item"><a className={this.state.currentStatus == 4 ? 'active' : ''}>Chờ gửi quà</a><span>10</span></li>
          <li className="nav-item"><a className={this.state.currentStatus == 4 ? 'active' : ''}>Chờ nhận quà</a><span>10</span></li>
        </ul>
        {/* Tab panes */}
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
                            <li>Chờ duyệt</li>
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
