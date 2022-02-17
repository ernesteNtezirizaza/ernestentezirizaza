  
  module.exports.getTokenExpirationDate = (amount, power_expiration_time) => {
    const date = power_expiration_time ? new Date(power_expiration_time) : new Date();
    return new Date(date.setDate(date.getDate() + amount / 100));
  };
  
  module.exports.getDaysDifference = (date) => {
      const diffTime = Math.abs(new Date(date) - new Date());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0
  };