const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const log= require('log4js');
const logger = log.getLogger("logs");
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;


const sequelize = require("./config/connection");


const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Very secret secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(require('./controllers/'));
app.use(cookieParser());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  logger.trace(`Doorman now listening on Port ${PORT}`)
});