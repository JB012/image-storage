<?php
include_once("connect.php");


$name = $_POST["custom_name"];
$tags = $_POST['tags'];

if (!isset($_POST['rightclick-image'])) {
    $file = htmlspecialchars($_FILES["file_name"]["name"]);
}
else {
    $file = $_POST['rightclick-image'];
}


/*
    $isDuplicate = false; 
    $query = "SELECT fldFile FROM test_table";
    $rs = mysqli_query($conn, $query);

    if ($rs->num_rows > 0) {
        //Going through each row in the database table.
        while ($info = $rs->fetch_assoc()) {
            
        }
    }
        */

    //Must be declared before outputs.

$isDuplicate = false;
if (!$isDuplicate) {
    $query = "INSERT INTO `test_table` (`fldName`, `fldSrc`, `fldTags`) VALUES ('$name', '$file', '$tags')";
    $rs = mysqli_query($conn, $query);

    if ($rs) {
        $images = array();
        $query = "SELECT * FROM test_table";
        $rs = mysqli_query($conn, $query);
        if ($rs) {
            if ($rs->num_rows > 0) {
                while ($info = $rs->fetch_assoc()) {
                    $images[] = array(
                        "name" => $info["fldName"],
                        "image" => $info["fldSrc"],
                        "tags" => $info["fldTags"]
                    );
                }
            }
            $images = json_encode($images);
            echo $images;
        }
        else {
            echo "Something went wrong with query.";
        }
    }
    else {
        echo "Something went wrong with query.";
    }
}
else {
    echo "File has previously been added";
}
    

?>