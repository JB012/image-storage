<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        //Converts input into HTML entities, preventing code from 
        //being passed as a name to perform hacking.
        //USE THIS EVERY TIME when you grab data from user, don't trust
        //their inputs.
        //filename is name of the input
        $name = htmlspecialchars($_FILES["file_name"]["name"]);
        $conn = mysqli_connect("localhost", "root", "", "db_connect");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        //Use back-ticks (``) for SQL table/row/column names and single quotes ('') for string literals.

        $shouldAdd = true; 
        $query = "SELECT fldName FROM test_table";
        $rs = mysqli_query($conn, $query);
        
        if ($rs->num_rows > 0) {
            while ($info = $rs->fetch_assoc()) {
                if ($info === $name) {
                    $shouldAdd = false;
                }
            }
        }

        if ($shouldAdd) {
            $query = "INSERT INTO `test_table` (`fldName`) VALUES ('$name')";
            $rs = mysqli_query($conn, $query);

            if ($rs) {
                #echo "Name has been recorded in database: $name";
                //Extension: Says what type is the file
                $ext = pathinfo($name, PATHINFO_EXTENSION);
                $allowedTypes = array("jpg", "jpeg", "png", "gif");
                
                if (in_array($ext, $allowedTypes)) {
                    echo "<div class='profile'>";
                    echo "<img src='$name' class='image'>";
                    echo "</div>";
                }
            }
            else {
                echo "Nothing has been recorded";
            }
        }
        //To redirect to previous page.
        //readfile('index.html');
    }
    else {
        $conn = mysqli_connect("localhost", "root", "", "db_connect");
        $query = "SELECT fldName FROM test_table";
        $rs = mysqli_query($conn, $query);
    }
?>