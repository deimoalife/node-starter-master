const express = require('express');
const mongoose = require('mongoose');

const Question = mongoose.model('Question', {text: String});

let router = express.Router();

router.get('/', function (req, res) {
    Question.find().exec().then(questions => {
        res.send({status: true, data: questions});
    }).catch(err => {
        console.error(err);
        res.send({status: false, error: 'Internal Server Error'});
    });
});

router.post('/', function (req, res) {
    // @todo validate input
    if (!req.body) {
        return res.send({status: false, error: 'Bad request'});
    }

    if (!req.body.hasOwnProperty('text') || !req.body.text) {
        return res.send({status: false, error: 'Bad request: text must be nonempty string'});
    }

    let newQuestion = new Question(req.body);
    newQuestion.save().then(result => {
        res.send({status: true, data: result});
    }).catch(err => {
        console.error(err);
        res.send({status: false, error: 'Internal server error'});
    });
});

router.delete('/', function (req, res) {
    // @todo validate input
    Question.findOneAndDelete({_id: req.body.id}).then(result => {
        res.send({status: true, data: result});
    }).catch(err => {
        console.error(err);
        res.send({status: false, error: 'Internal server error'});
    })
});

module.exports = router;