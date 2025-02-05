document.addEventListener("DOMContentLoaded", function () {
  console.log("Page Loaded");

  // Tab switching functionality
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add click event listeners to each tab link
  tabLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetTab = this.getAttribute("data-tab");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Remove active class from all tab links
      tabLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Show the target tab content and add active class to the clicked tab link
      document.getElementById(targetTab).classList.add("active");
      this.classList.add("active");
    });
  });

  // Activate the first tab by default
  tabLinks[0].classList.add("active");
  tabContents[0].classList.add("active");
});
