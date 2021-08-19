const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  sleep: { type: Number, min: 0, max: 24, required: true },
  qualityofsleep: { type: Number, min: 1, max: 10, required: true },
  workout: { type: Number, min: 0, max: 6, required: true },
  qualityofday: { type: Number, min: 1, max: 10, required: true },
  meditate: { type: Boolean, required: true },
  productivehours: { type: Number, required: true },
  project: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    hours: {
      type: Number,
      min: 0,
      max: 24,
      default: 0,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
