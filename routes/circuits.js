var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");

require("../models/circuit");
const Circuit = mongoose.model("circuit");

router.post("/setCircuit", async (req, res) => {
  let {
    name,
    dateCircuit,
    localization,
    guideIdProposal,
    totalPlace,
    imgGroup,
    category,
  } = req.body;
  try {
    let circuit = new Circuit({
      name,
      dateCircuit,
      localization,
      guideIdProposal,
      totalPlace,
      imgGroup,
      category,
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

router.get("/getCircuit", async (req, res) => {
  const { name } = req.headers;
  let circuit = await Circuit.findOne({ name }).catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
router.get("/getAllCircuit", async (req, res) => {
  let circuit = await Circuit.find().catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});

// router
//   .route("/:id")
//   .get(requireTokenGuide, (req, res) => {
//     !req.err ? res.send(req.user) : res.status(401).send(req.err);
//   })
//   .patch(requireTokenGuide, async (req, res) => {
//     const { recommended } = req.body;
//     await user
//       .findByIdAndUpdate(
//         { _id: req.user._id },
//         {
//           recommended: recommended,
//         }
//       )
//       .then((reselt) => res.send(true))
//       .catch((err) => res.status(401).send(err));
//   });
// router.param("id", async (req, res, next, _id) => {
//   let add = await user.findById({ _id }).catch((err) => (req.err = err));
//   req.user = add;
//   next();
// });
module.exports = router;
