<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include_once("connect.php");

        $query = "TRUNCATE test_table";
        $rs = mysqli_query($conn, $query);
        
        if ($rs) {
            //Get all file names
            $files = glob('images/*');
            foreach($files as $file) {
            if(is_file($file)) {
                // Deleting file
                unlink($file);
            }
}
            echo "SQL Table has been cleared";
        }
        else {
            echo "SQL Table has not been cleared";
        }
    }
?>