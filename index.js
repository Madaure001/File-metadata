var express = require('express');
var cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//we create a post route for the file
app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
  //set a response object
  let resObj = {};

  //set response object name
  resObj['name'] = req.file.originalname;
  //set response object type
  resObj['type'] = req.file.mimetype;
  //set response object size
  resObj['size'] = req.file.size;

  res.json({resObj});
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
