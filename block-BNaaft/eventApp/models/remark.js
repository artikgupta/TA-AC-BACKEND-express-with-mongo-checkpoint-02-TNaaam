var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var remarkSchema = new Schema(
  {
    title: { type: String, required: true },

    author: String,

    likes: { type: Number, default: 0 },
    events: { type: Schema.Types.ObjectId, ref: 'Event' },
  },
  { timestamps: true }
);

var Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;