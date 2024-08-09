import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForms'
import Persons from './Persons'
import { useEffect } from 'react'
import personService from './services/persons.js'
import Notification from './Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [exitMessage, setExitMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const handleAddName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, newPerson)
          .then(() => {
            return personService.getAll()
          })
          .then(newPersons => {
            setPersons(newPersons)
          })
          .catch(error => {
            setErrorMessage(`Error: ${error.message}`)
          })
        setExitMessage(`Changed number of ${newPerson.name}`)
        setTimeout(() => {
          setExitMessage(null)
        }, 5000)
      }
    } else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setExitMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setExitMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error: ${error.message}`)
        })
    }
  }



  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          personService.getAll()
            .then(newPersons => {
              setPersons(newPersons)
            })
        })
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification exitMessage={exitMessage} errorMessage={errorMessage} />
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleAddName={handleAddName}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App