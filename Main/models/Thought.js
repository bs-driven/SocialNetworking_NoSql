const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],

}
 
);

// Add virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// Make model of Thought
const Thought = model('thought', thoughtSchema)

module.exports = Thought;
