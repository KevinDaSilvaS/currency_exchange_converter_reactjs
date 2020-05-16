import React from 'react';
import './Converter.css';

class Converter extends React.Component{

    constructor(props){
        super(props);

        this.state = new Object;
        this.state.currencyToConvert = "";
        this.state.currencyConversion = 0;
        this.state.currencyA = "AUD";
        this.state.currencyB = "AUD";
        this.state.allCurrencies = ["AUD","BGN","BRL",
        "CAD","CHF","CNY","CZK","DKK","GBP","HKD","HRK",
        "HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN",
        "MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK",
        "SGD","THB","TRY","USD","ZAR",];
    }

    convert = () =>{

        const queryCurrencyData = `${this.state.currencyB},${this.state.currencyA}`; 
        const url = `https://api.exchangeratesapi.io/latest?symbols=${queryCurrencyData}`;

        fetch(url).then(res=>{
            return res.json();
        }).then(json => {
            const conversion = json["rates"][this.state.currencyB];
            this.setState({
                currencyConversion : (parseFloat(this.state.currencyToConvert) * conversion).toFixed(2)
            });
        })

    }


    setCurrencyA = (event) =>{
        this.setState({currencyA : event.target.value})
    }

    setCurrencyB = (event) =>{
        this.setState({currencyB : event.target.value})
    }


    render(){
        
        return(
            <div className="converter">
                <div className="div-selector">
                    <p>Convert </p>
                    <select onChange={(event) => this.setState({currencyA : event.target.value})}>
                        {
                            this.state.allCurrencies.map(cur => <option value={cur} key={cur}>{cur}</option>)
                        }
                    </select>
                </div>

                <div className="space">-</div>

                <div className="div-selector">
                    <p>Into </p>
                    <select onChange={(event) => this.setState({currencyB : event.target.value})}>
                        {
                            this.state.allCurrencies.map(cur => <option value={cur} key={cur}>{cur}</option>)
                        }
                    </select>
                </div>

                <h2 className="title">{this.state.currencyA} to {this.state.currencyB}</h2>
                <p>created using: https://exchangeratesapi.io/</p>

                <input type="text" 
                onChange={(event) => this.setState({currencyToConvert : event.target.value})}/>
                <button onClick={this.convert}>Convert</button>
                <h2>Converted Value: {this.state.currencyConversion}</h2>
            </div>
        );
    }
}

export default Converter;