const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const galleryGrid = document.querySelector(".gallery-grid");
const galleryMore = document.querySelector(".gallery-more");
const extraGalleryPhotos = [...galleryGrid.querySelectorAll(".gallery-photo")].slice(3);
const galleryImages = [...galleryGrid.querySelectorAll(".gallery-open img")];
const galleryViewer = document.querySelector(".gallery-viewer");
const galleryViewerImage = document.querySelector(".gallery-viewer-image");
const galleryViewerCaption = document.querySelector(".gallery-viewer-caption");
const galleryViewerCount = document.querySelector(".gallery-viewer-count");
let activeGalleryIndex = 0;

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

if (galleryMore) {
  const photoCount = extraGalleryPhotos.length;
  galleryMore.hidden = photoCount === 0;
  galleryMore.querySelector(".gallery-more-count").textContent = `+${photoCount}`;
  extraGalleryPhotos.forEach((photo) => {
    photo.hidden = true;
  });

  galleryMore.addEventListener("click", () => {
    showGalleryImage(galleryImages.length - photoCount);
    galleryViewer.showModal();
  });
}

function showGalleryImage(index) {
  activeGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[activeGalleryIndex];
  galleryViewerImage.src = image.currentSrc || image.src;
  galleryViewerImage.alt = image.alt;
  galleryViewerCaption.textContent = image.alt;
  galleryViewerCount.textContent = `${activeGalleryIndex + 1} / ${galleryImages.length}`;
}

galleryImages.forEach((image, index) => {
  image.closest(".gallery-open").addEventListener("click", () => {
    showGalleryImage(index);
    galleryViewer.showModal();
  });
});

galleryViewer.querySelector(".gallery-viewer-close").addEventListener("click", () => {
  galleryViewer.close();
});

const galleryViewerNav = galleryViewer.querySelectorAll(".gallery-viewer-nav");
galleryViewerNav[0].addEventListener("click", () => showGalleryImage(activeGalleryIndex - 1));
galleryViewerNav[1].addEventListener("click", () => showGalleryImage(activeGalleryIndex + 1));

galleryViewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showGalleryImage(activeGalleryIndex - 1);
  } else if (event.key === "ArrowRight") {
    showGalleryImage(activeGalleryIndex + 1);
  }
});

galleryViewer.addEventListener("click", (event) => {
  if (event.target === galleryViewer) {
    galleryViewer.close();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
