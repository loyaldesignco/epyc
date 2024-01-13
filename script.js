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
      const term = link.textContent.trim(); // Get the text content of the link and trim any extra whitespace
      console.log(term);
      if (glossaryData.hasOwnProperty(term)) {
        const item = glossaryData[term];
        const title = item.title; // Assuming 'title' is the key for title in your data
        const description = item.description; // Assuming 'description' is the key for description in your data
        console.log(title, description);
        // Update and display your modal here
        // document.querySelector(".modal-title").textContent = title;
        // document.querySelector(".modal-description").textContent = description;
        // Code to show modal
      }
    });
  });
});
