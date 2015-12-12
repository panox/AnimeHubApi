var Comment   = require('../models/comment');

//create comments
function commentsCreate(req, res){
}
// edit comments
function commentUpdate(req, res){
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