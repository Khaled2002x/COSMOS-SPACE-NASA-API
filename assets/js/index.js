// WRITE YOUR JS CODE HERE
// apikey=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S
let dom = {
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
};
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
let current_date = new Date();
let yaer = current_date.getFullYear();
let day = current_date.getDate();
let month = current_date.getMonth() + 1;

console.log(`${yaer}-${month}-${day}`);

async function fetchdata_space_today() {
  try {
    let data = await fetch(
      ` https://api.nasa.gov/planetary/apod?api_key=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S&date=${dom.apod_date_input.value}`
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
// fetchdata_space_today();

dom.apod_date_input.addEventListener("change", () => {
  console.log(dom.apod_date_input.value);
  dom.curr_date.innerHTML = dom.apod_date_input.value;
});
async function display_current_space_picture() {
  let data = await fetchdata_space_today();
  dom.live_date.innerHTML = data.date;
  dom.apod_image.src = `${data.hdurl}`;
  dom.apod_title.innerHTML = data.title;
  dom.apod_date_detail.innerHTML = data.date;
  dom.apod_explanation.innerHTML = data.explanation;
  dom.apod_copyright.innerHTML = data.copyright;
}

window.addEventListener("load", () => {
  let currentsection = localStorage.getItem("section");
  dom.apod_date_input.value = `${yaer}-${month}-${day}`;
  dom.curr_date.innerHTML = dom.apod_date_input.value;

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
  display_current_space_picture();
});
