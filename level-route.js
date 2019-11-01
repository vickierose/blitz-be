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
    items: req.body.items,
    isFirst: req.body.isFirst,
    isLast: true,
  });
  newLevel.save().then(() => {
    const queryForUpdate = Level.find({}).sort({'number': -1}).limit(2);
    queryForUpdate.exec((err, data) => {
      if(err) console.error(err);
      const docToUpdate = data[1];
      if (docToUpdate) {
        docToUpdate.isLast = false;
        docToUpdate.save();
      }
    });
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