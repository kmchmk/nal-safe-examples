import SafeApiKit from '@safe-global/api-kit'
import {CHAINID,TX_SERVICE_URL,SAFE_ADDRESS} from './config'

async function main(){
    const apiKit = new SafeApiKit({
        chainId: CHAINID, // set the correct chainId
        txServiceUrl: TX_SERVICE_URL
      })
    const pendingTransactions = (await apiKit.getPendingTransactions(SAFE_ADDRESS)).results

    if(pendingTransactions.length == 0){
        console.log("pending transaction list is empty")
    }else{
        console.log("pending transaction list length:",pendingTransactions.length)
        console.log(pendingTransactions)
    }
}

main()