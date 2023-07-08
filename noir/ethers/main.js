import { ethers } from "ethers";
import 'dotenv/config'

async function generateProverParams(privateKey, message)
{
  const wallet = new ethers.Wallet(
    privateKey
  );

  let hashedMessage = ethers.utils.hashMessage(message);

  const signature = await wallet.signMessage(message);

  let pubKey_uncompressed = ethers.utils.recoverPublicKey(hashedMessage, signature);
  let pubKey = pubKey_uncompressed.slice(4);
  let pub_key_x = pubKey.substring(0, 64);
  let pub_key_y = pubKey.substring(64);

  console.log("==Params==")
  console.log("Message: " + message)
  console.log("Hashed message: " + hashedMessage)
  console.log("Public Key X: " + pub_key_x)
  console.log("Public Key Y: " + pub_key_y)
  console.log("Signature: " + signature)

  console.log()
  console.log("==Nargo frieldy params==")
  console.log("Hashed message:")
  console.log(ethers.utils.arrayify(hashedMessage))
  console.log("Public Key X:")
  console.log(ethers.utils.arrayify("0x" + pub_key_x))
  console.log("Public Key Y:")
  console.log(ethers.utils.arrayify("0x" + pub_key_y))
  console.log("Signature:")
  console.log(ethers.utils.arrayify(signature))
}

async function main() {
  await generateProverParams(process.env.PRIVATE_KEY, "hi")
}

main();