const express = require('express');
const router = express.Router();

const Level = require('./level-model');

router.get('/', (req, res) => {
  Level.find({}).sort({'number': 1}).lean().exec((err, levels) => {
    if(err) res.send(err);
    res.json(levels);
  })
})

router.post('/', (req, res) => {
  const newLevel = new Level({
    title: req.body.title,
    number: req.body.number,
    items: req.body.items
  });
  newLevel.save().then(() => {
    Level.find({}).sort({'number': 1}).lean().exec((err, levels) => {
      if(err) res.send(err);
      res.json(levels);
    })
  })
})

router.get('/:number', (req, res) => {
  Level.findOne({number: req.params.number}).lean().exec((err, level) => {
    if(err) res.send(err);
    res.json(level);
  })
})

module.exports = router;