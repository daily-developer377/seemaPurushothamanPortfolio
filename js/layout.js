// Load header
fetch("partials/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
    console.log("Header loaded successfully", header);
  })
  .catch((err) => console.error("Header load error:", err));

// Load footer
fetch("partials/footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
    console.log("Footer loaded successfully");
  })
  .catch((err) => console.error("Footer load error:", err));

console.log("working layout.js");
