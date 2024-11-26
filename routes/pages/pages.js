const express = require('express');
const axios = require('axios');
const router = express.Router();
const { verifyRole } = require('../../middleware/verify');

const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.redirect('/login');
  }
  next();
};

const isLoggedin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    return res.redirect('/main');
  }
  next();
};

router.get('/login', isLoggedin, (req, res) => {
  res.render('login');
});

router.get('/add-book', isAuthenticated, verifyRole('user'), async (req, res) => {
  try {
    let responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var user = responce.data;
    let show = req.userRole == "admin";
    res.render('add-book', { user, show });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  };
});

router.get('/add-user', isAuthenticated, async (req, res) => {
  try {
    let responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var user = responce.data;
    responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var users = responce.data;
    res.render('add-user', { users, user });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  };
});

router.get('/book-list', isAuthenticated, verifyRole('user'), async (req, res) => {
  try {
    let responce = await axios.get(`${req.protocol}://${req.get('host')}/api/book`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var books = responce.data;
    responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var user = responce.data;
    let show = req.userRole == "admin";
    res.render('book-list', { books, user, show });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  };
});

router.get('/main', isAuthenticated, verifyRole('user'), async (req, res) => {
  try {
    let response = await axios.get(`${req.protocol}://${req.get('host')}/api/user/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var user = response.data;
    let show = req.userRole == "admin";

    res.render('main', { user, show });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  };
});


router.get('/management-user', isAuthenticated, async (req, res) => {
  try {
    let responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var user = responce.data;
    responce = await axios.get(`${req.protocol}://${req.get('host')}/api/user`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie
      }
    });
    var users = responce.data;
    res.render('management-user', { users, user });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  };
});




module.exports = router;
