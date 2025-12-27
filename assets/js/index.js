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
  planet_card: document.querySelectorAll(".planet-card"),
  planet_detail_image: document.querySelector("#planet-detail-image"),
  planet_detail_description: document.querySelector(
    "#planet-detail-description"
  ),
  planet_detail_name: document.getElementById("planet-detail-name"),
  planet_distance: document.getElementById("planet-distance"),
  planet_radius: document.getElementById("planet-radius"),
  planet_mass: document.getElementById("planet-mass"),
  planet_density: document.getElementById("planet-density"),
  planet_orbital_period: document.getElementById("planet-orbital-period"),
  planet_rotation: document.getElementById("planet-rotation"),
  planet_moons: document.getElementById("planet-moons"),
  planet_gravity: document.getElementById("planet-gravity"),
  planet_discoverer: document.getElementById("planet-discoverer"),
  planet_discovery_date: document.getElementById("planet-discovery-date"),
  planet_body_type: document.getElementById("planet-body-type"),
  planet_volume: document.getElementById("planet-volume"),
  planet_facts: document.getElementById("planet-facts"),
  planet_perihelion: document.getElementById("planet-perihelion"),
  planet_aphelion: document.getElementById("planet-aphelion"),
  planet_eccentricity: document.getElementById("planet-eccentricity"),
  planet_inclination: document.getElementById("planet-inclination"),
  planet_axial_tilt: document.getElementById("planet-axial-tilt"),
  planet_temp: document.getElementById("planet-temp"),
  planet_escape: document.getElementById("planet-escape"),
  sidebar: document.getElementById("sidebar"),
  sidebar_toggle: document.getElementById("sidebar-toggle"),
  img: document.querySelectorAll("img"),
};
// add loading=lazy to all image to improve performance
dom.img.forEach((img) => img.setAttribute("loading", "lazy"));
//close side bar
window.addEventListener("click", (e) => {
  if (
    dom.sidebar
      .getAttribute("class")
      .split(" , ")
      .includes("sidebar-mobile") === false
  ) {
    dom.sidebar.classList.add("sidebar-mobile");
  }
});
//side bar on mobile screen

