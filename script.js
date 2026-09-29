const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const galleryGrid = document.querySelector(".gallery-grid");
const galleryMore = document.querySelector(".gallery-more");
const extraGalleryPhotos = [...galleryGrid.querySelectorAll(".gallery-photo")].slice(3);

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
    const isExpanded = galleryMore.getAttribute("aria-expanded") === "true";
    galleryMore.setAttribute("aria-expanded", String(!isExpanded));
    galleryMore.querySelector(".gallery-more-count").textContent = isExpanded ? `+${photoCount}` : "−";
    galleryMore.querySelector("span:last-child").textContent = isExpanded ? "MORE PHOTOS" : "SHOW FEWER";
    extraGalleryPhotos.forEach((photo) => {
      photo.hidden = isExpanded;
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
