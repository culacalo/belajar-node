const UserAddress = require('@user/controllers/address.user.controller.js');

module.exports = (app) => {
    const userAddress = new UserAddress('Bandung');

    app.route('/get-address')
        .get(userAddress.getAddress);
};