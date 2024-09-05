import  Safe from '@safe-global/protocol-kit'
import {RPC_URL,SAFE_ADDRESS} from './config'


async function main(){
    const protocolKit = await Safe.init({
        safeAddress: SAFE_ADDRESS,
        provider: RPC_URL
    })
    const ownerAddresses = await protocolKit.getOwners()
    const threshold = await protocolKit.getThreshold()

    console.log("safe address:",SAFE_ADDRESS)
    console.log("owners:",ownerAddresses,"threshold:",threshold)
}

main()