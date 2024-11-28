const mongoose = require("mongoose");

// Schema for a zone
const zoneSchema = new mongoose.Schema(
  {
    place_name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    last_count: {
      type: Number,
      required: true,
      min: 0,
    },
    updated_time: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false } // To use as a sub-document without creating its own ObjectId
);

// Schema for regular hours
const regularHoursSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Schema for special hours
const specialHoursSchema = new mongoose.Schema(
  {
    range: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Schema for finals week (specific to Bfit)
const finalsWeekSchema = new mongoose.Schema(
  {
    finals_week_date: {
      type: String,
      required: false,
      trim: true,
    },
    schedule: {
      type: Map,
      of: String,
    },
  },
  { _id: false }
);

// Main schema for Bfit
const bfitSchema = new mongoose.Schema(
  {
    zones: {
      type: [zoneSchema],
      required: true,
    },
    hours: {
      type: [regularHoursSchema],
      required: false,
    },
    special_hours: {
      type: [specialHoursSchema],
      required: false,
    },
    finals_week: {
      type: finalsWeekSchema,
      required: false,
    },
  },
  { timestamps: true }
);

// Main schema for Wooden
const woodenSchema = new mongoose.Schema(
  {
    zones: {
      type: [zoneSchema],
      required: true,
    },
    hours: {
      type: [regularHoursSchema],
      required: false,
    },
    special_hours: {
      type: [specialHoursSchema],
      required: false,
    },
  },
  { timestamps: true }
);

const Bfit = mongoose.model("Bfit", bfitSchema);
const Wooden = mongoose.model("Wooden", woodenSchema);

module.exports = { Bfit, Wooden };