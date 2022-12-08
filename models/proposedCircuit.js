let mongoose = require("mongoose");
const proposedCircuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dateCircuit: {
    type: String,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
    default: null,
  },
  guideIdProposed: {
    type: [],
    required: true,
  },
  imgGroup: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  typeCircuit: {
    type: String,
    required: true,
  },
  etat: {
    type: Boolean,
    required: true,
    default: null,
  },
  idUser: {
    type: String,
    required: true,
  },
  totalplaceNumber: {
    type: Number,
    required: true,
  },
});
proposedCircuitSchema.pre("save", function (next) {
  next();
});
let collectionName = "proposedCircuits";
mongoose.model("proposedCircuit", proposedCircuitSchema, collectionName);
