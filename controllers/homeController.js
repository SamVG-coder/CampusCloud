require('../config/is-auth');

exports.getHomePage = (req, res) => {
    res.render('home/home', {
      path: '/home',
      isAuth:req.isAuthenticated()
    });
  };
  exports.getInterviewPage = (req, res) => {
    res.render('home/interview', {
      path: '/interview',
      isAuth:req.isAuthenticated()
    });
  };
  exports.getMajorProjectPage = (req, res) => {
    res.render('home/majorproject', {
      path: '/majorproject',
      isAuth:req.isAuthenticated(),
      projects:''
    });
  };
  exports.getMiniProjectPage = (req, res) => {
    res.render('home/miniproject', {
      path: '/miniproject',
      isAuth:req.isAuthenticated(),
      projects:''
    });
  };
  
  