import React, { Component } from 'react'


class LoyaltyBoard extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const loyalty = this.props.loyalty;
        const ton = loyalty && loyalty.ton / 1000;
        return (
            <div>
                {loyalty &&
                    <div className="ton-info">
                        <h5 className="ton-title">Số tấn đã tích lũy</h5>
                        <h3 className="ton">{loyalty.ton > 1000 ? loyalty.ton / 1000 : loyalty.ton} <span style={{ fontSize: '20px' }}> {loyalty.ton > 1000 ? ' tấn' : ' kg'}</span></h3>
                    </div>
                }

                {loyalty &&
                    <div className="ton-process">
                        <ul className="cdt-step-progressbar horizontal">
                            <li className={`active`} style={{ width: '25%' }}>
                                <span className="indicator"></span>
                                <span className="title">CT đầu tiên</span>
                            </li>
                            <li className={`${ton >= 100 && 'active'}`} style={{ width: '25%' }}>
                                <span className="indicator"></span>
                                <span className="title">100</span>
                            </li>
                            <li className={`${ton >= 200 && 'active'}`} style={{ width: '20%' }}>
                                <span className="indicator"></span>
                                <span className="title">200</span>
                            </li>
                            <li className={`${ton >= 350 && 'active'}`} style={{ width: '20%' }}>
                                <span className="indicator"></span>
                                <span className="title">350</span>
                            </li>
                            <li className={`${ton >= 500 && 'active'}`} style={{ width: '10%' }}>
                                <span className="indicator"></span>
                                <span className="title">500</span>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

export default LoyaltyBoard
