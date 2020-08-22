const mongoose = require('mongoose');
// const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name : {
        type : 'string',
        required: true,
        min : 3,
        max : 255
    },
    email : {
        type : 'string',
        required: true,
        min : 6,
        max : 255
    },
    password : {
        type : 'string',
        required: true,
        min : 6,
        max : 1024
    },
    date : {
        type : Date,
        default : Date.now  
    }
});

// userSchema.pre('save', async function(next) {
//     try {   
//         const salt = bcrypt.genSalt(10);
//         const hashedPassword = bcrypt.hash(this.password, salt, (err, hash) => {
//             if (err) {
//                 return next(err)
//             }
//             return hash;
//         });
//         this.password = hashedPassword
//         next();
//     }catch(err) {
//         next(err);
//     }
// });

module.exports = mongoose.model('User', userSchema);