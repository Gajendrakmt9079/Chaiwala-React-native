const Address = require('../models/Address');

exports.addAddress = async (req, res) => {
  const { street, city, state, zipCode, country } = req.body;

  try {
    const newAddress = await Address.create({
      userId: req.user.id,
      street,
      city,
      state,
      zipCode,
      landmark,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
