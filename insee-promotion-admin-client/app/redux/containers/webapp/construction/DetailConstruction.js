import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import NowConstruction from './NowConstruction'
import NextConstruction from './NextConstruction'
import {TypeConstruction,  NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2, NEXT_CONSTRUCTION, LOYALTY, COLLECT_POINT, PHEN_MAN} from '../../../../components/enum/TypeConstruction'
import LoyaltyConstruction from './LoyaltyConstruction';
class DetailConstruction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            constructionId : this.props.match.params.constructionId
        }
    }

    componentDidMount() {
        this.props.appActions.getConstruction(this.state.constructionId)
    }


    render() {
        const construction = this.props.app.construction
        const type = construction && TypeConstruction.findByType(construction.type)
        return (
            <div>
                {construction &&  type == NEXT_CONSTRUCTION && <NextConstruction construction={construction} {...this.props}/>}
                {construction &&  type == NOW_CONSTRUCTION && <NowConstruction construction={construction} {...this.props}/>}
                {construction &&  type == NOW_CONSTRUCTION_V2 && <NowConstruction construction={construction} {...this.props} />}
                {construction &&  type == LOYALTY && <LoyaltyConstruction construction={construction} {...this.props} />}
                {construction &&  type == COLLECT_POINT && <NowConstruction construction={construction} {...this.props} />}
                {construction &&  type == PHEN_MAN && <LoyaltyConstruction construction={construction} {...this.props} />}
            </div>
        )
    }
}

export default withRouter(DetailConstruction)
