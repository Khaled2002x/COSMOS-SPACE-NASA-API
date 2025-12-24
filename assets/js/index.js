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
  leading_tight: document.querySelector(".leading-tight"),
  leading_building: document.querySelector(".leading_building"),
  starship_rocket: document.querySelector(".starship_rocket"),
  Launch_Date: document.querySelector(".Launch_Date"),
  time_lunch: document.querySelector(".time_lunch"),
  hero_location: document.querySelector(".hero_location"),
  country: document.querySelector(".country"),
  hero_desc: document.querySelector(".hero_desc"),
  img_hero_lunch: document.querySelector(".img_hero_lunch"),
  launches_grid: document.getElementById("launches-grid"),
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

async function fetchdata_space_today(api_link) {
  try {
    let data = await fetch(`${api_link}`);

    if (!data.ok) {
      throw new Error("error" + data.message);
    } else {
      let response = await data.json();
      console.log(response);

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
  let data = await fetchdata_space_today(
    `https://api.nasa.gov/planetary/apod?api_key=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S&date=${date}`
  );
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
  DisplayUpcomingLaunches();
});
// load image by date button
function loadByDate() {
  let date_value = dom.apod_date_input.value;
  display_current_space_picture(date_value);
}
// load image today button
function loadtodayimage() {
  display_current_space_picture(`${yaer}-${month}-${day}`);
  dom.apod_date_input.value = `${yaer}-${month}-${day}`;
  dom.curr_date.innerHTML = dom.apod_date_input.value;
}
dom.today_apod_btn.addEventListener("click", () => loadtodayimage());
dom.load_date_btn.addEventListener("click", () => loadByDate());
//

async function DisplayUpcomingLaunches() {
  let data = await fetchdata_space_today(`./assets/js/data.json`);
  dom.leading_tight.innerHTML = data.results[0].name;
  dom.leading_building.innerHTML = data.results[0].launch_service_provider.name;
  dom.starship_rocket.innerHTML = data.results[0].rocket.configuration.name;
  dom.Launch_Date.innerHTML = returnFormayyedDate(data.results[0].window_start);
  dom.time_lunch.innerHTML = returnTimeformatted(data.results[0].net) + " UTC";
  dom.hero_location.innerHTML = data.results[0].pad.location.name;
  dom.country.innerHTML = data.results[0].pad.country.nationality_name;
  dom.hero_desc.innerHTML = data.results[0].mission.description;
  dom.img_hero_lunch.src = `${data.results[0].image.image_url}`;
  let cartonna = "";
  for (let i = 1; i < data.results.length; i++) {
    cartonna += ``;
  }
}
//formate api date**
function returnFormayyedDate(parm) {
  let apiDate = new Date(parm).toLocaleString("en-Us", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
  return apiDate;
}

function returnTimeformatted(parm) {
  let formattedTime = new Date(parm).toLocaleTimeString("en-Us", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  return formattedTime;
}
console.log(returnTimeformatted("2025-12-24T03:25:30Z"));
