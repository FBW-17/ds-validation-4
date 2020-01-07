# Validation - Exercise #4 - Show validation errors in UI

Currently our validation errors are returned as JSON to the user.
Now we want to display the validation errors in the form.

In this exercise we are training redirects on errors and showing errors inside a form using template strings.

## Show validation errors in the form

Continue working on your previous exercise code OR copy your previous server.js file to here and repeat the installation of express and express-validator.

*  In POST route /register: 
    * If there are validation errors: redirect to the GET route /register with errors
        * Pass the errors to the URL using JSON.stringify(errors)
* Adapt the GET route / register
    * Read errors from the query string
    * If case of errors: Show these above the form in a ul tag
        * Read the errors string from the query string
		* Parse it into a JavaScript array using JSON.parse()
		* Now you got the errors as an array of error objects
			* Each error object has the fields "param" for the field and "msg" which contains the validation error message
            * Use the map() function to loop over they array and 
            convert each error entry to an HTML li element
            `errors.map(error => {...your code to convert to HTML li tag... }`
			* Create a string at the end which holds the HTML list of errors
			* Show this string above your form to show the user what he entered wrong

## BONUS TASK

* Show the errors directly next or below the corresponding form field (if any given)
    * => e.g. show a password length error next to the password field
