import  Safe from '@safe-global/protocol-kit'
// import { SafeConfig } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import {RPC_URL,TX_SERVICE_URL,CHAINID,SAFE_ADDRESS,OWNER_3_PRIVATE_KEY} from './config'


const apiKit = new SafeApiKit({
    chainId: CHAINID, // set the correct chainId
    txServiceUrl: TX_SERVICE_URL
  })

async function confirm(){
    const pendingTransactions = (await apiKit.getPendingTransactions(SAFE_ADDRESS)).results
    // Assumes that the first pending transaction is the transaction you want to confirm
    const transaction = pendingTransactions[0]
    const safeTxHash = transaction.safeTxHash

    const protocolKitOwner3 = await Safe.init({
        provider: RPC_URL,
        signer: OWNER_3_PRIVATE_KEY,
        safeAddress: SAFE_ADDRESS
    })

    const signature = await protocolKitOwner3.signHash(safeTxHash)
    const response = await apiKit.confirmTransaction(safeTxHash, signature.data)
    console.log(`confirmed,safeTxHash: ${safeTxHash} signature:${signature.data}`)
}

async function main(){
    await confirm();
}

main()