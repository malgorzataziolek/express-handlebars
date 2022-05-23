const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

app.post('/contact/send-message', upload.single('uploadFile'), (req, res) => {
	const { author, sender, title, message } = req.body;

	if (author && sender && title && req.file && message) {
		res.render('contact', { isSent: true, fileName: req.file.originalname });
	} else {
		res.render('contact', { isError: true });
	}
});

app.get('/hello/:name', (req, res) => {
	res.render('hello', { layout: false, name: req.params.name });
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('/info', (req, res) => {
	res.render('info');
});

app.get('/history', (req, res, next) => {
	res.render('history');
});

app.use((req, res) => {
	res.status(404).send('404 not found...');
});

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});
