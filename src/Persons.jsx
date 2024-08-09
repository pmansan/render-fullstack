const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <>
            {personsToShow.map(person =>
                <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ margin: '0px 10px 0px 0px' }}> {person.name} {person.number} </p>
                    <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
                </div>
            )}
        </>
    )
}

export default Persons