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
            mondayToThursday: String,
            friday: String,
            saturday: String,
            sunday: String,
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

gymSchema.pre('save', function (next) {
    const gym = this;

    if (!gym.hours.defaultHours) {
        if (gym.name === 'John Wooden Center') {
            gym.hours.defaultHours = {
                mondayToThursday: '5:15 AM - 1:00 AM',
                friday: '5:15 AM - 10:00 PM',
                saturday: '8:00 AM - 8:00 PM',
                sunday: '8:00 AM - 11:00 PM',
            };
        } else if (gym.name === 'Bruin Fitness Center') {
            gym.hours.defaultHours = {
                mondayToThursday: '6:00 AM - 1:00 AM',
                friday: '6:00 AM - 9:00 PMM',
                saturday: '9:00 AM - 6:00 PM',
                sunday: '9:00 AM - 6:00 PM',
            };
        }
    }

    next();
});

const gymModel = mongoose.model('Gym', gymSchema);


module.exports = gymModel;