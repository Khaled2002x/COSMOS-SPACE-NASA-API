// WRITE YOUR JS CODE HERE
// apikey=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S
const dom = {
  apod_image_container: document.getElementById("apod-image-container"),
  nav_link: document.querySelectorAll(".nav-link"),
  app_section: document.querySelectorAll(".app-section"),
  apod_date_input: document.querySelector("#apod-date-input"),
  curr_date: document.querySelector(".curr_date"),
  live_date: document.querySelector(".live_date"),
  apod_image: document.querySelector("#apod-image"),
  view_Resolution: document.querySelector(".view_Resolution"),
  apod_title: document.getElementById("apod-title"),
  apod_date_detail: document.getElementById("apod-date-detail"),
  apod_explanation: document.getElementById("apod-explanation"),
  apod_copyright: document.getElementById("apod-copyright"),
  apod_date_info: document.getElementById("apod-date-info"),
  media_type: document.getElementById("apod-media-type"),
  load_img: document.querySelector(".load_img"),
  load_date_btn: document.getElementById("load-date-btn"),
  today_apod_btn: document.getElementById("today-apod-btn"),
};
// auto date
let current_date = new Date();
let yaer = current_date.getFullYear();
let day = current_date.getDate();
let month = current_date.getMonth() + 1;

dom.apod_date_input.setAttribute("max", `${yaer}-${month}-${day}`);
dom.apod_date_input.addEventListener("change", () => {
  console.log(dom.apod_date_input.value);
  dom.curr_date.innerHTML = dom.apod_date_input.value;
});

//navs&&taps   and save in local storage
dom.nav_link.forEach((nav) => {
  nav.addEventListener("click", () => {
    dom.nav_link.forEach((n) => {
      n.classList.remove("bg-blue-500/10", "text-blue-400");
    });
    let target = nav.dataset.section;

    nav.classList.add("bg-blue-500/10", "text-blue-400");
    dom.app_section.forEach((section) => section.classList.add("hidden"));

    document.querySelector(`#${target}`).classList.remove("hidden");
    console.log(target);
    localStorage.setItem("section", target);
  });
});

// //

console.log(`${yaer}-${month}-${day}`);

async function fetchdata_space_today(date) {
  try {
    let data = await fetch(
      ` https://api.nasa.gov/planetary/apod?api_key=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S&date=${date}`
    );
    let response = await data.json();

    if (!data.ok) {
      throw new Error("error" + data.message);
    } else {
      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
}
dom.apod_date_input.addEventListener("change", () => {
  console.log(dom.apod_date_input.value);
  dom.curr_date.innerHTML = dom.apod_date_input.value;
});
async function display_current_space_picture(date) {
  let data = await fetchdata_space_today(date);
  dom.live_date.innerHTML = data.date;
  dom.apod_image.src = `${data.hdurl}`;
  dom.apod_title.innerHTML = data.title;
  dom.apod_date_detail.innerHTML = data.date;
  dom.apod_explanation.innerHTML = data.explanation;
  dom.apod_copyright.innerHTML = data.copyright;
  dom.apod_date_info.innerHTML = data.date;
  dom.media_type.innerHTML = data.media_type;
}

window.addEventListener("load", () => {
  let currentsection = localStorage.getItem("section");
  if (currentsection === null) {
    document.getElementById("today-in-space").classList.remove("hidden");
  } else {
    dom.nav_link.forEach((link) => {
      link.classList.remove("bg-blue-500/10", "text-blue-400");
      if (link.dataset.section === currentsection) {
        link.classList.add("bg-blue-500/10", "text-blue-400");
      }
    });

    dom.app_section.forEach((section) => {
      section.classList.add("hidden");
    });

    document.querySelector(`#${currentsection}`).classList.remove("hidden");
  }
  dom.apod_date_input.value = `${yaer}-${month}-${day}`;

  dom.curr_date.innerHTML = dom.apod_date_input.value;
  display_current_space_picture(`${yaer}-${month}-${day}`);
});
function loadByDate() {
  let date_value = dom.apod_date_input.value;
  display_current_space_picture(date_value);
}
function loadtodayimage() {
  display_current_space_picture(`${yaer}-${month}-${day}`);
  dom.apod_date_input.value = `${yaer}-${month}-${day}`;
  dom.curr_date.innerHTML = dom.apod_date_input.value;
}
dom.today_apod_btn.addEventListener("click", () => loadtodayimage());
dom.load_date_btn.addEventListener("click", () => loadByDate());
