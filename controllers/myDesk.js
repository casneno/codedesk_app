

function showDesk(req, res, next) {
  res.render('myDesk', { title: 'CodeDesk' });
};

module.exports = {
  showDesk
};