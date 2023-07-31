const cookieAge = (req, res, next) => {
  res.cookie('remember', '1', {
    path: '/',
    httpOnly: true,
    maxAge: null
  });

  next();
};