import './style.css';
import QRCodeStyling from 'qr-code-styling';
import { qrOptions } from './options';

function generateQR(url) {

  const qrCode = new QRCodeStyling(qrOptions);
  qrCode.update({ data: url });
  // Render QR code
  qrCode.append(document.getElementById('qrCode'));
  return qrCode;
}

function isValidUrl(url) {
  const domain = 'cdsra.org';
  const regex = new RegExp(`^(https?:\\/\\/)?([\\w.-]+\\.)*${domain}\\/?.*$`, 'i');
  return regex.test(url);
}

function main() {

  const app = document.querySelector('#app');

  const containerQR = document.createElement('div');
  containerQR.className = 'img-thumbnail d-flex justify-content-center align-items-center';
  containerQR.id = 'qrCode';
  generateQR('https://cdsra.org').append(containerQR); // Display a default QR code

  // Create an input text box for URL input
  const inputTextBox = document.createElement('input');
  inputTextBox.type = 'text'; // Corrected type from 'TextInput' to 'text'
  inputTextBox.className = 'form-control';
  inputTextBox.placeholder = 'Enter a CDSRA URL then press Enter or click Generate QR Code';

   
  // Attach the event listener
  inputTextBox.addEventListener('keypress', (e) => { 
    if (e.key === 'Enter') validateUrlAndGenerateQR(); });


  const btnGenerateQR = document.createElement('button');
  btnGenerateQR.textContent = 'Generate QR Code';
  btnGenerateQR.className = 'btn btn-primary';
  btnGenerateQR.addEventListener('click', () => {
    validateUrlAndGenerateQR();
  });
  

  // Create a container for the QR code, input box and button
  const container = document.createElement('div');
  container.className = 'container-sm';
  container.style.width = '35%';
  container.appendChild(containerQR);
  container.appendChild(inputTextBox);
  container.appendChild(btnGenerateQR);
  app.appendChild(container);

  // Function to validate URL and apply Bootstrap validation classes
  const validateUrlAndGenerateQR = () => {
    const url = inputTextBox.value.trim();
    if (!url || !isValidUrl(url)) {
      inputTextBox.classList.add('is-invalid'); // Add Bootstrap's is-invalid class to the input
      if (!document.querySelector('.invalid-feedback')) { // Prevent multiple error messages
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = 'Please enter a valid URL. Only URLs from cdsra.org are allowed.';
        inputTextBox.parentNode.insertBefore(feedback, inputTextBox.nextSibling);
      }
    } else {
      inputTextBox.classList.remove('is-invalid'); // Remove the is-invalid class if the URL is valid
      const feedback = document.querySelector('.invalid-feedback');
      if (feedback) feedback.remove(); // Remove the error message if present
      containerQR.innerHTML = ''; // Clear QR code container
      generateQR(url).append(containerQR); // Generate and display QR
    }
  };

}

main();