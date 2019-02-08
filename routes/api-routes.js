const Ques = require('../models/question');
const Comm = require('../models/comment');

module.exports = function (app) {

  app.get('/api/question', function (req, res) {
    Ques.find({})
      .then(function (data) {
        // let randomQuestion 
        // for (let i=0; i< data.length && i<=5; i++) {
        //    randomQuestion = data[Math.floor(Math.random() * data.length)];
        //  }
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.get('/api/comment', function (req, res) {
    Comm.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  
  app.post('/api/comment', function (req, res) {
    Comm.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
}