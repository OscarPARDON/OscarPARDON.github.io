
const portal = document.getElementById('portal');
const advantagesPage = document.getElementById('advantagesPage');
const backButton = document.getElementById('backButton');
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("load", () => {
  const activePage = localStorage.getItem("activePage");
  if (activePage === "advantagesPage") {
    advantagesPage.classList.add("active");
  }
});

portal.addEventListener('click', () => {
  document.body.classList.add('zooming');

  setTimeout(() => {
    advantagesPage.classList.add('active');
    localStorage.setItem("activePage", "advantagesPage");
    document.body.classList.remove('zooming');
  }, 800);
});

backButton.addEventListener('click', () => {
  advantagesPage.classList.remove('active');
  localStorage.setItem("activePage", "None");
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    advantagesPage.classList.add("active");
    localStorage.setItem("activePage", "advantagesPage");
  });
});
