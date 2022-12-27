const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        trimmed: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:[/[\w.]+@\w+\.\w{3}/, 'Is not a email address'],

    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],

}
 
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

// Make model of User

module.exports = User;
