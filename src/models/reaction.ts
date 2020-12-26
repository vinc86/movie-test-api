const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReactionSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
    },
    comment:{
        type: String
    }

})

export default ReactionSchema;