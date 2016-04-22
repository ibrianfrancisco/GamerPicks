var User = require('../models/user.js')

module.exports = {
  all_users: function(req, res){
    User.find({}).exec(function(err, users){
      if (err) throw err
      res.json({success: true, users: users})
    })
  },
  one_user: function(req, res){
    User.findById(req.params.id).exec(function(err, user){
      if (err) throw err
      res.json({sucess: true, user: user})
    })
  },
  create_user: function(req, res){
    var new_user = new User(req.body)
    new_user.save(function(err, user){
      if (err) throw err
      res.json({success: true, message: 'user created', user: user})
    })
  },
  edit_user: function(req, res){
    User.findById(req.params.id).exec(function(err, user){
      if (err) throw err
      user.username = req.body.username
      user.save(function(err, updated_user){
        if (err) throw err
        res.json({success: true, message: 'user saved', user: updated_user})
      })
    })
  },
  delete_user: function(req, res){
    User.findById(req.params.id, function(err, user){
      if (err) throw err
      User.remove({_id: user._id}, function(err){
        if (err) throw err
        res.json({success: true, message: 'user deleted'})
      })
    })
  }
}