const fs = require('fs');
const { Universal, Node, MemoryAccount, Crypto } = require('@aeternity/aepp-sdk');
const OracleContractCode = fs.readFileSync(__dirname + '/../contracts/OracleConnector.aes', 'utf-8');
const contract_address = "ct_2Foy13tPWoJwEaJQpAnF26QYZemDyCu2TnJ89JxmgDNNarmobT";
var url = "https://sdk-testnet.aepps.com"
var processedIndex = 0
var Compilerurl = "https://sdk-testnet.aepps.com"
const BigNumber = require('bignumber.js');
require('dotenv').config()

console.log()

const keyPair = {
  "publicKey": process.env.PUBLIC_KEY,
  "secretKey": process.env.PRIVATE_KEY
}
var client = null
var contract = null
async function initNode () {
  client = await Universal({
    nodes: [
      {
        name: 'nodey',
        instance: await Node({
          url: url,
          internalUrl: url,
        }),
      }],
    accounts: [MemoryAccount({ keypair: keyPair })],
    compilerUrl: "https://latest.compiler.aepps.com"
  });
  contract = await client.getContractInstance(OracleContractCode, { contractAddress: contract_address })

  // createOracle()
  getOracleId()

}
initNode()

async function createOracle () {
  const buf7 = Buffer.from('oracle_plain', 'latin1').toString('hex');
  console.log(buf7)

  var arr = []
  for (let index = 0; index < 64; index = index + 2) {
    if (buf7[index] == undefined) {
      arr.push("x" + 00)
      continue
    }
    const element = buf7[index].toString(16);
    const element2 = buf7[index + 1].toString(16);
    arr.push("x" + element + element2)
  }
  console.log(arr)
  const keypair = Crypto.generateKeyPair()
  console.log(keypair.publicKey)
  let oracle = await contract.methods.createOracle(arr, keypair.publicKey)
  console.log(oracle.decodedResult)

  arr = []
  for (let index = 0; index < 64; index = index + 2) {
    if (oracle.decodedResult[index] == undefined) {
      arr.push("x" + 00)
      continue
    }
    const element = oracle.decodedResult[index].toString(16);
    const element2 = oracle.decodedResult[index + 1].toString(16);
    arr.push("x" + element + element2)
  }
  console.log(arr)

  let oracle_address = await contract.methods.oracleById(arr)
  console.log(oracle_address.decodedResult)

}


async function getOracleId () {
  arr = []
  decodedResult = "645c550c94158c6d143d8d8230bf2831ff271f4dcf5a6d67ba792b034b849f8e"
  for (let index = 0; index < 64; index = index + 2) {
    if (decodedResult[index] == undefined) {
      arr.push("x" + 00)
      continue
    }
    const element = decodedResult[index].toString(16);
    const element2 = decodedResult[index + 1].toString(16);
    arr.push("x" + element + element2)
  }
  console.log(arr)

  let oracle_address = await contract.methods.oracleById(arr)
  console.log(oracle_address.decodedResult)

}
// createOracle()


