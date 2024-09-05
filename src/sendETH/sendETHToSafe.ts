import {ethers} from 'ethers'
import {RPC_URL,SAFE_ADDRESS,OWNER_1_PRIVATE_KEY} from '../config'

const provider = new ethers.JsonRpcProvider(RPC_URL)
const owner1Signer = new ethers.Wallet(OWNER_1_PRIVATE_KEY, provider)

async function sendETHToSafe(){
    const safeAmount = ethers.parseUnits('0.01', 'ether').toString(16)
  
    const transactionParameters = {
      to: SAFE_ADDRESS,
      value: `0x${safeAmount}`
    }
  
    const tx = await owner1Signer.sendTransaction(transactionParameters)
    console.log(`Deposit Transaction: https://testnet-scan.nal.network/tx/${tx.hash}`)
  }
  
  async function main(){
    await sendETHToSafe();
  }
  
  main();