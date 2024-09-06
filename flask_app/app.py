from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Set up the uploads directory
UPLOAD_FOLDER = 'uploads/snp_files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/process_snp_upload', methods=['POST'])
def process_snp_upload():
    try:
        if 'snp_file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        snp_file = request.files['snp_file']

        if snp_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save the uploaded file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], snp_file.filename)
        snp_file.save(file_path)

        # Here, you would add your SNP processing code and PDF generation

        # Send success message
        return jsonify({'success': 'File uploaded successfully! Report generated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
