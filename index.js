const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const Todo = require('./models/todo')
// const todosController = require('./controllers/todos_controller')
const url = 'mongodb://localhost:27017/todo-list-pt1'
mongoose.connect(url, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  Todo.find({}, function (err, allTodos) {
    if (err) throw err
    res.render('index', {
      todos: allTodos
  })
  })
})

app.get('/todo', function (req, res) {
  Todo.find({}, function (err, allTodos) {
    if (err) throw err
    res.render('todo', {
      todos: allTodos
    })
  })
})

app.post('/todo', function (req, res) {

  var newTodo = new Todo({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  })

  newTodo.save(function (err, newTodo) {
    if (err) throw err
    res.redirect('/todo')
  })
})

const port = 6660
app.listen(port, function () {
  console.log('running express todo list at ' + port)
})

// TODO. include express and body-parser, plugin in the todos controller and start listening
