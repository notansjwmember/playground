const url = "http://localhost:8080";

let flexContainer = document.createElement("div");
flexContainer.className = "flexContainer";

const container = document.querySelector(".container");

function clearContent() {
  container.innerHTML = "";
}

function changeView(view) {
  clearContent();

  if (view === "graph") {
    container.style.placeContent = "center";
  } else if (view === "color") {
    container.style.alignContent = "start";

    container.innerHTML = `
    <header class="color-header">
      <div class="content-item">
      <h4 class="title">Select a color</h4>
      <input type="color">
      </div>
      <div class="line"></div>
    </header>
    `;

    container.appendChild(flexContainer);

    let debounceTimeout;

    const input = container.querySelector("input");
    input.addEventListener("input", function (e) {
      const color = e.target.value.replace("#", "");

      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        getColor(color);
      }, 500);
    });
  } else if (view === "compile") {
    container.style.alignContent = "";

    container.innerHTML = `
    <form id="form-code" onsubmit="processCode(event)">
      <select name="language">
        <option value="">Select a language</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="py">Python</option>
        <option value="js">NodeJS</option>
      </select>
      <textarea name="code"></textarea>
      <div class="line"></div>
      <button type="submit" class="secondary-btn">Run</button>
    </form>
    `;
  }
}

async function getChartData(countries, countryMap) {
  const payload = {
    type: "bar",
    data: {
      labels: countries,
      datasets: [
        {
          label: "Male",
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          data: Object.values(countryMap[countries[0]]),
        },
        {
          label: "Female",
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
          data: Object.values(countryMap[countries[1]]),
        },
        {
          label: "Other",
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          data: Object.values(countryMap[countries[2]]),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Gender Diversity in 3 Countries",
      },
      plugins: {
        datalabels: {
          anchor: "center",
          align: "center",
          color: "#666",
          font: {
            weight: "normal",
          },
        },
      },
    },
  };

  try {
    const response = await fetch(`${url}/chart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return new Promise((resolve) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      div.className = "content-image";
      img.src = data.url;

      img.onload = () => {
        div.appendChild(img);
        container.appendChild(div);
        resolve();
      };

      img.onerror = () => {
        console.error("Image failed to load.");
        resolve();
      };
    });
  } catch (e) {
    console.error(e);
  }
}

async function generateGraph() {
  clearContent();
  changeView("graph");

  const button = document.getElementById("graphBtn");

  const loader = document.createElement("span");
  loader.className = "loader";
  button.appendChild(loader);
  button.disabled = true;

  try {
    const response = await fetch(`${url}/faker`, {
      method: "GET",
    });

    const data = await response.json();

    const countries = data.data.map((item) => item.address.country);
    const genders = data.data.map((item) => item.gender);

    const genderMap = {
      other: 0,
      male: 0,
      female: 0,
    };

    const countryMap = countries.reduce((acc, country) => {
      if (!acc[country]) {
        acc[country] = {
          male: 0,
          female: 0,
          other: 0,
        };
      }

      const index = countries.indexOf(country);
      const gender = genders[index];

      if (genderMap[gender] !== undefined) {
        acc[country][gender] += 1;
      }

      return acc;
    }, {});

    const people = data.data;

    const peopleData = people.map((person) => {
      return {
        name: `${person.firstname} ${person.lastname}`,
        email: person.email,
        gender: person.gender,
        country: person.address.country,
      };
    });

    await getChartData(countries, countryMap);

    loader.remove();
    button.disabled = false;

    const gridContainer = document.createElement("div");
    gridContainer.className = "gridContainer";
    container.appendChild(gridContainer);

    peopleData.forEach((item, index) => {
      const personCard = document.createElement("div");
      personCard.className = "card graph"

      personCard.innerHTML = `
        <h4 class="title">Person ${index + 1}</h4>
        <div>
        <p style="font-size: 0.75rem">Name</p>
        <p style="color: white;">${item.name}</p>
        </div>
        <div>
        <p style="font-size: 0.75rem;">Email</p>
        <p style="color: white;">${item.email}</p>
        </div>
        <div>
        <p style="font-size: 0.75rem;">Gender</p>
        <p style="color: white;">${item.gender}</p>
        </div>
        <div>
        <p style="font-size: 0.75rem;">Country</p>
        <p style="color: white;">${item.country}</p>
        </div>
    `;

      gridContainer.appendChild(personCard);
    });
  } catch (e) {
    console.error(e);
  }
}

async function getColor(color) {
  const contentItem = document.querySelector(".content-item");

  const loader = document.createElement("span");
  loader.className = "loader";
  contentItem.appendChild(loader);
  contentItem.disabled = true;

  try {
    const response = await fetch(`${url}/color`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({color: color}),
    });

    const data = await response.json();

    loader.remove();
    contentItem.disabled = false;

    const baseBg = data.base_without_alpha.hex.value;
    const baseText = data.base_without_alpha_contrasted_text.hex.value;
    const compBg = data.complementary_without_alpha.hex.value;
    const compText = data.complementary_without_alpha_contrasted_text.hex.value;
    const gsBg = data.grayscale_without_alpha.hex.value;
    const gsText = data.grayscale_without_alpha_contrasted_text.hex.value;

    const colorItem = document.createElement("div");
    colorItem.className = "color-item";

    colorItem.innerHTML = `
    <h2 class="title color-title">Requested color: #${color}</h2>
    <h4 class="title">Base color</h4>
    <div class="color-card" style="background-color: ${baseBg};">
      <p style="color: ${baseText};">Napapansin mo na ba?</p>
    </div>
    <h4 class="title">Complementary</h4>
    <div class="color-card" style="background-color: ${compBg};">
      <p style="color: ${compText};">Iniibig kita</p>
    </div>
    <h4 class="title">Grayscale</h4>
    <div class="color-card" style="background-color: ${gsBg};">
      <p style="color: ${gsText};">Aking sinta</p>
    </div>
    <div class="line"></div>
  `;

    flexContainer.prepend(colorItem);
  } catch (e) {
    console.error(e);
  }
}

async function processCode(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    code: formData.get("code"),
    language: formData.get("language"),
  };

  try {
    const response = await compileCode(data);
    alert(response.message);
  } catch (e) {
    console.error(e);
    alert("An error occurred while compiling the code.");
  }
}

async function compileCode(payload) {
  const urlEncodedPayload = new URLSearchParams(payload).toString();

  try {
    const response = await fetch(`${url}/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedPayload,
    });

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
