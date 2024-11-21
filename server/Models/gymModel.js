const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema (
{
    place_name: {
        type: String, required: true, trim: true
    },
    status: {
        type: String, required: true, trim: true
    },
    last_count: {
        type: Number, required: true, min: 0
    },
    updated_time: {
        type: String, required: true, trim: true
    },
    percentage: {
        type: String, required: true, trim: true
    }
}
)

const regular_hours = new mongoose.Schema (
{
    // Either a range: mondayToThursday or a single day, friday, etc.
    day: {
        type: String, required: true, trim: true
    },
    hours: {
        type: String, required: true, trim: true
    }

}
)

const special_hours = new mongoose.Schema (
{
    range: {
        type: String, required: true, trim: true
    },
    hours: {
        type: String, required: true, trim: true
    }
}
)

// This is significant for BFit and nonexistent for Wooden (indicated by additional map that correlates the date of finals week to hours)
const finals_week = new mongoose.Schema (
{
    finals_week_date: {
        type: String, required: false, trim: true
    },
    schedule: {
        type: Map,                                      
        of: String,                                     
    }
}
)

const bfitSchema = new mongoose.Schema({
    zones: [zoneSchema],
    hours: [regular_hours],
    special_hours: [special_hours],
    finalsWeek: finals_week,
  }, { timestamps: true });
  
const woodenSchema = new mongoose.Schema({
    zones: [zoneSchema],
    hours: [regular_hours],
    special_hours: [special_hours]
}, { timestamps: true });

const BFit = mongoose.model('Bfit', bfitSchema);
const Wooden = mongoose.model('Wooden', woodenSchema)

module.exports = {BFit, Wooden};