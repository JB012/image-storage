<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        //Converts input into HTML entities, preventing code from 
        //being passed as a name to perform hacking.
        //USE THIS EVERY TIME when you grab data from user, don't trust
        //their inputs.
        $name = htmlspecialchars($_POST['user_name']);

        $conn = mysqli_connect("localhost", "root", "", "db_connect");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        //Use back-ticks (``) for SQL table/row/column names and single quotes ('') for string literals.
        $query = "SELECT * from `test_table`";

        $query = "INSERT INTO `test_table` (`fldName`) VALUES ('$name')";
        $rs = mysqli_query($conn, $query);

        if ($rs) {
            echo "Name has been recorded in database";
        }
        else {
            echo "Nothing has been recorded";
        }
        //To redirect to previous page.
        //readfile('index.html');
    }
    else {
        $conn = mysqli_connect("localhost", "root", "", "db_connect");
        $query = "SELECT fldName FROM test_table";
        $rs = mysqli_query($conn, $query);
        
        if ($rs->num_rows > 0) {
            $info = $rs->fetch_all();
            var_dump($info);
        }
    }
?>