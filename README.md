# nal-safe-examples

## Prepare environment
1. Download example code:
```
git clone https://github.com/nal-labs/nal-safe-examples.git & cd nal-safe-examples
```
2. Execute `yarn install` or `npm install` to install dependencies
3. Execute command to replace files.
```
cp -r ./v1.3.0/* ./node_modules/@safe-global/safe-deployments/dist/assets/v1.3.0/
```

## Usage
### Create Safe Wallet
1. Fill content in `src/config.ts`
2. Execute command
```
tsc
node dist/createSafeNal.js
```
