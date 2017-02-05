var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT;
process.argv.forEach(function(arg, index){
  if(arg === '--port'){
    port = process.argv[index+1];
  }
});
app.use(express.static(path.join(__dirname, 'build')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`<h1>Error!</h1><p>Error Code : ${res.statusCode}</p>`);
});
app.listen(port, function(){
  console.log(`App listening on : http://localhost:${port}/`);
});
