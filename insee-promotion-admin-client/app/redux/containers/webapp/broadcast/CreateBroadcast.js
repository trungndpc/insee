import React, { Component } from 'react'
import { TypeBroadcast } from '../../../../components/enum/TypeBroadcast'
import LocationMultiSelect from '../../../../components/post/LocationMultiSelect';

class CreateBroadcast extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="frnds">
        <div className="tab-content">
          <div className="tab-pane active fade show" id="frends">
            <div className="central-meta">
              <div className="about">
                <div className="col-lg-12 col-sm-12 pading0">
                  <form method="post">
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Tiêu đề: </label>
                      <input className="ctk-editor-input" type="text" placeholder="Chủ đề broadcast" />
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Loại broadcast: </label>
                      <select className="ctk-editor-input" type="text">
                        {TypeBroadcast.getList().map((item, index) => {
                          return <option key={index} value={item.getType()}>{item.getName()}</option>
                        })}
                      </select>
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Thời gian bắt đầu: </label>
                      <input className="ctk-editor-input" type="datetime-local" />
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Khu vực áp dụng: </label>
                      <div className="ctk-editor-input c1"> <LocationMultiSelect /> </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <div className="ctkm">
              <ul style={{ listStyleType: 'none' }}>
                <li style={{ marginRight: '30px' }}><span className="mbtn">Save</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateBroadcast
