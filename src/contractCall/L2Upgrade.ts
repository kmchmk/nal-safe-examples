import {ethers} from "ethers"
import {RPC_URL,TX_SERVICE_URL,CHAINID,SAFE_ADDRESS,OWNER_1_PRIVATE_KEY,OWNER_1_ADDRESS} from '../config'
import { MetaTransactionData,TransactionResult } from '@safe-global/safe-core-sdk-types'
import  Safe from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'


const apiKit = new SafeApiKit({
    chainId: CHAINID, // set the correct chainId
    txServiceUrl:TX_SERVICE_URL
  })
  
const ProxyAdmin = '0x4200000000000000000000000000000000000018'
const L2ERC721BridgeProxy = '0x4200000000000000000000000000000000000014'
const L2ERC721BridgeImplOld = '0xC0D3c0d3c0d3c0d3c0D3C0d3C0D3C0D3c0d30014'
const L2ERC721BridgeImplNew = ''

function getUpgradeCalldata(){
    const contractABI = [
        "function upgrade(address payable _proxy, address _implementation)"
    ];
    
    // 创建一个Interface实例
    const contractInterface = new ethers.Interface(contractABI);
    let data = contractInterface.encodeFunctionData('upgrade', [L2ERC721BridgeProxy, L2ERC721BridgeImplOld])
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
        to: ProxyAdmin,
        data: getUpgradeCalldata(),
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