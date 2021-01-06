import React, { Component } from 'react'
import ImgViewer from '../layout/ImgViewer'
class DetailConstruction extends Component {

    render() {
        return (
            <div className="loadMore">
                <div className="m-content">
                    <div className="central-meta">
                        <div className="about">
                            <div className="personal">
                                <h5 className="f-title">THÔNG TIN NHÀ THẦU</h5>
                            </div>
                            <table className="table table-responsive table-info-contractor">
                                <tbody>
                                    <tr>
                                        <th>Nhà thầu</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>SDT</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Khu vực thi công</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Ghi chú</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="central-meta">
                        <ul className="photos">
                            <li>
                                <a className="strip" href="#">
                                    <img onClick={() => {this.imgViewerRef.open()}} src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                            <li>
                                <a className="strip" href="#">
                                    <img src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                            <li>
                                <a className="strip" href="#">
                                    <img src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                            <li>
                                <a className="strip" href="#">
                                    <img src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                            <li>
                                <a className="strip" href="#">
                                    <img src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                            <li>
                                <a className="strip" href="#">
                                    <img src="http://www.wpkixx.com/html/winku/images/resources/photo2.jpg" alt="" /></a>
                            </li>
                        </ul>
                    </div>

                </div>
                <ImgViewer ref={e => this.imgViewerRef = e} />

            </div>
        )
    }
}

export default DetailConstruction
