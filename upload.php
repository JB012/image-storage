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

    header("Location: index.php");
    if (!$isDuplicate) {
        $query = "INSERT INTO `test_table` (`fldName`) VALUES ('$name')";
        $rs = mysqli_query($conn, $query);
    
        if ($rs) {
            echo "File $name has been recorded in database.";
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