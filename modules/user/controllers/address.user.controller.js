const validator = require('@common/services/validator.js');

class UserAddressController {
  constructor(address) {
    this.address = address;
    this.getAddress = this.getAddress.bind(this);
  }

  getAddress(req, res) {
    res.json({ address: this.address });
  }

  setAddress(address) {
    const schema = {
      address: { type: 'string', min: 3, max: 255 },
    };

    const data = { address: 'Bandung' };

    console.log(validator.validate(schema, data));

    this.address = address;
  }
}

module.exports = UserAddressController;
