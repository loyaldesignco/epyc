const glossaryLinksContainer = document.querySelector(".text-rich-text");
const glossaryModal = document.querySelector(".glossary-modal_component");
const glossaryModalParent = glossaryModal.parentElement;

const glossaryModalClose = glossaryModal.querySelectorAll(
  ".glossary-modal_close-button, .glossary-modal_background-overlay"
);
const glossaryAlphabetLinks = glossaryModal.querySelectorAll(
  ".glossary-modal_alphabet-wrapper a"
);
const glosaryModalSimilarLetter = glossaryModal.querySelector(
  ".glossary-modal_similar-letter-wrapper"
);
const glossaryModalTitle = glossaryModal.querySelector("h3");
const glossaryModalDescription = glossaryModal.querySelector("p");

//Data storage on page
let glossaryData;

function openModal() {
  glossaryModalParent.classList.add("is-active");
  glossaryModal.classList.add("is-active");
}
function closeModal() {
  glossaryModalParent.classList.remove("is-active");
  glossaryModal.classList.remove("is-active");
}

function createTermLinks(terms) {
  return terms.map((t) => {
    const termLink = document.createElement("a");
    termLink.href = "#";
    termLink.textContent = t;
    return termLink;
  });
}

function attachLinkEventListeners(links) {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const term = link.textContent.trim();
      const matchingItem = glossaryData.find(
        (entry) => Object.keys(entry)[0] === term
      );
      glossaryModalTitle.textContent = term;
      glossaryModalDescription.textContent = matchingItem[term];
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the glossary data
  fetch(
    "https://cdn.jsdelivr.net/gh/MaxChechel/EPYC---glossary/glossary-base.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Sort the glossary data alphabetically
      glossaryData = data.sort((a, b) =>
        Object.keys(a)[0].localeCompare(Object.keys(b)[0])
      );

      // Attach event listeners to alphabetical links
      glossaryAlphabetLinks.forEach((alphaLink) => {
        alphaLink.addEventListener("click", (e) => {
          e.preventDefault();
          const letter = alphaLink.textContent.trim();

          // Filter glossary data for terms starting with the clicked letter
          const termsStartingWithLetter = glossaryData
            .filter(
              (entry) =>
                Object.keys(entry)[0].charAt(0).toUpperCase() === letter
            )
            .map((entry) => Object.keys(entry)[0]);

          // Create links for terms starting with the clicked letter
          const links = createTermLinks(termsStartingWithLetter);

          // Clear and insert the links into the wrapper
          glosaryModalSimilarLetter.innerHTML = "";
          attachLinkEventListeners(links);
          glosaryModalSimilarLetter.append(...links);
        });
      });
    });

  // Attach event listener to the container for all glossary links
  glossaryLinksContainer.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return; // If the click did not occur on a link element

    e.preventDefault();
    const term = link.textContent.trim();
    const matchingItem = glossaryData.find(
      (entry) => Object.keys(entry)[0] === term
    );
    if (matchingItem) {
      const firstLetter = term.charAt(0).toUpperCase();

      // Filter terms with the same starting letter and exclude the current term
      const newTermsWithSameLetter = glossaryData
        .filter(
          (entry) =>
            Object.keys(entry)[0].charAt(0).toUpperCase() === firstLetter
        )
        .map((entry) => Object.keys(entry)[0]);

      // Create links for terms with the same starting letter
      const links = createTermLinks(newTermsWithSameLetter);

      // Clear and insert the links into the wrapper
      glosaryModalSimilarLetter.innerHTML = "";
      attachLinkEventListeners(links);
      glosaryModalSimilarLetter.append(...links);

      // Update text content of modal
      glossaryModalTitle.textContent = term;
      glossaryModalDescription.textContent = matchingItem[term];

      // Open modal
      openModal();
    }
  });

  // Attach click event listener to the outer wrapper of the modal
  glossaryModalClose.forEach((item) => {
    item.addEventListener("click", (e) => {
      closeModal();
    });
  });
});
