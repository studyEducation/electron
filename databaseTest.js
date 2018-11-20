const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});


function dbConnect() {
  connection.connect();
}

function dbEnd() {
  connection.end();
}

dbConnect();

function dbGet() {
  connection.query('SELECT * FROM test', function (error, results, fields) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
    console.log(fields);

    var result = document.querySelector('#dbResult');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }

    var table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    result.appendChild(table)
    
    if (results.length != 0) {
      var tr = document.createElement('tr');
      table.appendChild(tr)

      for (var key in results[0]) {
        var th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th)
      }

      for (var i = 0; i < results.length; i++) {
        tr = document.createElement('tr');
        table.appendChild(tr)
        
        for (var key in results[i]) {
          var td = document.createElement('td');
          td.textContent = results[i][key];
          tr.appendChild(td)
        }
      }
    }

    

  });
}

function dbEdit() {
  var id = document.querySelector('#setId').value;
  var name = document.querySelector('#setName').value;
  var num = document.querySelector('#setNum').value;

  if (id && name && num)
  {
    connection.query("UPDATE test SET name = '" + name + "', num = " + num + " WHERE id = " + id, function (error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(results);
      dbGet();
    });
  }
}

function dbAdd() {
  var name = document.querySelector('#addName').value;
  var num = document.querySelector('#addNum').value;

  if (name && num)
  {
    connection.query("INSERT INTO test  (name, num) VALUES ('" + name + "', " + num + ")", function (error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(results);
      dbGet();
    });
  }
}

function dbDelete() {
  var id = document.querySelector('#deleteId').value;

  if (id)
  {
    connection.query("DELETE FROM test WHERE id = " + id, function (error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(results);
      dbGet();
    });
  }
}

document.querySelector('#BtnDBGet').addEventListener('click', dbGet);
document.querySelector('#BtnDBEdit').addEventListener('click', dbEdit);
document.querySelector('#BtnDBAdd').addEventListener('click', dbAdd);
document.querySelector('#BtnDBDelete').addEventListener('click', dbDelete);