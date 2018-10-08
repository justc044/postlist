const Post = require('../models/post.model');

exports.post_create = function(req, res){
    let post = new Post(
        {
            createDate: req.body.createDate,
            title: req.body.title,
            content: req.body.content
        }
    );

    post.save(function(err){
        if (err){
            alert("Error");
            return next(err);
        }
        res.redirect('../../');
    });
};

exports.post_read = function(req, res){
    Post
        .find()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            console.error(err)
        })
};

exports.post_update = function(req, res){
    Post
        .findOneAndUpdate(
            req.params.id
            , req.body
            , { new: true }
            , (err, blog) => {
                if (err) return res.status(500).send(err);
            }
        );
};

exports.post_delete = function(req, res){
    Post
        .findOneAndDelete(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            return res.status(200).end();
        })
        .catch(err => next(err));
};