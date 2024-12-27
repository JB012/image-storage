<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Storage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Upload Image</h2>
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <p>
            <label for="file">File</label>
            <input type="file" id="image" name="file_name">
            <input type="submit" value="Upload" name="submit"/>
        </p>
    </form>
    <form action="clear.php" method="POST">
        <button>Clear SQL Table</button>
    </form>
</body>
</html>