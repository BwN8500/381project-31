//page
const pages = require('./pages/pages');
//api
const auth = require('./api/authRoutes');
const book = require('./api/bookRoutes');
const user = require('./api/userRoutes');
const bookImg = require('./api/bookImgRoutes');

const initRoutes = (app) => {
  //page
  app.use('/', pages);
  //api
  app.use('/api/auth', auth);
  app.use('/api/book', book);
  app.use('/api/user', user);
  app.use('/bookImg', bookImg);

  app.use((req, res) => {
    res.redirect('/login');
  });
};

module.exports = initRoutes;