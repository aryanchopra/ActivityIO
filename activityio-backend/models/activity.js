const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  date: { type: String, default: Date.now },
  sleep: { type: Number, min: 0, max: 24 },
  qualityofsleep: { type: Number, min: 1, max: 10 },
  workout: { type: Number, min: 0, max: 6 },
  qualityofday: { type: Number, min: 1, max: 10 },
  meditate: Boolean,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

activitySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Activity", activitySchema);
