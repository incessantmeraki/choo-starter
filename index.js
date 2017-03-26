var html = require('choo/html')
var choo = require('choo')

var app = choo()
app.use(logger)
app.use(countStore)
app.route('/', mainView)
app.mount('body')

function mainView(state, emit) {
  return html`
    <body>
      <h1> count is ${state.count}</h1>
      <button onclick=${onIncrement}>Increment</button>
      <button onclick=${onReset}>Reset</button>
    </body>
  `

  function onIncrement() {
    emit('increment' ,1)
  }
  
  function onReset() {
    emit('reset')
  }
}

function logger (state, emitter) {
  emitter.on('*', function (messageName, data) {
    console.log('event', messageName, data)
  })
}

function countStore(state, emitter) {
  state.count = 0

  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })

  emitter.on('reset', function() {
    state.count = 0
    emitter.emit('render')
  })
}
