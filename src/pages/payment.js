import React from 'react';
import {
  connectToMetaMask,
  sendTransaction 
} from './../functions/webthree';

class Payment extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      amountToSend: "0",
      activeToken: "matic"
    }

    this.handleClick = this.handleClick.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
  }


  

  handleClick(event) {
    event.preventDefault();
    connectToMetaMask();
  }

  sendTransaction(event,amount,token) {
    event.preventDefault();
    sendTransaction(amount,token);
  }

  render() {
  return (
    <div className="App">
      <h1>Demo App v0.0.0.0.0.0.1</h1>
      <h3 style={{"color": "red"}}>Currently, only works on Matic network</h3>
      <form>
        <input type="number" value={this.state.amountToSend} onChange={this.handleAmountChange}/>
        <select value={this.state.activeToken} onChange={this.handleTokenChange}>
          <option value="matic">Matic</option>
          <option value="erc20">DERC20</option>
        </select>
        <button className="enableEthereumButton" onClick={this.handleClick}>Connect Metamask</button>
      </form>
      
      <button className="sendTransactionButton" onClick={(e) => this.sendTransaction(e,this.state.amountToSend, this.state.activeToken)}>
        Send transaction
      </button>
    </div>
  );
}
}

export default Payment;
