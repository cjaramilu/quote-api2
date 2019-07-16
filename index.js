const path = require ('path')
const fs = require ('fs')

const V = require ('vaxic')
const app = new V()

const quoteContent = fs.readFileSync( path.join (__dirname, 'quote.txt')).toString()
const quotes = []

quoteContent.split('\n').forEach( (line) => {
	const lineParts =  line.split('---')
	quotes.push ( { 'quote': lineParts[0],
		'by' : lineParts[1] } )
})

app.add('GET', '/api/quote', (req, res) => {
	res.writeHead( 200, {
		'content-type' : 'application/json'
	})

	const randomQuote = quotes[Math.floor( Math.random()* quotes.length )]

	res.end (JSON.stringify ( randomQuote ))
})

app.add( (req, res) => {
	res.writeHead( 404, {
		'content-type' : 'application/json'
	})
	res.end (JSON.stringify ({
		'error' : 'Resource not found'
	}))
})

app.listen (8080, () => {
	console.log ("Listening..." )
}) 

