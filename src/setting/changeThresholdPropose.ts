import  Safe from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'

import {RPC_URL,TX_SERVICE_URL,CHAINID,SAFE_ADDRESS,OWNER_1_PRIVATE_KEY,OWNER_1_ADDRESS,OWNER_4_ADDRESS} from '../config'



const apiKit = new SafeApiKit({
    chainId: CHAINID, // set the correct chainId
    txServiceUrl:TX_SERVICE_URL
  })
  

async function createPropose(){
    const protocolKitOwner1 = await Safe.init({
        safeAddress: SAFE_ADDRESS,
        provider: RPC_URL,
        signer: OWNER_1_PRIVATE_KEY
    })
    const safeTransaction = await protocolKitOwner1.createChangeThresholdTx(3)
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