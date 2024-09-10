<!-- This is for the Table of Contents -->
<script>
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    if (entry.isIntersecting) {
      document.querySelectorAll(".active").forEach((z) => {
        z.classList.remove("active")
      });
      document.querySelector(`a[href="#${id}"]`).classList.add("active");
    }
  });
}, { rootMargin: '0px 0px -75% 0px' });

document.getElementById("content").querySelectorAll("h2, h3, h4, h5").forEach(function(heading, i) {
  let str = heading.innerHTML; // capture the heading text
  str = str.replace(/\s+/g, '-').replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g, "").toLowerCase(); // create slug
  
  heading.setAttribute("id", str); // assign slug as the id
  
  observer.observe(heading); // observe each heading for intersection
  
  const item = document.createElement("a"); // create a new anchor for TOC
  item.innerHTML = heading.innerHTML; // set the TOC text
  
  // Assign classes based on the heading level for styling
  if (heading.tagName === "H2") {
    item.setAttribute("class", "tocitem toc-h2");
  } else if (heading.tagName === "H3") {
    item.setAttribute("class", "tocitem toc-h3");
  } else if (heading.tagName === "H4") {
    item.setAttribute("class", "tocitem toc-h4");
  } else if (heading.tagName === "H5") {
    item.setAttribute("class", "tocitem toc-h5");
  }
  
  item.setAttribute("href", "#" + str); // set the href to the heading id
  
  document.querySelector("#toc").appendChild(item); // add the anchor to the TOC container
});
</script>
