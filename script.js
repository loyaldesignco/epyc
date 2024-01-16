const glossaryLinksContainer = document.querySelector(".text-rich-text");
const glossaryModal = document.querySelector(".glossary-modal_component");

const glossaryModalParent = glossaryModal?.parentElement;

const glossaryModalClose = glossaryModal?.querySelectorAll(
  ".glossary-modal_close-button"
);
const glossaryAlphabetLinks = glossaryModal?.querySelectorAll(
  ".glossary-modal_alphabet-wrapper a"
);
const glosaryModalSimilarLetter = glossaryModal?.querySelector(
  ".glossary-modal_similar-letter-wrapper"
);
const glossaryModalTitle = glossaryModal?.querySelector("h3");
const glossaryModalDescription = glossaryModal?.querySelector("p");

//Data storage on page
let glossaryData;

function openModal() {
  glossaryModalParent.classList.add("is-active");
  glossaryModal.classList.add("is-active");

  // Add tabindex attribute to the modal title to make it focusable
  glossaryModalTitle.setAttribute("tabindex", "-1");

  // Set focus on the modal title
  glossaryModalTitle.focus();

  // Add keydown listener for Escape key when modal is open
  document.addEventListener("keydown", handleModalKeydown);
}
function closeModal() {
  glossaryModalParent.classList.remove("is-active");
  glossaryModal.classList.remove("is-active");

  // Remove keydown listener when modal is closed
  document.removeEventListener("keydown", handleModalKeydown);
}

function createTermLinks(terms) {
  return terms.map((t) => {
    const termLink = document.createElement("a");
    termLink.href = "#";
    termLink.textContent = t;
    termLink.setAttribute("aria-label", `${t} glossary term`);

    // Add keydown event listener for Enter key
    termLink.addEventListener("keydown", handleGlossaryLinkKeydown);
    return termLink;
  });
}

//Accessibility
// Function to handle keydown on glossary links
function handleGlossaryLinkKeydown(e) {
  if (e.key === "Enter") {
    // Simulate a click event
    this.click();
  }
}

// Function to handle keydown for closing modal
function handleModalKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
  }
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
//Check if database contains certain letter and delete letter if not
function removeUnusedAlphabetLinks() {
  glossaryAlphabetLinks.forEach((link) => {
    const letter = link.textContent.trim();
    const wordsStartingWithLetter = glossaryData.some(
      (entry) => Object.keys(entry)[0].charAt(0).toUpperCase() === letter
    );

    if (!wordsStartingWithLetter) {
      link.parentElement.remove(); // Remove the alphabet link if no words start with this letter
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (glossaryModal) {
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
        removeUnusedAlphabetLinks();
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
  }
});

///////
// const glossaryLinksContainer = document.querySelector(".text-rich-text");
// const glossaryModal = document.querySelector(".glossary-modal_component");

// const glossaryModalParent = glossaryModal?.parentElement;

// const glossaryModalClose = glossaryModal?.querySelectorAll(
//   ".glossary-modal_close-button"
// );
// const glossaryAlphabetLinks = glossaryModal?.querySelectorAll(
//   ".glossary-modal_alphabet-wrapper a"
// );
// const glosaryModalSimilarLetter = glossaryModal?.querySelector(
//   ".glossary-modal_similar-letter-wrapper"
// );
// const glossaryModalTitle = glossaryModal?.querySelector("h3");
// const glossaryModalDescription = glossaryModal?.querySelector("p");

// //Data storage on page
// let glossaryData;

// function openModal() {
//   glossaryModalParent.classList.add("is-active");
//   glossaryModal.classList.add("is-active");
// }
// function closeModal() {
//   glossaryModalParent.classList.remove("is-active");
//   glossaryModal.classList.remove("is-active");
// }

// function createTermLinks(terms) {
//   return terms.map((t) => {
//     const termLink = document.createElement("a");
//     termLink.href = "#";
//     termLink.textContent = t;
//     termLink.setAttribute("aria-label", "Learn more about Glossary Term");
//     return termLink;
//   });
// }

// function attachLinkEventListeners(links) {
//   links.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const term = link.textContent.trim();
//       const matchingItem = glossaryData.find(
//         (entry) => Object.keys(entry)[0] === term
//       );
//       glossaryModalTitle.textContent = term;
//       glossaryModalDescription.textContent = matchingItem[term];
//     });
//   });
// }
// //Check if database contains certain letter and delete letter if not
// function removeUnusedAlphabetLinks() {
//   glossaryAlphabetLinks.forEach((link) => {
//     const letter = link.textContent.trim();
//     const wordsStartingWithLetter = glossaryData.some(
//       (entry) => Object.keys(entry)[0].charAt(0).toUpperCase() === letter
//     );

//     if (!wordsStartingWithLetter) {
//       link.remove(); // Remove the alphabet link if no words start with this letter
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   if (glossaryModal) {
//     // Fetch the glossary data
//     fetch(
//       "https://cdn.jsdelivr.net/gh/MaxChechel/EPYC---glossary/glossary-base.json"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Sort the glossary data alphabetically
//         glossaryData = data.sort((a, b) =>
//           Object.keys(a)[0].localeCompare(Object.keys(b)[0])
//         );
//         removeUnusedAlphabetLinks();
//         // Attach event listeners to alphabetical links
//         glossaryAlphabetLinks.forEach((alphaLink) => {
//           alphaLink.addEventListener("click", (e) => {
//             e.preventDefault();
//             const letter = alphaLink.textContent.trim();

//             // Filter glossary data for terms starting with the clicked letter
//             const termsStartingWithLetter = glossaryData
//               .filter(
//                 (entry) =>
//                   Object.keys(entry)[0].charAt(0).toUpperCase() === letter
//               )
//               .map((entry) => Object.keys(entry)[0]);

//             // Create links for terms starting with the clicked letter
//             const links = createTermLinks(termsStartingWithLetter);

//             // Clear and insert the links into the wrapper
//             glosaryModalSimilarLetter.innerHTML = "";
//             attachLinkEventListeners(links);
//             glosaryModalSimilarLetter.append(...links);
//           });
//         });
//       });

//     // Attach event listener to the container for all glossary links
//     glossaryLinksContainer.addEventListener("click", (e) => {
//       const link = e.target.closest("a");
//       if (!link) return; // If the click did not occur on a link element

//       e.preventDefault();
//       const term = link.textContent.trim();
//       const matchingItem = glossaryData.find(
//         (entry) => Object.keys(entry)[0] === term
//       );
//       if (matchingItem) {
//         const firstLetter = term.charAt(0).toUpperCase();

//         // Filter terms with the same starting letter and exclude the current term
//         const newTermsWithSameLetter = glossaryData
//           .filter(
//             (entry) =>
//               Object.keys(entry)[0].charAt(0).toUpperCase() === firstLetter
//           )
//           .map((entry) => Object.keys(entry)[0]);

//         // Create links for terms with the same starting letter
//         const links = createTermLinks(newTermsWithSameLetter);

//         // Clear and insert the links into the wrapper
//         glosaryModalSimilarLetter.innerHTML = "";
//         attachLinkEventListeners(links);
//         glosaryModalSimilarLetter.append(...links);

//         // Update text content of modal
//         glossaryModalTitle.textContent = term;
//         glossaryModalDescription.textContent = matchingItem[term];

//         // Open modal
//         openModal();
//       }
//     });

//     // Attach click event listener to the outer wrapper of the modal
//     glossaryModalClose.forEach((item) => {
//       item.addEventListener("click", (e) => {
//         closeModal();
//       });
//     });
//   }
// });
