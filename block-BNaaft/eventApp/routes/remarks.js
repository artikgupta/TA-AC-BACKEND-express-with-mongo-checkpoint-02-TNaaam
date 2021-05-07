var express = require('express');
var router = express.Router();

var Event = require("../models/event")

var Remark = require("../models/remark")

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) next(err);
    res.render('updateRemark', { remark: remark });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;

  console.log(req.body);
  Remark.findByIdAndUpdate(id, req.body, { new: true }, (err, updateremark) => {
    if (err) next(err);

    res.redirect('/events/' + updateremark.events);
  });
});



router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Remark.findByIdAndDelete(id, (err, deletedremark) => {
    if (err) next(err);
    res.redirect('/events/' + deletedremark.events);
  });
});


router.get("/:id/likes",(req,res,next)=>{
  let id = req.params.id;
  Remark.findByIdAndUpdate(id,{ $inc: { likes: 1 } },(err,updatedremark)=>{
    console.log(updatedremark)
    if(err) return next(err)
    res.redirect("/events/" + updatedremark.events )
  })
})


router.get("/:id/dislikes",(req,res,next)=>{
  let id = req.params.id;
  Remark.findByIdAndUpdate(id,{ $inc: { likes: -1 } },(err,updatedremark)=>{
    console.log(updatedremark)
    if(err) return next(err)
    res.redirect("/events/" + updatedremark.events )
  })
})

module.exports = router