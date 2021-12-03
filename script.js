const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText= document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

let apiQuotes = [];

//SHow Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

//Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true
}

//Show new quote
function newQuote(){
    loading()
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   //check if Author ield is null
   if (!quote.author){
    authorText.textContent='Unknown';
   } else {
    authorText.textContent=quote.author;
   }

   //check quote length to determine styling
   if(quote.text.length>50){
       quoteText.classList.add('long-quote')
   } else{
       quoteText.classList.remove('long-quote')
   }

    quoteText.textContent=quote.text;
    complete()
}
// Get quotes from api
async function getQuotes() {
    loading()
    const apiURL='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL)
        apiQuotes= await response.json();
        newQuote();
    }catch (error) {
        //this is where errors are dealt with
    }
}

//Tweet a QUote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//EventListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//onLoad

getQuotes();