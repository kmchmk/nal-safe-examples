# nal-safe-examples

## Prepare environment
1. Download example code:
```
git clone https://github.com/nal-labs/nal-safe-examples.git
```
2. `yarn install` or `pnpm install` install dependencies
3. Enter `node_modules/@safe-global/safe-deployments/dist/assets/v1.3.0` directory，replace files with root directory `v1.3.0`

## Usage
### Create Safe Wallet
1. Fill content in `src/config.ts`
2. Execute command
```
tsc
node dist/createSafeNal.js
```
