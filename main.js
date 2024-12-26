var mysql = require('mysql');
const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "db_connect"
    });

    conn.connect((err) => {
        if (err) {throw err;}
        var query = "TRUNCATE TABLE test_table";
        conn.query(query, (err, result) => {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        })
        
    });
});