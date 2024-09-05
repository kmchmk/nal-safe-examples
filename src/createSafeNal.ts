import {RPC_URL,OWNER_1_ADDRESS,OWNER_1_PRIVATE_KEY,OWNER_2_ADDRESS,OWNER_3_ADDRESS} from './config'

import { SafeFactory } from '@safe-global/protocol-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'


const safeAccountConfig: SafeAccountConfig = {
    owners: [
      OWNER_1_ADDRESS,
      OWNER_2_ADDRESS,
      OWNER_3_ADDRESS
    ],
    threshold: 2,
    // Optional params
  }

async function createSafe(){
  const safeFactory = await SafeFactory.init({
    provider: RPC_URL,
    signer: OWNER_1_PRIVATE_KEY
  })

  const callback = (txHash: string): void => {
    console.log("deploy tx hash:",txHash )
  }

  /* This Safe is tied to owner 1 because the factory was initialized with the owner 1 as the signer. */
  const saltNonce = new Date().getTime().toString()
  const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig,saltNonce,callback })

  let safeAddress = await protocolKitOwner1.getAddress()
  // txHash = await protocolKitOwner1.get

  console.log('Your Safe has been deployed,address:',safeAddress)
  console.log(`https://testnet-scan.nal.network/address/${safeAddress}`)
}

async function main(){
  await createSafe();
}

main();