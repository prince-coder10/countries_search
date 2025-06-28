let theme = document.getElementById("theme");
let clicked = false;
let searchInput = document.getElementById("search");
let region = document.getElementById("region");
let screen = document.getElementById("country");
let container = document.getElementById("container");
let header = document.getElementById("header");
let regionSelect = document.getElementById("region");
let indicator = document.getElementById("indicator");
const buttonRefrence = [];
const searchImg = document.getElementById("search_img");

async function run() {
  theme.addEventListener("click", () => {
    if (clicked === false) {
      theme.src = "./sun.svg";
      clicked = true;
    } else if (clicked === true) {
      theme.src = "moon.png";
      clicked = false;
    }
    console.log(clicked);

    // handling Dark and light mode
    if (clicked === true) {
      searchImg.src = "./search_white.svg";
      indicator.textContent = "Light Mode";
      document.body.classList.add("dark");
      header.classList.add("dark_elem");
      regionSelect.classList.add("dark_elem");
      searchInput.classList.add("dark_elem_input");
      console.log(containers);
      buttonRefrence.forEach((button) => {
        button.classList.add("dark_elem");
      });
      containers.forEach(({ container }) => {
        container.classList.add("dark_elem");
      });
    } else {
      searchImg.src = "./search_black.svg";
      indicator.textContent = "Dark Mode";
      document.body.classList.remove("dark");
      header.classList.remove("dark_elem");
      regionSelect.classList.remove("dark_elem");
      searchInput.classList.remove("dark_elem_input");
      containers.forEach(({ container }) => {
        container.classList.remove("dark_elem");
      });
    }
  });

  async function getCountries() {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  }

  const Countries = await getCountries();
  console.log(Countries[0].flags.svg);

  console.log(Countries);
  const containers = []; // 🔹 Store all containers
  const selected = [];
  Countries.map((country) => {
    // creating the country container
    const container = document.createElement("div");
    screen.appendChild(container);
    container.classList.add("country");
    containers.push({
      container,
      region: country.region,
      name: country.name.toLowerCase(),
    });
    // creating the img
    const img = document.createElement("img");
    img.classList.add("flag");
    img.src = country.flags.png;
    container.appendChild(img);

    // creating info div
    const info = document.createElement("div");
    info.classList.add("info");

    const h3 = document.createElement("h3");
    const h3Text = document.createTextNode(country.name);
    h3.appendChild(h3Text);

    const population = document.createElement("p");
    const populationText = document.createTextNode(
      `Population: ${country.population}`
    );
    population.appendChild(populationText);

    const region = document.createElement("p");
    const regionText = document.createTextNode(`Region: ${country.region}`);
    region.appendChild(regionText);

    const capital = document.createElement("p");
    const capitalText = document.createTextNode(`Capital: ${country.capital}`);
    capital.appendChild(capitalText);

    // appending children to info
    info.appendChild(h3);
    info.appendChild(population);
    info.appendChild(region);
    info.appendChild(capital);
    // appending info to container
    container.appendChild(info);
  });

  // search input logic
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    containers.forEach(({ container, name }) => {
      if (name.includes(searchTerm)) {
        container.classList.remove("hidden");
      } else {
        container.classList.add("hidden");
      }
    });
  });

  regionSelect.addEventListener("change", () => {
    const selectedRegion = regionSelect.value;
    containers.forEach(({ container, region }) => {
      if (region === selectedRegion) {
        container.classList.remove("hidden");
      } else if (selectedRegion === "All") {
        container.classList.remove("hidden");
      } else {
        container.classList.add("hidden");
      }
    });
  });

  const countryDivs = document.querySelectorAll(".country");

  countryDivs.forEach((div, index) => {
    let country = Countries[index]; // match div to country object

    div.addEventListener("click", () => {
      container.classList.add("hidden");
      console.log("Clicked country ID:", country.id);

      // details page

      // creating details container
      const moreInfo = document.createElement("div");
      moreInfo.classList.add("more_info");
      const Backbutton = document.createElement("button");
      Backbutton.classList.add("button");
      buttonRefrence.push(Backbutton); // 🔹 Store the button reference
      Backbutton.addEventListener("click", () => {
        container.classList.remove("hidden");
        moreInfo.remove(); // ✅ clean up
      });
      const buttonText = document.createTextNode("Back");
      Backbutton.appendChild(buttonText);
      moreInfo.appendChild(Backbutton);
      document.getElementById("body").appendChild(moreInfo);
      // creating flex div
      const flex = document.createElement("div");
      flex.classList.add("flex");
      moreInfo.appendChild(flex);

      // creating flag img
      const flag = document.createElement("img");
      flag.src = Countries[country.id].flags.png;
      flag.classList.add("big_flag");
      flex.appendChild(flag);

      // creating about
      const about = document.createElement("div");
      about.classList.add("about");
      flex.appendChild(about);
      const h3 = document.createElement("h3");
      const h3Text = document.createTextNode(Countries[country.id].name);
      h3.appendChild(h3Text);
      about.appendChild(h3);

      const aboutCont = document.createElement("div");
      aboutCont.classList.add("about_container");
      about.appendChild(aboutCont);
      // creating styling divs
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      aboutCont.appendChild(div1);
      aboutCont.appendChild(div2);
      const nativeName = document.createElement("p");
      const population = document.createElement("p");
      const region = document.createElement("p");
      const subRegion = document.createElement("p");
      const capital = document.createElement("p");

      const nativeText = document.createTextNode(
        `Native Name: ${Countries[country.id].nativeName}`
      );
      const populationText = document.createTextNode(
        `Population: ${Countries[country.id].population}`
      );
      const regionText = document.createTextNode(
        `Region: ${Countries[country.id].region}`
      );
      const subRegionText = document.createTextNode(
        `Sub Region: ${Countries[country.id].subregion}`
      );
      const capitalText = document.createTextNode(
        `Capital: ${Countries[country.id].capital}`
      );

      nativeName.appendChild(nativeText);
      population.appendChild(populationText);
      region.appendChild(regionText);
      subRegion.appendChild(subRegionText);
      capital.appendChild(capitalText);

      div1.appendChild(nativeName);
      div1.appendChild(population);
      div1.appendChild(region);
      div1.appendChild(subRegion);
      div1.appendChild(capital);

      const tld = document.createElement("p");
      const currencies = document.createElement("p");
      const languages = document.createElement("p");

      const tldText = document.createTextNode(
        `Top Level Domains: ${Countries[country.id].topLevelDomain}`
      );
      const currenciesText = document.createTextNode(
        `Currencies: ${Countries[country.id].currencies[0].name}`
      );
      let nameArray = [];
      Countries[country.id].languages.map((language) => {
        nameArray.push(language.name);
        console.log(nameArray.join(", "));
      });

      const languagesText = document.createTextNode(
        `Languages: ${nameArray.join(", ")}`
      );

      tld.appendChild(tldText);
      currencies.appendChild(currenciesText);
      languages.appendChild(languagesText);

      div2.appendChild(tld);
      div2.appendChild(currencies);
      div2.appendChild(languages);
      // creating borders div
      const borders = document.createElement("div");
      about.appendChild(borders);
      borders.classList.add("borders");
      about.appendChild(borders);
      const borderHead = document.createElement("p");
      const borderText = document.createTextNode("Border Countries:");
      borderHead.appendChild(borderText);
      borders.appendChild(borderHead);
      Countries[country.id].borders.forEach((border) => {
        console.log(border);
        const borderCountry = document.createElement("p");
        borderCountry.classList.add("span");
        borderCountry.textContent = border;
        borders.appendChild(borderCountry);
      });
    });
  });
}
run();
