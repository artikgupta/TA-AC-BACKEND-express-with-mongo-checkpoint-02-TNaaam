var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
title:{type:String, required:true, unique:true},
summary:{type:String,required:true, },
host:{type:String, required:true},
start_date:Date,
end_date:Date,
category:[String],
likes:{type:Number, default:0},
location:String,
remarks:[{type:Schema.Types.ObjectId, ref:"Remark"}]
  },
{timestamps:true}
);

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
