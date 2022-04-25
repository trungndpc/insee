import React, { Component } from 'react'
import { TypeBroadcast } from '../../../../components/enum/TypeBroadcast'
import LocationMultiSelect from '../../../../components/post/LocationMultiSelect';
import moment from 'moment'
import AlertUtils from '../../../../utils/AlertUtils'
import PostModel from '../../../../model/PostModel'
import { PUBLISHED } from '../../../../components/enum/StatusPost'
import BroadcastModel from '../../../../model/BroadcastModel'

class CreateBroadcast extends Component {

  constructor(props) {
    super(props)

    this.state = {
      form: {
        type: TypeBroadcast.getList()[0].getType(),
        timeStart: new Date().getTime(),
        cityIds: []
      },
      posts: []
    }

  }

  componentDidMount() {
    this.loadListPost()
  }


  loadListPost = () => {
    PostModel.getList(PUBLISHED.getStatus(), 0, 100)
      .then(resp => {
        if (resp.error == 0) {
          this.setState({ posts: resp.data.list })
          this.setForm({ ...this.state.form, postId: Number(resp.data.list[0].id) })
        }
      })
  }



  setForm = (data) => {
    this.setState({ form: data })
  }

  save = () => {
    let form = { ...this.state.form }
    if (!form.name) {
      AlertUtils.showError('Vui lòng nhập chủ đề ')
      return;
    }
    let cityIds = this.locationRef.getValue();
    if (cityIds) {
      cityIds = cityIds.map(i => Number(i))
    }
    form = { ...form, cityIds: cityIds };
    BroadcastModel.create(form)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
          window.location.href = "/broadcast"
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  render() {
    let form = this.state.form
    let posts = this.state.posts;
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
                      <input value={form.name} onChange={(e) => { this.setForm({ ...form, name: e.target.value }) }}
                        className="ctk-editor-input" type="text" placeholder="Chủ đề broadcast" />
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Loại broadcast: </label>
                      <select value={form.type} onChange={(e) => this.setForm({ ...form, type: e.target.value })}
                        className="ctk-editor-input" type="text">
                        {TypeBroadcast.getList().map((item, index) => {
                          return <option key={index} value={item.getType()}>{item.getName()}</option>
                        })}
                      </select>
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Bài viết: </label>
                      <select value={form.postId} onChange={(e) => this.setForm({ ...form, postId: Number(e.target.value) })}
                        className="ctk-editor-input" type="text">
                        {posts && posts.map((post, index) => {
                          return (
                            <option value={post.id} key={index}>{post.id} - {post.title}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Thời gian bắt đầu: </label>
                      <input value={moment(new Date(form.timeStart)).format("YYYY-MM-DDTkk:mm")} className="ctk-editor-input"
                        type="datetime-local"
                        onChange={(event) => {
                          let time = new Date(event.currentTarget.value).getTime()
                          this.setForm({ ...form, timeStart: time })
                        }} />
                    </div>
                    <div className="ctk-row">
                      <label className="ctk-editor-lable">Khu vực áp dụng: </label>
                      <div className="ctk-editor-input c1"> <LocationMultiSelect defaultValue={form.cityIds} ref={e => this.locationRef = e} /> </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <div className="ctkm">
              <ul style={{ listStyleType: 'none' }}>
                <li onClick={() => { this.save() }} style={{ marginRight: '30px' }}><span className="mbtn">Save</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateBroadcast
