const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middeware/logger');
const router = require('./routes/api/members');
const members = require('./Members');

const app = express();

// Initialize middleware
//app.use(logger); //commented out for now becuase annoying

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Homepage route
app.get('/', (req, res) => {
  res.render('index', {
    title: "Hope's Members",
    members,
  });
});

// Initialize body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the api members routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