dom.sidebar_toggle.addEventListener("click", (e) => {
  e.stopPropagation();

  dom.sidebar.classList.remove("sidebar-mobile");
});

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
function loadspinner() {
  return `<div id="image-container" style="position: relative; width: 300px; height: 300px;">
 <div id="spinner" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
   <img src="spinner.gif" alt="Loading...">
 </div>
 <img id="image" src="" alt="Image" style="display: none; width: 100%; height: 100%;">
</div>
`;
}
async function display_current_space_picture(date) {
  dom.live_date.innerHTML = loadspinner();
  dom.apod_image.innerHTML = loadspinner();
  dom.apod_title.innerHTML = loadspinner();
  dom.apod_date_detail.innerHTML = loadspinner();
  dom.apod_explanation.innerHTML = loadspinner();
  dom.apod_copyright.innerHTML = loadspinner();
  dom.apod_date_info.innerHTML = loadspinner();
  dom.media_type.innerHTML = loadspinner();
  let data = await fetchdata_space_today(
    `https://api.nasa.gov/planetary/apod?api_key=rnIs5dw7lTBxZWyzLT2A6C1dSyzI8rOfdcAlvp4S&date=${date}`
  );
  dom.live_date.innerHTML = data.date;
  dom.apod_image.src = `${data.hdurl}`;
  dom.apod_title.innerHTML = data.title;
  dom.apod_date_detail.innerHTML = data.date;
  dom.apod_explanation.innerHTML = data.explanation;
  dom.apod_copyright.innerHTML = !data.copyright ? "" : data.copyright;
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
  let data = await fetchdata_space_today(
    `https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`
  );
  if (!data) return;
  dom.leading_tight.innerHTML = data.results[0].name;
  dom.leading_building.innerHTML = data.results[0].launch_service_provider.name;
  dom.starship_rocket.innerHTML = data.results[0].rocket.configuration.name;
  dom.Launch_Date.innerHTML = returnFormayyedDate(data.results[0].window_start);
  dom.time_lunch.innerHTML = returnTimeformatted(data.results[0].net) + " UTC";
  dom.hero_location.innerHTML = data.results[0].pad.location.name;
  dom.country.innerHTML = data.results[0].pad.country.nationality_name;
  dom.hero_desc.innerHTML = data.results[0].mission.description;
  dom.img_hero_lunch.src = `${data.results[0].image.image_url}`;
  displayLunchesCards(data);
}
// display cards in lunches taps
function displayLunchesCards(data) {
  let cartonna = "";
  for (let i = 1; i < data.results.length; i++) {
    cartonna += `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${data.results[i].image.image_url}" alt="">
                
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${data.results[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${data.results[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${returnFormayyedDate(
                      data.results[i].window_start
                    )}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${returnTimeformatted(
                      data.results[i].window_start
                    )} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${
                      data.results[i].rocket.configuration.name
                    }</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${
                      data.results[i].pad.location.name
                    }</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
    dom.launches_grid.innerHTML = cartonna;
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
let arr = [];
dom.planet_card.forEach((planet) => {
  planet.addEventListener("click", async () => {
    let CurrentPlanet = planet.getAttribute("data-planet-id");
    let solarApi = await fetchdata_space_today(`./assets/js/data.json`);
    if (!solarApi) return;
    else {
      for (let i = 0; i < solarApi.bodies.length; i++) {
        if (CurrentPlanet === solarApi.bodies[i].id) {
          arr.length = 0;
          arr.push(solarApi.bodies[i]);
        }
      }
      displayPlanet(arr);
    }
  });
});
function displayPlanet(arr) {
  let src = arr[0];

  dom.planet_detail_image.src = `${src.image}`;
  dom.planet_detail_name.innerHTML = src.englishName;
  dom.planet_detail_description.innerHTML = src.description;
  dom.planet_distance.innerHTML =
    (src.semimajorAxis / 1000000).toFixed(1) + "M km";
  dom.planet_radius.innerHTML = src.meanRadius.toFixed(0) + " km";
  dom.planet_mass.innerHTML =
    src.mass.massValue.toFixed(2) + ` × 10^${src.mass.massExponent} kg`;
  dom.planet_density.innerHTML = src.density.toFixed(2) + " g/cm³";
  dom.planet_orbital_period.innerHTML = src.sideralOrbit.toFixed(2) + " days";
  dom.planet_rotation.innerHTML = src.sideralRotation + " hours";
  dom.planet_moons.innerHTML = src.moons.length;
  dom.planet_gravity.innerHTML = src.gravity + " m/s²";
  dom.planet_discoverer.innerHTML =
    src.discoveredBy === "" ? "Known since antiquity" : src.discoveredBy;
  dom.planet_discovery_date.innerHTML =
    src.discoveryDate === "" ? "Ancient" : src.discoveryDate;
  dom.planet_volume.innerHTML =
    src.vol.volValue + " x " + ` 10 ^ ${src.vol.volExponent}  km³`;
  dom.planet_facts.innerHTML = `<li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${dom.planet_mass.innerHTML}</span
                    >
                  </li>
                    <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${dom.planet_gravity.innerHTML}</span
                    >
                  </li>
                    <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${dom.planet_density.innerHTML}</span
                    >
                  </li>
                    <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >xial tilt: ${dom.planet_axial_tilt.innerHTML}</span
                    >
                  </li>
                  `;
  dom.planet_perihelion.innerHTML =
    (src.perihelion / 1000000).toFixed(1) + "M km";
  dom.planet_aphelion.innerHTML = (src.aphelion / 1000000).toFixed(1) + "M km";
  dom.planet_eccentricity.innerHTML = src.eccentricity;
  dom.planet_inclination.innerHTML = src.inclination + "°";
  dom.planet_axial_tilt.innerHTML = src.axialTilt + "°";
  dom.planet_temp.innerHTML = src.avgTemp + "C";
  dom.planet_escape.innerHTML = (src.escape / 1000).toFixed(2) + " km/s";
}
