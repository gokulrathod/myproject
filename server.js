var express = require('express');
var app = express();

var bodyParser = require('body-parser')
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
var mysql = require("mysql");


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodecrud_db"
});


// Retrieve all todos 
app.get('/getData', function (req, res) {
    con.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user list.' });
    });
});


// Add a new todo  
app.post('/addData', function (req, res) {
 
    var task = req.body;
	console.log(task);
    if (!task) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }
    
    
	console.log("INSERT INTO user (name, email, mobile, password) VALUES ('"+task.name+"','"+task.email+"','"+task.mobile+"','"+task.password+"')");
 
    con.query("INSERT INTO user (name, email, mobile, password) VALUES ('"+task.name+"','"+task.email+"','"+task.mobile+"','"+task.password+"')", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user added successfully.' });
    });
});


//  Delete todo
app.delete('/deleteData', function (req, res) {
 
    var task_id = req.body;
	console.log(task_id);
    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
    con.query("DELETE FROM user WHERE id = '"+task_id.id+"'", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User delete successfully.' });
    });
});    


//  Update todo with id
app.put('/updateData', function (req, res) {
 
	var data = req.body;
	console.log(data);
    var id = data.id;
    console.log(id);
    if (!id) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }
 
	
    con.query("UPDATE user SET name = '"+data.name+"', email = '"+data.email+"', mobile = '"+data.mobile+"', password = '"+data.password+"' WHERE id = '"+id+"'", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User updated successfully.' });
    });
});




app.listen(5000, function(req, res){
	console.log('your server is 5000')
})

