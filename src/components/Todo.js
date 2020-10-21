import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function Todo({
  todo,
  index,
  completeTodo,
  removeTodo,
  completeTodoSubtask,
  removeTodoSubtask,
  editTodo,
  editTodoSubtask,
  addTodoSubtask,
}) {
  const [open, setOpen] = React.useState(false)
  const [input, setinput] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let submitModal = (params) => {
    addTodoSubtask(index, input)
    handleClose()
  }
  return (
    <div
      className='main-container'
      style={{
        textDecoration: todo.isComplete ? 'line-through solid red' : '',
      }}
    >
      <div
        className={` ${
          todo.isComplete ? 'task-container-complete' : 'task-container'
        }`}
      >
        <h1>{todo.title}</h1>
        <div>
          <Button
            color='primary'
            className='action-bottons'
            onClick={() => completeTodo(index)}
          >
            <CheckCircleIcon />
          </Button>
          <Button
            color='primary'
            className='action-bottons'
            onClick={() => removeTodo(index)}
          >
            <DeleteIcon />
          </Button>
          <Button
            color='primary'
            className='action-bottons'
            onClick={() => editTodo(index)}
          >
            <EditIcon />
          </Button>
          <Button
            color='primary'
            className='action-bottons'
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Button>
        </div>
      </div>

      <div>
        {todo &&
          todo.subtasks &&
          todo.subtasks.map((todosubtask, index) => (
            <div
              key={todosubtask.id}
              className={` ${
                todosubtask.isComplete
                  ? ' subtask-container-complete'
                  : 'subtask-container'
              }`}
            >
              <h3
                className='todo'
                style={{
                  textDecoration: todosubtask.isComplete
                    ? 'line-through solid red'
                    : '',
                }}
              >
                {todosubtask.title}
              </h3>
              <div>
                <IconButton onClick={() => completeTodoSubtask(todo.id, index)}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton onClick={() => editTodoSubtask(todo.id, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => removeTodoSubtask(todo.id, index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
      </div>
      {/* 
      //
      // ───👉🏼👉🏼👉🏼 MODAL ───────────────────────────────────────────────────────
      //
       */}
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle
            id='form-dialog-title'
            style={{ margin: 'auto', textAlign: 'center' }}
          >
            Split your tasks into Chunks
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Splitting tasks gives you clarity and a proper plan. Finish the
              toughest tasks first in the morning and then take on the easier
              tasks later in the day
            </DialogContentText>
            <br />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Subtask'
              type='text'
              fullWidth
              onChange={(e) => setinput(e.target.value)}
              variant='outlined'
            />
          </DialogContent>
          <DialogActions style={{ margin: 'auto', padding: '30px 0' }}>
            <Button onClick={submitModal} color='primary' variant='contained'>
              Submit
            </Button>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
