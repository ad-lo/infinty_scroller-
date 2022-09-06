const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'ugtdQAz1gYCabCQFsUk2RLofjyl1WmNy9UCrAtCPCSY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageloaded (){
imagesLoaded++;
console.log(imagesLoaded);
if (imageloaded === totalImages) {
  ready = true;
  loader.hidden = true;
  console.log('ready =', ready);

}
}

// Helper function to set attributes on DOM elements 
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//  Create Elements for links & photos, add to DOM
function displayPhotos() {
  imageloaded = 0;
  totalImages = photosArray.length;
  console.log('totalImages', totalImages);
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
// event listener, check when each is finished loading
img.addEventListener('load', imageloaded); 
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

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
 ready = false;
  getPhotos();
}
});

// On load
getPhotos();