import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = (props) => {
  return (
    <table>
      <StatisticsLine text={`good`} count={props.goodCount} />
      <StatisticsLine text={`neutral`} count={props.neutralCount} />
      <StatisticsLine text={`bad`} count={props.badCount} />
      <StatisticsLine text={`all`} count={props.feedbackSum} />
      <StatisticsLine text={`average`} count={props.average} />
      <StatisticsLine text={`positive percentage`} count={props.positivePerc} />
    </table>
  )
}

const StatisticsLine = ({ text, count }) => {
  if (text === 'positive percentage') {
    return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{`${count}%`}</td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{count}</td>
      </tr>
    </tbody>
  )
}


const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  const [feedbackSum, setFeedbackSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePerc, setPositivePerc] = useState(0)

  const incrementGoodCount = () => {
    setGoodCount(goodCount + 1)
    const updatedGoodCount = goodCount + 1;
    setFeedbackSum(badCount + updatedGoodCount + neutralCount)
    const updatedFeedbackSum = feedbackSum + 1
    setAverage(feedbackSum / 3)
    setPositivePerc(updatedGoodCount / updatedFeedbackSum * 100)
  }
  const incrementBadCount = () => {
    setBadCount(badCount + 1)
    const updatedBadCount = badCount + 1;
    setFeedbackSum(updatedBadCount + goodCount + neutralCount)
    const updatedFeedbackSum = feedbackSum + 1
    setAverage(feedbackSum / 3)
    setPositivePerc(goodCount / updatedFeedbackSum * 100)
  }
  const incrementNeutralCount = () => {
    setNeutralCount(neutralCount + 1)
    const updatedNeutralCount = neutralCount + 1;
    setFeedbackSum(badCount + goodCount + updatedNeutralCount)
    const updatedFeedbackSum = feedbackSum + 1
    setAverage(feedbackSum / 3)
    setPositivePerc(goodCount / updatedFeedbackSum * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGoodCount} text="good" />
      <Button handleClick={incrementNeutralCount} text="neutral" />
      <Button handleClick={incrementBadCount} text="bad" />
      <h1>statistics</h1>
      {goodCount === 0 && badCount === 0 && neutralCount === 0 ? <p>No feedback given</p> : (
          <Statistics
          goodCount={goodCount}
          badCount={badCount}
          neutralCount={neutralCount}
          feedbackSum={feedbackSum}
          average={average}
          positivePerc={positivePerc}
          />
      )}

    </div>
  )
}

export default App;