const glossaryLinks = [...document.querySelectorAll(".text-rich-text a")];

let glossaryData = {};

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the glossary data from CDN and store in a variable
  fetch("https://cdn.jsdelivr.net/gh/MaxChechel/EPYC---glossary/glossary.json")
    .then((response) => response.json())
    .then((data) => {
      glossaryData = data;
    });

  //Listener for all glossary links
  glossaryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const term = link.textContent.trim();
      const item = glossaryData.find((entry) => Object.keys(entry)[0] === term);
      if (item) {
        const title = Object.keys(item)[0];
        const description = item[title];
        console.log(title, description);

        // Update and display your modal here
        // document.querySelector(".modal-title").textContent = title;
        // document.querySelector(".modal-description").textContent = description;
        // Code to show modal
      }
    });
  });
});
