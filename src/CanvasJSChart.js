/* App.js */
import {React, Component} from 'react'
import {CanvasJSChart} from 'canvasjs-react-charts'
import data from './data.json'
import rand_data from './rand_data.json'
import _ from 'lodash'
import Score from './Score.js'
import Grid from '@mui/material/Grid';
import Swipe from 'react-easy-swipe';
import { Hidden } from '@mui/material'

console.log("data", data)
// const myRef = React.useRef();
let rand_num = _.floor(Math.random() * 10)
console.log("random number", rand_num)
data = _.filter(rand_data, (d) => _.get(d, "id") == rand_num)
console.log("rand data", data)

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {ohlc: [], bb: [], time: 0, chartStartIndex: 0, chartEndIndex: 0, 
            startDate: new Date(), portfolio: 5000, stocks: 0, avgPrice: 0, last_price: 0}
    }
  
    timer = setInterval(() => {
        this.updateTime(this.state.time)
      }, 1000)

     
      
    componentDidMount = () => {
        var ohlc = []
        var bb = []
        var minute = 0
        let candleColor = ""

        _.each(data, (val, key) => {
            console.log("val, key", val, key)
            candleColor = _.get(val, 'Close') < _.get(val, 'Open') ? "#d12102" : "#02cfe6"
            // if(_.size(ohlc) < 20) {
            ohlc.push({x: new Date(this.state.startDate.getTime() + 60*1000*minute), y: [_.get(val, 'Open'), _.get(val, 'High'), _.get(val, 'Low'), _.get(val, 'Close')], color: candleColor})
            bb.push({x: new Date(this.state.startDate.getTime() + 60*1000*minute), y: [_.get(val, 'bb_upper'), _.get(val, 'bb_lower')]})
            // }
            minute += 1
        })
        
        console.log("size", _.size(ohlc))
        console.log("ohlc", ohlc, bb)
        this.setState({ohlc, bb})

        window.addEventListener("keydown", this.downHandler);
        window.addEventListener("keyup", this.upHandler);

        window.addEventListener('touchstart', this.ontouch)
        // this.timer
        setInterval(() => {
            if (this.state.time > _.size(this.state.ohlc)) {
                this.updateTime(this.state.time)
            }
          }, 1000)


        // get class canvasjs.com
        console.log("chart", document.querySelector(".canvasjs-chart-credit"))
        let chartSource = document.querySelector(".canvasjs-chart-credit")
        chartSource.style.display = "none"
          
    }

    ontouch = (e) => {
        console.log("ontouch", e)
    }

    updateTime = async (time) => {
        let newTime = time + 1
        await this.setState({time: newTime})
        console.log("time", newTime)
        if (newTime > _.size(this.state.ohlc) - 30) {
            localStorage.setItem('isGameOn', false)
            console.log("clear interval")
            // clearInterval(this.timer)
            this.setState({time: _.size(this.state.ohlc)})
        } else {
            localStorage.setItem('isGameOn', true)
        }
        localStorage.setItem('timer', newTime)
        let last_price = _.last(_.get(_.last(_.slice(this.state.ohlc, this.state.time, this.state.time+30)), 'y'))
        localStorage.setItem('ltp', last_price)
        console.log("ltp", last_price)
    }

    downHandler = ({ key }) => {
        // buy
        if (key === "ArrowUp") {
          this.sell()

        }
        console.log("down key", key)

      }
    
    upHandler = ({ key }) => {
        if (key === "ArrowDown") {
            this.buy()
        }
        console.log("upkey", key)
      };

    buy = () => {
        let stocks = this.state.stocks
        stocks += 1

        let price = _.last(_.get(_.last(_.slice(this.state.ohlc, this.state.time, this.state.time+30)), 'y'))
        let portfolio = this.state.portfolio
        portfolio -= price

        let avgPrice = this.state.avgPrice
        avgPrice = _.round((avgPrice + price)/2, 2)
      
        console.log("buy", _.last(_.slice(this.state.ohlc, this.state.time, this.state.time+30)), price, portfolio, avgPrice)
        this.setState({ stocks, portfolio, avgPrice})
    }

    sell = () => {
        let stocks = this.state.stocks
        stocks -= 1

        let price = _.last(_.get(_.last(_.slice(this.state.ohlc, this.state.time, this.state.time+30)), 'y'))
        let portfolio = this.state.portfolio
        portfolio += price

        let avgPrice = this.state.avgPrice
        avgPrice = _.round((avgPrice + price)/2, 2)
        
        console.log("buy", _.last(_.slice(this.state.ohlc, this.state.time, this.state.time+30)), price, portfolio, avgPrice)
        this.setState({ stocks, portfolio, avgPrice})
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
        window.removeEventListener("keydown", this.downHandler);
        window.removeEventListener("keyup", this.upHandler);
    }

    // onSwipeStart = (event) => {
    //     console.log('Start swiping...', event);
    // }

    // onSwipeMove = (position, event) => {
    //     console.log(`Moved ${position.x} pixels horizontally`, event);
    //     console.log(`Moved ${position.y} pixels vertically`, event);
    // }

    // onSwipeEnd = (event) => {
    //     console.log('End swiping...', event);
    // }

    onSwipeUp = (e) => {
        this.sell()
        e.preventDefault()

    }

    onSwipeDown = (e) => {
        this.buy()
        e.preventDefault()

    }
    
    

	render() {
		const options = {
			theme: "dark2", // "light1", "light2", "dark1", "dark2"
            zoomEnables: true,
			animationEnabled: true,
			// exportEnabled: true,
			axisX: {
				valueFormatString: "hh:mm"
			},
			axisY2: {
				prefix: "$",
                includeZero: false,
                gridThickness: 0,
                stripLines: [
                    {
                      value: 0,
                      showOnTop: true,
                      color: "gray",
                      thickness: 2
                    }
                  ]
			},
			data: [
            {
				type: "rangeSplineArea",
				xValueFormatString: "MMM YYYY",
                axisYType: "secondary",
				yValueFormatString: "$#,##0.00",
				toolTipContent: "{x}<br><b>High:</b> {y[0]}<br><b>Low:</b> {y[1]}",
                markerType: 'none',
				dataPoints: _.slice(this.state.bb, this.state.time, this.state.time+30)
			},
            {
				type: "candlestick",
				showInLegend: false,
				name: "OHLC",
                axisYType: "secondary",
                risingColor: "#02cfe6",
                fallingColor: "#d12102",
                color: "#d12102",
				yValueFormatString: "$###0.00",
				xValueFormatString: "hh mm",
				dataPoints: _.slice(this.state.ohlc, this.state.time, this.state.time+30)
			}
		  ]
		}
		return (
            <div style={{backgroundColor: '#32373A', position: 'fixed', width: window.innerWidth}}>
                <CanvasJSChart options = {options}
                                            onRef={ref => this.chart = ref}
                                            style={{height: window.innerHeight, width: window.innerWidth, position: "fixed"}}
                                        />
                    
            
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		// <div style={{backgroundColor: '#32373A'}}>
        //     <Grid container spacing={2}>
        //         {/* <Grid item xs={2}>
        //             <Score style={{height: "100%"}} portfolio={this.state.portfolio} stocks={this.state.stocks} avgPrice={this.state.avgPrice}/>
        //         </Grid> */}
        //         <Grid item xs={12}>
        //             <div style={{position: 'relative'}}>
        //                 <div style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'red'}}>
        //                     <CanvasJSChart options = {options}
        //                                     onRef={ref => this.chart = ref}
        //                                     style={{height: window.innerHeight-10, width: '100%'}}
        //                                 />
        //                 </div>
        //                 <div style={{display: 'none', position: 'absolute', height: '100%', width: '100%', backgroundColor: 'yellow', opacity: 0.9}}>
        //                     <Swipe
        //                         onSwipeUp={this.onSwipeUp}
        //                         onSwipeDown={this.onSwipeDown}>

        //                         <div style={{height: window.innerHeight-10, width: '100%'}}></div>
        //                     </Swipe>
        //                 </div>
        //             </div>
        //         </Grid>
            
        //     </Grid>
                    
            
		// 	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		// </div>
		);
	}

}


// TODO
    //** */ Add UI to show score, stocks, portfolio
    //** */ on arrowdown/up or swipe buy sell stocks
    //** */ check app in expo
    //** */ save score
    // on end game, sell or buy stocks
    // create welcome page
    // publish on github
    //** */ in expo webview load the website.
    //** */ fix local storage issue
    // ad ads
    // publish app on play store and app store
    // create ad for marketing and post on facebook

    