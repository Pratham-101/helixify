const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('uploadStatus');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    uploadBox.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
uploadBox.addEventListener('drop', handleDrop, false);

// Handle selected files
fileInput.addEventListener('change', handleFiles, false);

// Click to select files
uploadBox.addEventListener('click', () => fileInput.click());

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    uploadBox.classList.add('dragover');
}

function unhighlight() {
    uploadBox.classList.remove('dragover');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files instanceof FileList) {
        files = Array.from(files);
    } else if (files instanceof Event) {
        files = Array.from(files.target.files);
    }
    
    files.forEach(validateAndUpload);
}

function validateAndUpload(file) {
    // Check file type
    const validTypes = ['.csv', '.tsv', '.txt', '.vcf'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!validTypes.includes(fileExtension)) {
        uploadStatus.textContent = `Error: Invalid file type. Please upload CSV, TSV, TXT, or VCF files.`;
        uploadStatus.className = 'upload-status error';
        return;
    }

    // Check file size (30MB = 30 * 1024 * 1024 bytes)
    if (file.size > 30 * 1024 * 1024) {
        uploadStatus.textContent = `Error: File size exceeds 30MB limit.`;
        uploadStatus.className = 'upload-status error';
        return;
    }

    // File is valid, proceed with upload
    uploadFile(file);
}

function uploadFile(file) {
    // Here you would typically send the file to your server
    // For this example, we'll just simulate a successful upload
    uploadStatus.textContent = `Uploading ${file.name}...`;
    uploadStatus.className = 'upload-status';

    setTimeout(() => {
        uploadStatus.textContent = `Successfully uploaded ${file.name}`;
        uploadStatus.className = 'upload-status success';
    }, 2000);
}

// PDF.js script
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

const url = './Vighnesh_Resume_Goldman_Sachs.pdf'; // Provide the correct path to your PDF
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5,
    canvas = document.getElementById('pdf-viewer'),
    ctx = canvas.getContext('2d');

function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function(page) {
        let viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        let renderContext = {
            canvasContext: ctx,
            viewport: viewport,
        };

        let renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

// Load PDF document
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    renderPage(pageNum);  // Render the first page
});

// Function for downloading PDF
function downloadPdf() {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = 'final_report.pdf';  // Set the filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error downloading PDF:', error);
        });
}

// Trigger PDF download when the button is clicked
document.getElementById('downloadPdf').addEventListener('click', downloadPdf);
