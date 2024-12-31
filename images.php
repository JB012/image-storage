<?php
include_once("connect.php");
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
?>