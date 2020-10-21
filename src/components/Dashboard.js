import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import auth from '../auth'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import logo from './assets/logo-TC.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSound from 'use-sound'
import cheering from './assets/cheering.mp3'
import bloop from './assets/bloop.mp3'
import Footer from './Footer'
import EmptyContainer from './EmptyContainer'
import Confetti from 'react-dom-confetti'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#1D2B30',
  },
}))

function Dashboard(props) {
  const [todos, setTodos] = useState([])
  const [confetti, setconfetti] = useState(false)
  const [play] = useSound(cheering)
  const [playBloop] = useSound(bloop)

  const notify = () =>
    toast.success('YOU are Awesome!🍾', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

  const errornotify = () =>
    toast.error('Oops...Try again', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

  let fetchTodos = () => {
    axios
      .get('https://arcane-ravine-70872.herokuapp.com//todos/')
      .then(function (response) {
        let reversedarray = response.data.reverse()
        setTodos(reversedarray)
      })
      .catch(function (error) {
        // handle error

        errornotify()
      })
      .then(function () {
        // always executed
      })
  }

  let postTodos = (title) => {
    axios
      .post('https://arcane-ravine-70872.herokuapp.com//todos/', {
        title: title,
        isComplete: false,
        subtasks: [],
      })
      .then(function (response) {
        // notify()
        // play()
        playBloop()
      })
      .catch(function (error) {
        errornotify()
      })
  }

  let deleteTodos = (id) => {
    axios
      .delete(`https://arcane-ravine-70872.herokuapp.com//todos/${id}`)
      .then(function (response) {
        notify()
        play()
        setconfetti(true)
        setconfetti(false)
      })
      .catch(function (error) {
        errornotify()
      })
  }

  let patchTodo = (id, title, isComplete, subtasks) => {
    axios
      .patch(`https://arcane-ravine-70872.herokuapp.com//todos/${id}`, {
        title: title,
        isComplete: isComplete,
        subtasks: subtasks,
      })
      .then(function (response) {})
      .catch(function (error) {
        errornotify()
      })
  }

  useEffect(() => {
    let fetchTodos = () => {
      axios
        .get('https://arcane-ravine-70872.herokuapp.com//todos/')
        .then(function (response) {
          let reversedarray = response.data.reverse()
          setTodos(reversedarray)
        })
        .catch(function (error) {
          // handle error

          errornotify()
        })
        .then(function () {
          // always executed
        })
    }
    fetchTodos()
  }, [])

  const addTodo = (title) => {
    const newTodos = [
      { id: uuidv4(), title, isComplete: false, subtasks: [] },
      ...todos,
    ]
    setTodos(newTodos)
    postTodos(title)
    fetchTodos()
  }

  const addTodoSubtask = (index, input) => {
    // let newSubtask = prompt('Please add a subtask')
    let newSubtask = input
    const newTodos = [...todos]

    newTodos &&
      newTodos[index].subtasks.push({
        id: uuidv4(),
        title: newSubtask,
        isComplete: false,
      })

    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)

    // setTodos(newTodos)
  }

  const completeTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const completeTodoSubtask = (todoId, todosubtaskId) => {
    let index = todos.findIndex((element) => element.id === todoId)

    const newTodos = [...todos]
    newTodos[index].subtasks[todosubtaskId].isComplete = !newTodos[index]
      .subtasks[todosubtaskId].isComplete
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const removeTodo = (index) => {
    const newTodos = [...todos]
    deleteTodos(newTodos[index].id)
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const removeTodoSubtask = (todoId, todosubtaskId) => {
    let index = todos.findIndex((element) => element.id === todoId)

    const newTodos = [...todos]
    newTodos[index].subtasks.splice(todosubtaskId, 1)
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const editTodo = (index) => {
    var editted = prompt('Please edit here', todos[index].title)

    const newTodos = [...todos]
    if (editted) {
      newTodos[index].title = editted
      patchTodo(
        newTodos[index].id,
        newTodos[index].title,
        newTodos[index].isComplete,
        newTodos[index].subtasks
      )
      setTodos(newTodos)
    }
  }

  const editTodoSubtask = (todoId, todosubtaskId) => {
    let index = todos.findIndex((element) => element.id === todoId)
    const newTodos = [...todos]
    var edittedSubtask = prompt(
      'Please edit here',
      newTodos[index].subtasks[todosubtaskId].title
    )

    if (edittedSubtask) {
      newTodos[index].subtasks[todosubtaskId].title = edittedSubtask
      patchTodo(
        newTodos[index].id,
        newTodos[index].title,
        newTodos[index].isComplete,
        newTodos[index].subtasks
      )
      setTodos(newTodos)
    }
  }

  const classes = useStyles()

  return (
    <div className='app'>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar className='toolbar'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt='Torre Capital' />
          <Typography variant='h6' className={classes.title}></Typography>
          <Button
            onClick={() => {
              auth.logout(() => {
                props.history.push('/')
              })
            }}
            color='inherit'
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className='todo-list'>
        <TodoForm addTodo={addTodo} />

        {todos.length ? (
          todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              completeTodoSubtask={completeTodoSubtask}
              removeTodo={removeTodo}
              removeTodoSubtask={removeTodoSubtask}
              editTodo={editTodo}
              editTodoSubtask={editTodoSubtask}
              addTodoSubtask={addTodoSubtask}
            />
          ))
        ) : (
          <EmptyContainer />
        )}
      </div>
      <ToastContainer />
      <div className='confetti-container'>
        <Confetti active={confetti} />
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
