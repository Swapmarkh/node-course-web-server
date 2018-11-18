const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port =process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.use((req, res, next) =>{
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log', log + '\n');
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');

// });

app.use(express.static(__dirname + '/public'));


app.get('/',(req, res) => {
	res.render('welcome.hbs', {
		pageTitle : 'Welcome Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage :'Welcome to My Website',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/project', (req, res) => {
	res.render('project.hbs', {
		pageTitle : 'Projects'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage : 'Something went bad'
	});
});

app.listen(port, () =>{
	console.log(`Server is Up and running on ${port}`);
});