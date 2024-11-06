import { useState } from 'react'
import { Filter, PersonForm, Persons } from './components/Components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [nameToFilter, setNameToFilter] = useState("")

  const addData = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
      setNewName("")
      setNewNumber("")
      return
    }
    else {
      const newPersonsObj = { name: newName, number: newNumber }
      setPersons(persons.concat(newPersonsObj))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameToFilter(event.target.value)
  }

  const personFormProps = {
    newName: newName,
    handleNameChange: handleNameChange,
    newNumber: newNumber,
    handleNumberChange: handleNumberChange,
    addData: addData
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameToFilter={nameToFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm data={personFormProps} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameToFilter={nameToFilter} />
    </div>
  )
}

export default App