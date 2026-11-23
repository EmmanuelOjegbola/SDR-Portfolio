const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const cvDownload = document.querySelector(".cv-download");
if (cvDownload) {
  fetch(cvDownload.href, { method: "HEAD" })
    .then((response) => {
      const contentType = response.headers.get("content-type") || "";
      if (response.ok && contentType.toLowerCase().includes("application/pdf")) {
        cvDownload.hidden = false;
      } else if (response.status !== 404) {
        console.error("CV download is unavailable or is not served as a PDF.", response.status, contentType);
      }
    })
    .catch((error) => console.error("Unable to check whether the CV PDF is available.", error));
}

document.getElementById("year").textContent = new Date().getFullYear();
