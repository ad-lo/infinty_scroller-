const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'ugtdQAz1gYCabCQFsUk2RLofjyl1WmNy9UCrAtCPCSY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM elements 
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//  Create Elements for links & photos, add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
//  create <a> to link to unsplash
const item = document.createElement('a');

setAttributes(item, {
href: photo.links.html,
target: '_blank',
});
// create <img> for photo
const img = document.createElement('img');

setAttributes(img, {
  src: photo.urls.regular,
  alt: photo.alt_description,
  title: photo.alt_description
});
// put <img> inside <a>, then put both inside image container element
item.appendChild(img);
imageContainer.appendChild(item);

  });
}

// Get photos from unsplash API
async function getPhotos() {
  try {
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// On load
getPhotos();