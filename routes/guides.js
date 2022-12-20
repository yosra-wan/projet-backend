var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

require("../models/guide");
const Guide = mongoose.model("guide");

let requireTokenGuide = require("../models/requireTokenGuide");
let requireTokenUserSwitch = require("../models/requireTokenUserSwitch");

router.post("/signup", async (req, res) => {
  let {
    idUser,
    listCategory,
    workArea,
    hourPrice,
    dayPrice,
    reservationType,
    ListOfbestplace,
    galerie,
    verifiedStatus,
    profilePicture,
  } = req.body;
  try {
    let guide = new Guide({
      idUser,
      listCategory,
      workArea,
      hourPrice,
      dayPrice,
      reservationType,
      ListOfbestplace,
      galerie,
      verifiedStatus,
      profilePicture,
    });
    await guide.save();
    let token = jwt.sign({ guideId: guide._id }, process.env.ACCES_TOKEN_KEY);
    res.send({ token });
    console.log("signup posted");
  } catch (err) {
    console.log(err);
    console.log("signup failed");
    res.status(401).send("signup failed");
  }
});

router.get("/signin", requireTokenUserSwitch, async (req, res) => {
  const { guide } = req;
  if (guide) {
    let token = jwt.sign({ guideId: guide._id }, process.env.ACCES_TOKEN_KEY);
    res.send({ token });
  } else {
    res.status(401).send("Password failed");
  }
});

router.get("/getAllGuide", async (req, res) => {
  let collectionGuide = Guide.find().catch((err) => res.status(401).send(err));
  collectionGuide.then((result) => res.send(result));
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
