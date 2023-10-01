const UserSchema = require('./schema');

module.exports = {
    UserSchema: UserSchema, // if you need you can use schema inside the service file as when uncommen this

    userSignup: async (data) => {
        const res = new UserSchema(data);
        return await res.save();
    },

    userLogin: async (data) => {
        return await UserSchema.findOne({ userId: data.userId }).select('+password');
    },

};