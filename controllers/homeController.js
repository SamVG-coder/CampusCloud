

exports.getHomePage = (req, res) => {
    res.render('home/home', {
      path: '/home',
    });
  };
  exports.getInterviewPage = (req, res) => {
    res.render('home/interview', {
      path: '/interview',

    });
  };
  exports.getMajorProjectPage = (req, res) => {
    res.render('home/majorproject', {
      path: '/majorproject',
    });
  };
  exports.getMiniProjectPage = (req, res) => {
    res.render('home/miniproject', {
      path: '/miniproject',
    });
  };
  
  