// TODO: Supposedly it is best to copy this into the webserver, as it is better for security
import { Contract, ethers } from "ethers";
import { ERC20_TOKEN_ABI } from '../token_data/erc20.js';
import * as CONTRACT_ADDRESSES from '../token_data/token_addresses';

// TODO: Throw an error or some sort of handling system to avoid breaking the site if MetaMask is not there.
// Web3Provider wraps a standard Web3 provider, which is what Metamask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

export const connectToMetaMask = async () => {

    // Right now this only works on MetaMask
    // TODO: Check whether it's metamask only via window.ethereum.isMetaMask;
    if (window.ethereum.isMetaMask === true) {
        await provider.send("eth_requestAccounts", []);

        // The Metamask plugin also allows signing transactions to send ether and pay to change state within the blockchain. For this, you the account signer...
        const signer = provider.getSigner();

        let network = await provider.getNetwork();
        // TODO: Use the appropriate JS libaries depending on which network was selected
        const account = await signer.getAddress();
        const balance = await provider.getBalance(account);

        return {
            "network": network,
            "balance": balance,
            "account": account
        }
    } else {
        throw Error("We currently only support MetaMask as a Wallet.");
    }
    
}



export const sendTransaction = async(network, amount, token) => {
    let CONTRACT_ADDRESS;
    //TODO: Refactor this
    //TODO: These contract address may not be correct
    switch(network) {
        case "Ethereum Mainnet": 
            switch (token) {
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_ETHEREUM_MAINNET;
                    break;
                default:
                    break;
            }
            break;
        case "Ropsten":
            switch(token) {
                case 'erc20':
                CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_ETHEREUM_ROPSTEN;
                break;
            default:
                break;
            }
            break;
        case "Kovan":
            switch(token) {
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_ETHEREUM_KOVAN;
                    break;
                default:
                    break;
            }
            break;
            
        case "Rinkeby":
            switch(token) {
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_ETHEREUM_RINKEBY;
                    break;
                default:
                    break;
            }
            break;
            
        case "Goërli":
            switch(token) {
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_ETHEREUM_GOERLI;
                    break;
                default:
                    break;
            }
            break;
        case "Polygon": 
            switch(token) {
                case 'eth':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.ETH_POS_MATIC_MAINNET;
                    break;
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_POS_MATIC_MAINNET;
                    break;
                default:
                    break;
            }
            break;
        case "Mumbai Testnet":
            switch(token) {
                case 'eth':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.ETH_POS_MATIC_TESTNET;
                    break;
                case 'erc20':
                    CONTRACT_ADDRESS = CONTRACT_ADDRESSES.DAI_POS_MATIC_TESTNET;
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    if (CONTRACT_ADDRESS) {
        const TOKEN_CONTRACT = new Contract(CONTRACT_ADDRESS, ERC20_TOKEN_ABI, provider);
        const contractWithSigner = TOKEN_CONTRACT.connect(signer);
        const parsedAmount = ethers.utils.parseUnits(amount, 18);
        async function sendERC20() {
            await contractWithSigner.transfer('0x8D1db939060020a0837e0ec34408e7A722eAb41F', parsedAmount);
            console.log(`Sent ${ethers.utils.formatUnits(parsedAmount,18)} ${token} to someone.`);
        }
        sendERC20();
    } 
    else {
        const tx = signer.sendTransaction({
            to: '0x8D1db939060020a0837e0ec34408e7A722eAb41F',
            value: ethers.utils.parseEther(amount)
        })
        console.log(tx);
    }
}

