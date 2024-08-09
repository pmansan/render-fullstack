import { useState } from 'react'

const PersonForm = ({ handleAddName, newName, handleChangeName, newNumber, handleChangeNumber }) => {

    return (
        <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>number: <input  value={newNumber} onChange={handleChangeNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm