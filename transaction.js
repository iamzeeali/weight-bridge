const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  location: {
    type: String
  },
  driverName: {
    type: String
  },
  driverGsm: {
    type: String
  },
  primeMoverNumber: {
    type: String
  },
  trailerNumber: {
    type: String
  },
  trailerCapacity: {
    type: String
  },
  emptyWeight: {
    type: String
  },
  loadedWeight: {
    type: String
  },
  payloadWeight: {
    type: String
  },
  wayBillNumber: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

transactionSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Transaction = mongoose.model("Transaction", transactionSchema);
