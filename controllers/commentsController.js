var Comment   = require('../models/comment');
var Anime   = require('../models/anime');

//create comments
function commentsCreate(req, res){
  Anime.findById(req.params.id, function(err, anime) {

    var comment = new Comment({
      title: req.body.title,
      content: req.body.content,
      user: req.body.user,
      anime: req.params.id
    });

    comment.save(function(err){
      if (err) return res.status(500).json({message: "problem saving comment"})

      anime.comments.push(comment);

      anime.save(function(err){
        if (err) return res.status(500).json({message: "problem adding comment to this anime"})
        res.status(201).json({comment: comment});
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

  Comment.findById(req.params.id, function(err, comment) {
    if (err) return res.status(500).json({message: 'could not find the comment you requested'})

    Anime.update({_id: comment.anime}, {$pull : {comments : comment._id}}, function(err, anime){
      if (err) return res.status(500).json({message: 'could not update anime comments collection'})
      comment.remove(function(err) {
        if (err) return res.status(500).json({ message: "There is was an error deleting your comment"})
      });
    });
    
    return res.status(200).json({ message: "Comment was removed"});
  });
}

module.exports = {
  commentsCreate: commentsCreate,
  commentUpdate: commentUpdate,
  commentDelete: commentDelete
}