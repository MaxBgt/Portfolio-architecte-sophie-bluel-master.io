const gallery = document.querySelector(".gallery");
const btnFilter = document.querySelectorAll(".btn_filter");
let projects = [];
let filterMethod = "Tous";

// Affichage dynamique projets + filtres

const fetchProject = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projects = data));
  projectsDisplay();
  picDisplay();
};

const projectsDisplay = () => {
  if (filterMethod === "Tous") {
    gallery.innerHTML = projects
      .map(
        (project) =>
          `
              <figure>
                <img src="${project.imageUrl}" alt="${project.title}" id="${project.id}" />
                <figcaption>${project.title}</figcaption>
              </figure>`
      )
      .join("");
  } else {
    gallery.innerHTML = projects
      .filter((project) => project.category.name.includes(filterMethod))
      .map(
        (project) =>
          `
              <figure>
                <img src="${project.imageUrl}" alt="${project.title}" id="${project.id}" />
                <figcaption>${project.title}</figcaption>
              </figure>`
      )
      .join("");
  }
};
window.addEventListener("load", fetchProject);

btnFilter.forEach((btnFilter) => {
  btnFilter.addEventListener("click", (e) => {
    filterMethod = e.target.id;
    projectsDisplay();
  });
});
