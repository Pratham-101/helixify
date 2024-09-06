<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload SNP File</title>
    <link rel="stylesheet" href="sendSNP_styles.css">
</head>
<body>
    <div>
        <div class="heading">
            <h1>Upload SNP File</h1>
            <p class="subtitles">Supported file formats: .csv, .tsv, .txt, .vcf</p>
        </div>
        <div class="upload-box" id="uploadBox">
            <p id="dragAndDropText">Drag & drop your file here or click to select</p>
            <input type="file" id="fileInput" accept=".csv,.tsv,.txt,.vcf" hidden>
        </div>
        <div id="uploadStatus" class="upload-status"></div>
    </div>

    <script src="sendSNP.js"></script>
</body>
</html>
