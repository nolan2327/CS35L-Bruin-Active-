const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema( 
   {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    hours: {
        defaultHours: {
            mondayToThursday: { 
                type: String, 
                required: true
            },
            friday: { 
                type: String, 
                required: true
            },
            saturday: { 
                type: String, 
                required: true
            },
            sunday: { 
                type: String, 
                required: true
            },
        },
        specialHours: [
            {
                dates: {
                    type: String,
                    required: true
                },
                hours: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    facilities: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            occupancy: {
                capacity: {
                    type: Number,
                    required: true,
                    min: 0
                },
                current: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        }
    ]
   }
);


const gymModel = mongoose.model('Gym', gymSchema);

module.exports = gymModel;