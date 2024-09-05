import {ethers} from "ethers"
import {RPC_URL,TX_SERVICE_URL,CHAINID,SAFE_ADDRESS,OWNER_1_PRIVATE_KEY,OWNER_1_ADDRESS,ERC721_ADDRESS} from '../config'
import { MetaTransactionData,TransactionResult } from '@safe-global/safe-core-sdk-types'
import  Safe from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'


const apiKit = new SafeApiKit({
    chainId: CHAINID, // set the correct chainId
    txServiceUrl:TX_SERVICE_URL
  })
  

function getMintCalldata(){
    const contractABI = [
        "function mint(address to, uint256 id) public"
    ];
    
    // 创建一个Interface实例
    const contractInterface = new ethers.Interface(contractABI);
    
    const random = Math.floor(Math.random() * Math.pow(2, 15));
    let data = contractInterface.encodeFunctionData('mint', [OWNER_1_ADDRESS, random])
    // console.log(data)
    return data
}
async function createPropose(){
    const protocolKitOwner1 = await Safe.init({
        safeAddress: SAFE_ADDRESS,
        provider: RPC_URL,
        signer: OWNER_1_PRIVATE_KEY
    })

    // const amount = ethers.parseUnits('0.005', 'ether').toString()
    const safeTransactionData: MetaTransactionData = {
        to: ERC721_ADDRESS,
        data: getMintCalldata(),
        value: '0'
      }
    const nextNonce = await apiKit.getNextNonce(SAFE_ADDRESS)

    // Create a Safe transaction with the provided parameters
    const safeTransaction = await protocolKitOwner1.createTransaction({ transactions: [safeTransactionData], options: {nonce :nextNonce} })
    // Deterministic hash based on transaction parameters
    const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)

    // Sign transaction to verify that the transaction is coming from owner 1
    const senderSignature = await protocolKitOwner1.signHash(safeTxHash)

    await apiKit.proposeTransaction({
        safeAddress: SAFE_ADDRESS,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: OWNER_1_ADDRESS,
        senderSignature: senderSignature.data,
    })
    console.log(`tx proposed, safeTxHash: ${safeTxHash} signature:${senderSignature.data}`)
}

async function main(){
    await createPropose();
}

main()