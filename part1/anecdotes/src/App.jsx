import { useState } from 'react'

let index = 0;
const App = () => {
  const anecdotes = [
    {quote: 'If it hurts, do it more often.', votes: 0},
    {quote: 'Adding manpower to a late software project makes it later!', votes: 0},
    {quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {quote: 'Premature optimization is the root of all evil.', votes: 0},
    {quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {quote: 'The only way to go fast, is to go well.', votes: 0}
  ]

  /* Quick note: This solution to the exercise is a bit different to how to 
  the app should work, instead of getting a random quote when clicking the button, 
  you get the next quote that is in the anecdotes list. Which is in my opinion much better
  since if you were to set it up to give you a random quote, you should make alongside it 
  a function that garantees that you don't get the same quote twice. That's all.
  */
  const [quotes, setQuotes] = useState(anecdotes)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [topQuote, setTopQuote] = useState(quotes[0].quote)
  const [topQuoteVotes, setTopQuoteVotes] = useState(0)
  const grabNextQuote = () => {
    if (index === anecdotes.length - 1) {
      index = 0
      setCurrentQuoteIndex(0)
    }
    else {
      index += 1
      setCurrentQuoteIndex(currentQuoteIndex + 1)
    }
   }
   const upvoteQuoteAndShowTopQuote = () => {
    const newQuotes = [...quotes]
    newQuotes[currentQuoteIndex].votes += 1;
    setQuotes(newQuotes)
    const quoteVotesArray = []
    quotes.forEach(quote =>  quoteVotesArray.unshift(quote.votes))
    quoteVotesArray.sort((a, b) => a-b)
    setTopQuoteVotes(quoteVotesArray[quoteVotesArray.length - 1])
    const found = quotes.find(index => index.votes === quoteVotesArray[quoteVotesArray.length - 1])
    setTopQuote(found.quote)
  }

   return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{quotes[currentQuoteIndex].quote}</p>
      <small>has {quotes[currentQuoteIndex].votes} votes</small> 
      <button onClick={upvoteQuoteAndShowTopQuote}>vote</button>
      <button onClick={grabNextQuote}>next anecdote</button>
      <h1>Anecdote with the most views</h1>
      <p>{topQuote}</p>
      <small>has {topQuoteVotes} votes</small>
    </div>
   )

}

export default App;