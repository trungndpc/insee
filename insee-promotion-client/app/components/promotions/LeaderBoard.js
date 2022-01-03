import React from 'react'
class LeaderBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tops: null
        }
    }

    componentDidMount() {

    }

    render() {
        const tops = this.props.tops;
        const isFull = this.props.isFull;
        const count = isFull ? 20 : 5;
        return (
            <div>
                <a href="/khuyen-mai/top-nha-thau">
                    <div className="lboard-container">
                        <div style={{ paddingTop: '10px' }} className="title">
                            <p style={{ fontSize: '25px', color: '#f11328' }}>TOP 5</p>
                            <p style={{ fontSize: '15px', lineHeight: '1px' }}>Nhà thầu ngoại hạng tỉnh <span style={{ color: '#f11328' }}>{this.props.location}</span></p>
                        </div>
                        {tops && tops[0] &&
                            <div id="top1">
                                <img src={tops[0].avatar}></img>
                                <p style={{ marginTop: '15px' }}>{tops[0].name}</p>
                            </div>
                        }
                        {tops && tops[1] &&

                            <div id="top2">
                                <img src={tops[1].avatar}></img>
                                <p style={{ marginTop: '15px' }}>{tops[1].name}</p>

                            </div>
                        }

                        {tops && tops[2] &&
                            <div id="top3">
                                <img src={tops[2].avatar}></img>
                                <p style={{ marginTop: '10px' }}>{tops[2].name}</p>

                            </div>
                        }

                        {tops && tops[3] &&

                            <div id="top4">
                                <img src={tops[3].avatar}></img>
                                <p style={{ marginTop: '5px' }}>{tops[3].name}</p>

                            </div>
                        }

                        {tops && tops[4] &&

                            <div id="top5">
                                <img src={tops[4].avatar}></img>
                                <p style={{ marginTop: '0' }}>{tops[4].name}</p>

                            </div>
                        }

                        {/* <img src={require("../../resources/images/bglboard.png")}/> */}
                    </div>
                </a>
                {/* {isFull && */}
                <div className="lboard-table">
                    <table style={{ overflowX: "auto", width: "100%", textAlign: 'center' }}>
                        <tr>
                            <th style={{ textAlign: 'center' }}>STT</th>
                            <th style={{ textAlign: 'center' }}>Nhà thầu</th>
                        </tr>
                        {tops && tops.slice(0, count).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    {/* <td>{City.getName(item.provinceId)}</td> */}
                                    {/* <td>{item.bags}</td> */}
                                </tr>
                            )
                        })}
                    </table>
                </div>
                {/* } */}
            </div>

        )
    }
}

export default LeaderBoard;