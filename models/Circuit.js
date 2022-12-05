let mongoose = require("mongoose");
const circuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  placeNumber: {
    type: String,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  IndivdualePrice: {
    type: String,
    required: true,
  },
  GroupPrice: {
    type: [String],
    required: true,
  },
  guideId: {
    type: String,
    required: true,
  },
  reservationType: {
    type: String,
    required: true,
  },
  ListMembreReserver: {
    type: [String],
    default: [],
  },
  imgGroup: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

let collectionName = "circuits";
mongoose.model("circuit", circuitSchema, collectionName);
