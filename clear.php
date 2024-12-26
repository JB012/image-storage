<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $conn = mysqli_connect("localhost", "root", "", "db_connect");

        if ($conn->connect_error) {
            die("Connection error: " . $conn->connect_error);
        } 

        $query = "TRUNCATE test_table";
        $rs = mysqli_query($conn, $query);
        
        if ($rs) {
            echo "SQL Table has been cleared";
        }
        else {
            echo "SQL Table has not been cleared";
        }
    }
?>