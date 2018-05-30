const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contact_form')

const Enquiry = mongoose.model('Enquiry', {
    name: String,
    email: String,
    phone: String,
    message: String
})

// app.get('/', (req, res) => res.send('Hello something else!'))
app.use('/', express.static('../client'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.post('/contact', (req, res) => {
    // res.send(`Contact form has been submitted!
    // <br>

    // Name: ${req.body.name}<br>
    // Email: ${req.body.email}<br>
    // Phone: ${req.body.phone}<br>
    // Message: ${req.body.message}<br>
    // `)

    const enquiry = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })

    enquiry.save().then(() => {
        res.send('Thanks for your message!')
    }).catch((err) => {
        res.send(`Error! You did something wrong. The error is: ${err}`)
    })
})

