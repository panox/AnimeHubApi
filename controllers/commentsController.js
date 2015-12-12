var Comment   = require('../models/comment');
var Anime   = require('../models/anime');

//create comments
function commentsCreate(req, res){
  var comment = new Comment(req.body);

  comment.save(function(err) {
    if (err) return res.status(500).json({message: "could not create new  comment"});

    res.status(200).json({comment: comment});
  });

  User.findById(req.body.user, function(err, user) {

    var image = new Image({
      title: req.body.title,
      location: req.body.location,
      image: req.file.key,
      user: req.body.user
    });

    image.save(function(err){
      if (err) return res.status(500).json({message: "problem saving image"})

      user.images.push(image);

      user.save(function(err){
        if (err) return res.status(500).json({message: "problem adding image to this user"})
        res.status(201).json({image: image});
      });
    
    });

  })
}
// edit comments
function commentUpdate(req, res){
  Comment.findById(req.params.id,  function(err, comment) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!comment) return res.status(404).json({message: 'No comment found.'});

    if (req.body.title) comment.title = req.body.title;
    if (req.body.content) comment.content = req.body.content;
    if (req.body.score) comment.score = req.body.score;

    comment.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Comment successfully updated.', comment: comment});
    });
  });
}
// delete comments
function commentDelete(req, res){
  Comment.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Could not delete comment'});
   res.status(200).json({message: 'Comment has been successfully deleted'});
  });
}

module.exports = {
  commentsCreate: commentsCreate,
  commentUpdate: commentUpdate,
  commentDelete: commentDelete
}