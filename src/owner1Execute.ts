import { TransactionResult } from '@safe-global/safe-core-sdk-types'
import  Safe from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { ContractTransactionReceipt, TransactionResponse } from 'ethers'

import {RPC_URL,TX_SERVICE_URL,CHAINID,SAFE_ADDRESS,OWNER_1_PRIVATE_KEY,SAFE_TX_HASH} from './config'



const apiKit = new SafeApiKit({
    chainId: CHAINID, // set the correct chainId
    txServiceUrl:TX_SERVICE_URL
  })
  
const waitSafeTxReceipt = async (
    txResult: TransactionResult
  ): Promise<ContractTransactionReceipt | null | undefined> => {
    const receipt =
      txResult.transactionResponse &&
      (await (txResult.transactionResponse as TransactionResponse).wait())
  
    return receipt as ContractTransactionReceipt
  }

async function execute(){

    const protocolKitOwner1 = await Safe.init({
        safeAddress: SAFE_ADDRESS,
        provider: RPC_URL,
        signer: OWNER_1_PRIVATE_KEY
    })

    const safeTransaction = await apiKit.getTransaction(SAFE_TX_HASH)
    const executeTxResponse = await protocolKitOwner1.executeTransaction(safeTransaction)
    const receipt = await waitSafeTxReceipt(executeTxResponse)

    if(receipt){
        console.log('Transaction executed:')
        console.log(`https://testnet-scan.nal.network/tx/${receipt.hash}`)
    }else{
        console.log('Receipt is null or undefined')
    }
}

async function main(){
    await execute();
}

main()