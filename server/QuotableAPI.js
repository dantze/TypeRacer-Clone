async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random?minLength=100')
    const quote = await response.json()
    
    // Output the quote and author name
    console.log(quote.content)
    console.log(`- ${quote.author}`)
  }

module.exports = { randomQuote };

