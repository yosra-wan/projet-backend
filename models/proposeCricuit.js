let mongoose = require("mongoose");
const proposeCricuitSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  nbPlace: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  locations: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
});
let collectionName = "proposeCricuit";
mongoose.model("proposeCricuit", proposeCricuitSchema, collectionName);
