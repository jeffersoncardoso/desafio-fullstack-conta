
export function globalHandler(err, req, res, next) {
  // console.log("Veio request");
  // if (! err) {
  //   return next();
  // }

  res.status(500);
  res.send('500: Internal server error');
}