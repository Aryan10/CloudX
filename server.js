const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require("path");
const paths = require(path.join(__dirname, 'views', 'links.js'));

app.use(bodyParser.json());
app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: false
}));

app.use("/shared", express.static("shared"));
app.use(express.static("public"));
app.get("/", function(request, response) {
  let username = request.session.user;
  if (username) {
    console.log('User Login: ' + username);
    response.sendFile(__dirname + "/views/index.html");
  }
  else response.sendFile(__dirname + "/views/login.html");
});
paths.forEach(p => {
  app.get("/" + p, function(request, response) {
    response.sendFile(__dirname + "/views/" + p + ".html");
  });
});

app.post('/class', async (req, res) => {
  try {
    console.log("POST ", req.body);
    const {id, method, args} = req.body;
    const obj = require("./class/" + id + ".js");
    const result = await obj[method](args);
    if (result.success) {
      req.session.user = result.username;
      // res.cookie('username', result.username, { path: '/' });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post('/user', async (req, res) => {
  res.json({ success: true, username: req.session.user })
});

const listener = app.listen(process.env.PORT, function() {
  console.log("App is listening on port " + listener.address().port);
});
