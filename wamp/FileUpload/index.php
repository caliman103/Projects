<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
</head>
<body>
    <form action="./scripts/upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" id="file">
        <button type="submit">Submit</button>
    </form>
</body>
</html>