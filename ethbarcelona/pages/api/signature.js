// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
const fs = require('fs');


export default function handler(req, res) {
    console.log("message received")
    const body = req.body;
    console.log(body)
    let hashedMessage = ethers.utils.hashMessage(body);
    let pubKey_uncompressed = ethers.utils.recoverPublicKey(hashedMessage, body);
    let pubKey = pubKey_uncompressed.slice(4);
    console.log(pubKey)

    let pub_key_x = pubKey.substring(0, 64);
    let pub_key_y = pubKey.substring(64);

    let arrayHashed = ethers.utils.arrayify(hashedMessage)
    let arrayX = ethers.utils.arrayify("0x"+pub_key_x)
    let arrayY = ethers.utils.arrayify("0x"+pub_key_y)
    let arrayBody = ethers.utils.arrayify(body)

    const sArrayHashed = Array.from(arrayHashed)
    const sArrayX = Array.from(arrayX)
    const sArrayY = Array.from(arrayY)
    const sArrayBody = Array.from(arrayBody)

    sArrayBody.pop()
    console.log(sArrayBody)


    const Prover = `
                    hashed_message = [${sArrayHashed}]
                    pub_key_x = [${sArrayX}]
                    pub_key_y = [${sArrayY}]
                    signature = [${sArrayBody}]
                    index = "1"
                    proposalId = "0"
                    root = "0x01604aca52c71e9a07bc5c317a6e8b6caa1e34f20039139fa69cf9e13a02118c"
                    hash_path = ["0x1A698687Cc5e5aD3809116bc27AfD5d628673cC4", "0x151a64570e4997739458455ba4ab5A535FD2E306"]
                    vote = "1"
                    `;

// Replace the above example with your actual TOML data
const filePath = 'Prover.toml';
fs.writeFile(filePath, Prover, (err) => {
    if (err) {
      console.error('Error writing TOML file:', err);
    } else {
      console.log('TOML file written successfully.');
    }
  });
  

    const response={"message":"all good"}
    res.send(response)
  }
  