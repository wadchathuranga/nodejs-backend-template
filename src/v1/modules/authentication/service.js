const Database = require("./database");

const { TE } = require('../../../helper');

// payload mapper function
const mapPayload = (data) => {
    const payload = {
        userInfo: {
            userId: data.userId,
            username: data.userName,
            email: data.email,
            role: data.role,
        }
    }
    return payload;
};

module.exports = {

    // user signup function
    userSignup: async (userData) => {
        const user = await Database.userSignup(userData);

        const payload = mapPayload(response);
        
        // generate access token function is defined in the schema
        const token = await user.genAccessToken(payload);
        return { token: token };
    },

    // user signin function
    userLogin: async (reqData) => {
        const user = await Database.userLogin(reqData);
        if (!user) TE({ code: 401, errmsg: "Invalid userId or password" });

        // compare the entered password with already saved password in the database function in define schema
        const isMatch = await user.matchPassword(reqData.password);
        if (!isMatch) TE({ code: 401, errmsg: "Invalid userId or password" });

        const payload = mapPayload(user);

        // generate access token function is defined in the schema
        const token = await user.genAccessToken(payload);
        return { token: token };
    },
}