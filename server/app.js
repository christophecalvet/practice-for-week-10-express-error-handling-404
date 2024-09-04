const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.use((req, res, next) => {
  const myError = new Error("Sorry, the requested resource couldn't be found");
  myError.statusCode = 404;
  next(myError);
});

app.use((err, req, res, next) => {

  console.error(err);
  res.statusCode = (err.statusCode || 500);
  const body =  {
    message: err.message,
    statusCode: res.statusCode
  }
  res.json(body)
});



const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
