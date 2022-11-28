let mongoose = require("mongoose");
const guideSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  ratingNumber: {
    type: String,
    required: true,
  },
  listCategory: {
    type: [String],
    required: true,
  },
  workArea: {
    type: [String],
    required: true,
  },
  hourPrice: {
    type: String,
    required: true,
  },
  dayPrice: {
    type: String,
    required: true,
  },
  reservationType: {
    type: String,
    required: true,
  },
  ListOfbestplace: {
    type: [String],
    required: true,
  },
  imgGroup: {
    type: [String],
    required: true,
  },
  verifiedStatus: {
    type: [String],
    required: true,
  },
});

let collectionName = "guides";
mongoose.model("guide", guideSchema, collectionName);
