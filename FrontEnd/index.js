// Affichage dynamique projets + filtres
let projects = [];
let filterMethod = "Tous";

const gallery = document.querySelector(".gallery");
const btnsFilter = document.querySelectorAll(".btn_filter");

const fetchProject = async () => {
  let res = await fetch("http://localhost:5678/api/works");
  projects = await res.json();
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

btnsFilter.forEach((btnFilter) => {
  btnFilter.addEventListener("click", (e) => {
    filterMethod = e.target.id;
    projectsDisplay();
  });
});
// Mise en place accéssibilité modales
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".btn_open");
const closeModalBtn = document.querySelector(".close_modal");
const overlay = document.querySelector(".overlay");
const overlay_add_pic = document.querySelector(".overlay_add_pic");
const modal_pic = document.querySelectorAll(".modal_pic");
const modal_add_pic = document.querySelector(".modal_add_pic");
const back_btn = document.querySelector(".fa-arrow-left");
const closeAddModalBtn = document.querySelector(".close_add_modal");
const add_pic_btn = document.querySelector(".add_pic");

const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openAddPicModal = (e) => {
  e.preventDefault();
  modal_add_pic.classList.remove("hidden_modal2");
  overlay_add_pic.classList.remove("hidden_modal2");
};
const closeModal = (e) => {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const closeAddModal = (e) => {
  modal_add_pic.classList.add("hidden_modal2");
  overlay_add_pic.classList.add("hidden_modal2");
};
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" ||
    (e.key === "Esc" && modal.classList.contains("hidden"))
  ) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
add_pic_btn.addEventListener("click", openAddPicModal);
overlay_add_pic.addEventListener("click", closeAddModal);
overlay.addEventListener("click", closeModal);
back_btn.addEventListener("click", closeAddModal);
closeAddModalBtn.addEventListener("click", closeAddModal);

// Affichage des projets dans la modale

const pic_container = document.querySelector(".pic_container");
let delete_btn = document.getElementsByClassName("btn_delete");
const picDisplay = () => {
  pic_container.innerHTML += projects
    .map(
      (project) =>
        `
          <div class="pic" id="${project.id}">
          <img class="modal_pic" src="${project.imageUrl}" alt="${project.title}" id="${project.id}">
          <button class="delete_btn"><i class="fa-regular fa-trash-can btn_delete" id="${project.id}"></i></button>
          <p class="edit_text">éditer</p>
          </div>
          `
    )
    .join("");
  for (const btns of delete_btn) {
    btns.addEventListener("click", (e) => fetchDelete(e.target.id));
  }
};
// Supprimer projet dans la modale
const fetchHead = {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
  },
};
const fetchDelete = async (id) => {
  await fetch(`http://localhost:5678/api/works/${id}`, fetchHead);
  let res = await res;
};

// Fonction ajouter projet
const form = document.getElementById("add_pic_form");
const inputFile = document.querySelector(".input-file");
const labelFile = document.querySelector(".label-file");
const upload_image = document.getElementById("upload_image");
const category = document.getElementById("categorie");
const missing = document.querySelector(".missing");

let uploadedImage = "";

inputFile.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.getElementById(
      "upload_image"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(e.target.files[0]);
  upload_image.style.zIndex = 1;
});
const fecthAdd = async () => {
  let formData = new FormData(form);
  for (item in formData) {
    item[0], item[1];
  }
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
    },
    body: formData,
  });
  let res = await res.json();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (`url(${uploadedImage})` !== "url()" && category.value !== "categorie") {
    fecthAdd();
  } else {
    missing.classList.remove("hidden_missing");
  }
});
