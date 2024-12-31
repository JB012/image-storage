<?php
include_once("connect.php");


$name = htmlspecialchars($_FILES["file_name"]["name"]);
//Gets info on the type of the file.
$ext = pathinfo($name, PATHINFO_EXTENSION);
$allowedTypes = array("jpg", "jpeg", "png", "gif");

if (in_array($ext, $allowedTypes)) {
    $isDuplicate = false; 
    $query = "SELECT fldName FROM test_table";
    $rs = mysqli_query($conn, $query);

    if ($rs->num_rows > 0) {
        //Going through each row.
        while ($info = $rs->fetch_assoc()) {
            if ($info["fldName"] === $name) {
                $isDuplicate = true;
            }
        }
    }

    //Must be declared before outputs.

    if (!$isDuplicate) {
        $query = "INSERT INTO `test_table` (`fldName`) VALUES ('$name')";
        $rs = mysqli_query($conn, $query);
    
        if ($rs) {
            $images = array();
            $query = "SELECT * FROM test_table";
            $rs = mysqli_query($conn, $query);
            if ($rs) {
                if ($rs->num_rows > 0) {
                    while ($info = $rs->fetch_assoc()) {
                            $images[] = $info["fldName"];
                    }
                }
                $images = json_encode($images);
                echo $images;
            }
            else {
                echo "Something went wrong.";
            }
        }
        else {
            echo "Something went wrong.";
        }
    }
    else {
        echo "File has previously been added";
    }
    
} 
else {
    echo "File type must be jpg, jpeg, png, or gif.";
}
?>