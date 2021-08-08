const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  started: { type: Date, default: Date.now() },
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

projectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Project", projectSchema);
