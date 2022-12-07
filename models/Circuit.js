let mongoose = require("mongoose");
const circuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  placeNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  dateCircuit: {
    type: String,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  IndivdualePrice: {
    type: Number,
    required: true,
    default: null,
  },
  GroupPrice: {
    type: Number,
    required: true,
    default: null,
  },
  guideId: {
    type: String,
    required: true,
    default: null,
  },
  guideIdProposal: {
    type: [String],
    required: true,
  },
  totalPlace: {
    type: Number,
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
