const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactAcademy', {useNewUrlParser: true});
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }));

app.use(bodyparser.urlencoded({extended:true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));// Set the views director

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res)=>{
    const params = { }
    res.status(200).render('services.pug', params);
});

app.get('/classes', (req, res)=>{
    const params = { }
    res.status(200).render('classes.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
}); 

app.get('/registration', (req, res)=>{
    const params = { }
    res.status(200).render('registration.pug', params);
});

app.get('/signup', (req, res)=>{
    const params = { }
    res.status(200).render('signup.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
         res.send("Your concern has been submitted successfully.")
    }).catch(()=>{
         res.status(400).send("Item was not saved to the databse")
    });
 

   // res.status(200).render('contact.pug');
});
    // START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});