import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <TextField
        type='text'
        className='input'
        id='outlined-basic'
        label='What do you want to do today ?'
        variant='outlined'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
