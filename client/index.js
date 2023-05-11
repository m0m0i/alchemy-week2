const axios = require("axios");
const niceList = require("../utils/niceList.json");
const compromisedList = require("../utils/compromisedList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main(name) {
  const merkleTree = new MerkleTree(niceList);

  const idx = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(idx);

  if (idx === -1) {
    console.log(`Sorry ${name}, You are not on the list :(((`);
  } else {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: name,
      proof: proof,
    });

    console.log(`Result for ${name}: ${JSON.stringify({ gift })}`);
  }
}

async function fakeTreeProver(name) {
  const merkleTree = new MerkleTree(compromisedList);

  const idx = compromisedList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(idx);

  if (idx === -1) {
    console.log(`Sorry ${name}, You are not on the list :(((`);
  } else {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: name,
      proof: proof,
    });

    console.log(`Compromised Result for ${name}: ${JSON.stringify({ gift })}`);
  }
}

const name1 = "Norman Block";
const name2 = "Chocolate Brown";
const name3 = "Anthony White";
const name4 = "Bryant Thompson";
const name5 = "Olive Yew";
const name6 = "Allie Grater";

main(name1);
main(name2);
main(name3);
main(name4);
fakeTreeProver(name5);
fakeTreeProver(name6);
