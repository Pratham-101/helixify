const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const uploadStatus = document.getElementById('uploadStatus');

// Drag & Drop functionality
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileUpload);

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.style.backgroundColor = '#ecf0f1';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.backgroundColor = '#fff';
});

uploadBox.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadBox.style.backgroundColor = '#fff';
    const file = event.dataTransfer.files[0];
    handleFile(file);
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    handleFile(file);
}

function handleFile(file) {
    const allowedExtensions = ['csv', 'tsv', 'txt', 'vcf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
        uploadStatus.textContent = `Uploading ${file.name}...`;

        // Simulate a delay for the upload process (2 seconds)
        setTimeout(() => {
            uploadStatus.textContent = `File uploaded successfully! Report generated successfully!`;
        }, 2000);

    } else {
        uploadStatus.textContent = 'Invalid file type. Please upload a .csv, .tsv, .txt, or .vcf file.';
    }
}
