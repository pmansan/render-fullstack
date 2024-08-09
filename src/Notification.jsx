import './index.css' 

const Notification = ({ exitMessage, errorMessage }) => {
  console.log(exitMessage, errorMessage)
  if (exitMessage === null && errorMessage === null) {
    return null
  }

  const message = errorMessage || exitMessage
  const className = errorMessage ? 'error' : 'exit'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification
