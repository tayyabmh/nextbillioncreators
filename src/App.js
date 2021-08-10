import './App.css';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// import Home from './pages/home.js';
// import Payment from './pages/payment.js';
// import Login from './pages/Login.js';
// import Signup from './pages/Signup.js';
import NavigationBar from './components/navbar';
import ProfileFetch from './components/profile_fetch';
import { ethers } from 'ethers';
import { connectToMetaMask, sendTransaction } from './functions/webthree';
import { NETWORKS } from './functions/network_helper';

try {
  // Refreshes page if the user changes network. There is likely a better approach here but, this is what we will go with today.
  // TODO: Intelligently handle network changes
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });
} catch {}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isConnectedToWallet: false,
      network: "",
      balance: 0,
      account: "",
      isCompatibleNetwork: false,
      activeToken: "matic",
      amountToSend: 0,
      senderName: "",
      senderMessage: ""
    }

    this.handleConnect = this.handleConnect.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  sendTransaction(event, amount, token) {
    event.preventDefault();
    sendTransaction(this.state.network,amount, token);
}

handleSubmit(e, amount, token) {
    e.preventDefault();
    sendTransaction(this.state.network, amount,token).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

handleTokenChange(event) {
    this.setState({
      activeToken: event.target.value
    })
  }

handleAmountChange(event) {
    this.setState({
    amountToSend: event.target.value
    });
}
handleNameChange(event) {
    this.setState({
        senderName: event.target.value
    })
}

handleMessageChange(event) {
    this.setState({
        senderMessage: event.target.value
    })
}

  handleConnect(e) {
    e.preventDefault()
    connectToMetaMask().then((walletDetails) => {
      let activeNetworkIndex = NETWORKS.map(function(n) { return n.chainId}).indexOf(walletDetails.network.chainId);
      console.log("Active network index: " + activeNetworkIndex + " ChainID: " + walletDetails.network.chainId);
      if (activeNetworkIndex > -1) {
        this.setState({
          network: NETWORKS[activeNetworkIndex].commonName,
          balance: parseFloat(ethers.utils.formatUnits(walletDetails.balance,18)).toFixed(4),
          account: walletDetails.account,
          isConnectedToWallet: true,
          isCompatibleNetwork: true
        })
      } else {
        this.setState({
          isCompatibleNetwork: false,
          isConnectedToWallet: true
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div id="page-container">
          <NavigationBar 
          handleConnect={this.handleConnect} 
          isCompatibleNetwork={this.state.isCompatibleNetwork}
          isConnectedToWallet={this.state.isConnectedToWallet}
          network={this.state.network}
          account={this.state.account}
          balance={this.state.balance} />
          <div className="content-wrap">
            <Switch>
              {/* <Route exact path="/" component={withRouter(Home)}/> */}
              <Route path="/profile/:id" component={(props) => 
                <ProfileFetch 
                  {...props}
                  isConnectedToWallet={this.state.isConnectedToWallet}
                  activeToken={this.state.activeToken}
                  amountToSend={this.state.amountToSend}
                  handleAmountChange={this.handleAmountChange}
                  handleTokenChange={this.handleTokenChange}
                  isCompatibleNetwork={this.state.isCompatibleNetwork}
                  handleSubmit={this.handleSubmit}
                />
              }/>
              {/* <Route path="/login" component={withRouter(Login)}/>
              <Route path="/signup" component={withRouter(Signup)}/>
              <Route path="/payment" component={withRouter(Payment)}/> */}
            </Switch>
          </div>
          <div className="support-link">
            <p>Crypto Coffee is and always will be free. To support the Creator(s), please <Link to="/profile/tayyab">click here.</Link></p>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

