import {React, Component} from 'react'
import _ from 'lodash'
import Portfolio from './moneyhand.png'
import Stocks from './stocks1.png'
import Sack from './moneysack1.png'

export default class Score extends Component {
    constructor(props) {
        super(props)

        this.state = {portfolio: 5000, stocks: 0, avgPrice: 0}
    }


    render() {
        return <div>
                <div style={{height: window.innerHeight*0.33, display: 'block', width: '100%', alignItems: 'center', textAlign: 'center'}}>
                    <div style={{width: '90%', height: window.innerHeight*0.15, alignItems: 'center'}}>
                        <img src={Sack} alt="BigCo Inc. logo" style={{height: window.innerHeight*0.15, textAlign: 'center'}}/>
                    </div>
                    <p style={{margin: 0, fontSize: 13, color: 'whitesmoke'}}>Portfolio</p>
                    <h3 style={{margin: 2, color: '#02cfe6'}}>${_.round(this.props.portfolio, 2)}</h3>
                </div>
                <div style={{height: window.innerHeight*0.33, display: 'block', width: '100%', alignItems: 'center', textAlign: 'center'}}>
                    <div style={{width: '90%', height: window.innerHeight*0.15, alignItems: 'center'}}>
                        <img src={Stocks} alt="BigCo Inc. logo" style={{height: window.innerHeight*0.11, textAlign: 'center'}}/>
                    </div>
                    <p style={{margin: 0, fontSize: 13, color: 'whitesmoke'}}>Stocks</p>
                    <h3 style={{margin: 2, color: '#02cfe6'}}>{this.props.stocks}</h3>
                </div>
                <div style={{height: window.innerHeight*0.33, display: 'block', width: '100%', alignItems: 'center', textAlign: 'center'}}>
                    <div style={{width: '90%', height: window.innerHeight*0.15, alignItems: 'center'}}>
                        <img src={Portfolio} alt="BigCo Inc. logo" style={{height: window.innerHeight*0.12, textAlign: 'center'}}/>
                    </div>
                    <p style={{margin: 0, fontSize: 13, color: 'whitesmoke'}}>Avg Price</p>
                    <h3 style={{margin: 2, color: '#02cfe6'}}>${_.round(this.props.avgPrice, 2)}</h3>
                </div>
            </div>
        
    }
}