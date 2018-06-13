const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xk": "http://www.google.com"
};

//function to generate unique shortURLS
function generateRandomString(){
  const uniqueKey = Math.random().toString(36).replace('0.','').split('').slice(0,6).join('');
  return uniqueKey;
}

//GET method routes

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls_index.ejs', templateVars)
})

app.get('/urls/new', (req, res) => {
  res.render('urls_new.ejs');
})

app.get('/urls/:id', (req, res) => {
  const shortUrlKey = req.params.id
  let templateVars = { shortURL: shortUrlKey, longURL: urlDatabase[shortUrlKey] };
  res.render('urls_show.ejs', templateVars)
})

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
})

app.get('/hello', (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL)
})




//POST method routes

app.post("/urls", (req, res) => {
  console.log(req.body);
  let newShortURL = generateRandomString();
  urlDatabase[newShortURL] = req.body['longURL'];
  res.redirect(`urls/${newShortURL}`);

})

app.post("/urls/:id/delete", (req, res) => {
  let siteID = req.params.id;
  delete urlDatabase[siteID];
  res.redirect('/urls');
})

app.post("/urls/:id", (req, res) => {
  let updatedLongURL = req.body['updatedLongURL'];
  let shortURL = req.params.id;
  urlDatabase[shortURL] = updatedLongURL;
  res.redirect('/urls');
})




app.listen(PORT, () => {
  console.log(`Example app listenign on port ${PORT}!`);
});


// var uid = function() {
// return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
// }