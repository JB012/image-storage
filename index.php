<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Storage</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
<?php
include_once("connect.php");
echo "<a href=create.php>Add new file</a>";
$query = "SELECT * FROM test_table";
$rs = mysqli_query($conn, $query);
if ($rs) {
    if ($rs->num_rows > 0) {
        echo "<div class='img-container'>";
        while ($info = $rs->fetch_assoc()) {
            $fileName = $info["fldName"];
            echo "<img src=$fileName>";
        }
        echo "</div>";
    }
}
else {
    echo "Something went wrong.";
}
?>
</body>
</html>