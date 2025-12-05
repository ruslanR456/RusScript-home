function loadProjects() {
  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";

  let projects = JSON.parse(localStorage.getItem("rus_projects") || "[]");

  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      ${p.link ? `<a href="${p.link}" target="_blank">Open Project</a>` : ""}
    `;

    container.appendChild(card);
  });
}

// ---------------- REVIEWS ----------------
function loadReviews() {
  const reviewBox = document.getElementById("reviews");
  reviewBox.innerHTML = "";

  let reviews = JSON.parse(localStorage.getItem("rus_reviews") || "[]");

  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `<p>${r}</p>`;
    reviewBox.appendChild(div);
  });
}

function addReview() {
  const txt = document.getElementById("reviewInput").value;

  if (txt.length < 3) {
    alert("Write something longer.");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("rus_reviews") || "[]");
  reviews.push(txt);
  localStorage.setItem("rus_reviews", JSON.stringify(reviews));

  document.getElementById("reviewInput").value = "";
  loadReviews();
}

loadProjects();
loadReviews();
