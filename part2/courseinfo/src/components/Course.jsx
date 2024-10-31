const Header = ({ name }) => {
    return <h2>{name}</h2>
  }
  
  const Content = ({ parts }) => {
    const total = parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <>
        {parts.map(index => (
          <Part key={index.id} partName={index.name} exercises={index.exercises} />
        ))}
        <Total totalExercises={total} />
      </>
    )
  }
  
  const Part = ({ partName, exercises }) => {
    return (
      <p>{partName} {exercises}</p>
    )
  }
  
  const Total = ({ totalExercises }) => {
    return <strong>total of {totalExercises} exercises</strong>
  }
  
const Course = ({ courses }) => {
    return (
        <>
            {courses.map(index => (
                <div>
                    <Header key={index.id} name={index.name} />
                    <Content parts={index.parts} />
                </div>
            )
            )}
        </>
    )
}

export default Course;