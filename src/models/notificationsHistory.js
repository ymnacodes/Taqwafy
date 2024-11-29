const mongoose = require('mongoose');

const notificationHistorySchema = new mongoose.Schema({
  userID: { type: String, required: true },
  notificationType: { type: String, required: true }, 
  sentTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NotificationHistory', notificationHistorySchema);
