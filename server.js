const express = require('express');
const app = express();
const {check, body, validationResult} = require("express-validator")

// middleware to process / parse received FORM DATA
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// provide the user with a registration form
app.get('/register', (req, res) => {

    let strErrors = ""

    // req.query = STRING of errors

    // check if we received errors
    // create a string which contains an HTML list of all errors
    // and show it above the form
    // so the user gets some feedback 
    if(req.query.errors) {
        console.log(req.query.errors, typeof(req.query.errors))
        
        // parse the string with errors into an object
        let errors = JSON.parse(req.query.errors)
        console.log(errors, typeof(errors))
        
        // fetch the array of errors from the object
        errors = errors.errors
        console.log(errors)

        // loop through the errors
        // map / convert each error object into an err HTML string
        // concatenate these strings so we can output the string of errors
        // above our form
        strErrors = "<ul>" + errors.map(error => {
            return `<li>${error.param} field invalid: ${error.msg}</li>`
        }).join("") + "</ul>"
    }

    let strForm = `
        <h1>Register</h1>
        <div>${strErrors}</div>
        <form action="/register" method="POST">
            <label for="email">Email</label><br />
            <input type="text" id="email" name="email" />
            <br />
            <label for="password">Password</label><br />
            <input type="password" id="password" name="password" />
            <br />
            <button type="submit">Register</button>
        </form>
        <br /><br /><br />
        <a href="/register">Reset</a>
    `
    res.send(strForm)
})

// chain of validation checks
const validation = [
    body("email", "Not a valid email, please use format: 'email@hoster.domain'").isEmail(), 
    body("password", "Password must have between 4 and 10 characters").isLength({min: 4, max: 10})
]

// the register POST route
// => processes the registration
// we now have outsourced all validation checks from our logic
// and have a more clear separation of concerns now
app.post('/register', validation, (req, res) => {
    
    console.log("Register data sent:", req.body)

    const errors = validationResult(req)

    // if there are errors...
    if(!errors.isEmpty()) {
        // redirect the user back to the form 
        // append the errors to the query string so the receiver
        // can read them out
        return res.redirect('/register?errors=' + JSON.stringify(errors))
    }

    res.send(req.body)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.