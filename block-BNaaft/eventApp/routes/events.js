var express = require('express');
var router = express.Router();

var Event = require("../models/event")

var Remark = require("../models/remark")

/* GET users listing. */

router.get('/create',(req,res)=>{
    res.render("createEvent")
})

router.post('/', (req, res, next) => {
    // console.log(req.body)
    Event.create(req.body, (err, event) => {
      if (err) next(err);
      res.redirect('/events');
    });
  });


  router.get("/",(req,res,next)=>{ 
    Event.find((err, events)=>{
      if(err) return next(err)
      res.render("allEvents",{events})
  
    })
  })



  router.get("/:id",(req,res,next)=>{
      let id = req.params.id 
    // Event.findById(id,(err, event)=>{
    //   if(err) return next(err)
    //   // Remark.find({ articleId: id }, (err, remark) => {
    //   //   if (err) next(err);
    //   //   res.render('singleEvent', { event, remark });
    //   // });
    // })

    Event.findById({_id:id}).populate('remarks').exec((err,event)=> {
      
      console.log(event)
      res.render('singleEvent', { event});
    })
  })


  router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
      if (err) next(err);
      res.render('updateEvent', { event: event });
    });
  });


  
  router.post('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    // console.log(req.body);
    Event.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedevent) => {
      if (err) next(err);
  
      res.redirect('/events/' + id);
    });
  });


router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndDelete(id, (err) => {
      if (err) next(err);
      Remark.deleteMany({ events: id }, (err, info) => {
    
        if (err) next(err);
        res.redirect('/events');
      });
    });
  });


  router.get('/:id/likes', (req, res, next) => {
    let id = req.params.id;
    console.log(req);
    Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, updatedevent) => {
      // if (err) next(err);
      res.redirect('/events/' + id);
    });
  });


  router.get('/:id/dislike', (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, updatedevent) => {
      if (err) next(err);
      res.redirect('/events/' + id);
    });
  });


//   Add Remark



router.post('/:id/remarks', (req, res, next) => {
    let eventId = req.params.id;
    req.body.events = eventId;
    console.log(req.body)
    Remark.create(req.body, (err, remark) => {
      if (err) next(err);
      Event.findByIdAndUpdate(
        eventId,
        { $push: { remarks: remark._id } },
        (err, event) => {
          if (err) next(err);
          res.redirect('/events/' + eventId);
        }
      );
    });

  });
  


      
    





module.exports = router;
