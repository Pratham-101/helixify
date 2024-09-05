// File Input Elements
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const uploadStatus = document.getElementById('uploadStatus');
const downloadPdfButton = document.getElementById('downloadPdf');
const pdfCanvas = document.getElementById('pdf-viewer');

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

        // Simulate a delay for the upload
        setTimeout(() => {
            uploadStatus.textContent = `File ${file.name} uploaded successfully!`;
        }, 2000);

    } else {
        uploadStatus.textContent = 'Invalid file type. Please upload a .csv, .tsv, .txt, or .vcf file.';
    }
}

// PDF.js Implementation to display PDF (for demonstration purposes)
const pdfUrl = 'path_to_report.pdf'; // Placeholder PDF path

downloadPdfButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Helixify_Final_Report.pdf';
    link.click();
});

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

const loadingTask = pdfjsLib.getDocument(pdfUrl);
loadingTask.promise.then(function(pdf) {
    pdf.getPage(1).then(function(page) {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const context = pdfCanvas.getContext('2d');
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
});
