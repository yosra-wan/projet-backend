var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
require("../models/proposedCircuit");
const ProposedCircuit = mongoose.model("proposedCircuit");
router.post("/setProposedCircuit", async (req, res) => {
  let {
    name,
    dateCircuit,
    localization,
    guideIdProposed,
    totalPlace,
    imgGroup,
    category,
    typeCircuit,
    idUser,
    totalplaceNumber,
  } = req.body;
  try {
    let circuit = new ProposedCircuit({
      name,
      dateCircuit,
      localization,
      guideIdProposed,
      totalPlace,
      imgGroup,
      category,
      typeCircuit,
      idUser,
      totalplaceNumber,
    });
    await circuit.save();

    res.send(circuit);
    console.log("circuit posted");
  } catch (err) {
    console.log(err);
    console.log("circuit failed");
    res.status(401).send("circuit failed");
  }
});

router.get("/getProposedCircuit", async (req, res) => {
  const { name } = req.headers;
  let circuit = await ProposedCircuit.findOne({ name }).catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
router.get("/getAllProposedCircuit", async (req, res) => {
  let circuit = await ProposedCircuit.find().catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
module.exports = router;
