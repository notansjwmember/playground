const url = "http://localhost:8080";

const content = document.getElementById("content");
const container = document.querySelector(".container");

function clearContent() {
  container.innerHTML = "";
}

function changeView(view) {
  clearContent();

  if (view === "graph") {
  } else if (view === "color") {
    container.innerHTML = `
      <div class="content-item">
        <h4 class="title">Select a color</h4>
        <input type="color">
      </div>
      <div class="line"></div>
    `;

    const input = container.querySelector("input");
    input.addEventListener("input", function (e) {
      const color = e.target.value.replace("#", "");
      getColor(color);
    });
  } else if (view === "compile") {
    container.innerHTML = `
    <form id="form-code">
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

    const form = document.getElementById("form-code");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      const data = {
        code: formData.get("code"),
        language: formData.get("language"),
      };

      const response = compileCode(data);
      alert(response);
    });
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
        text: "Bar Chart",
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

  const response = await fetch(`${url}/chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.className = "content-image";
  img.src = data.url;
  div.appendChild(img);
  container.appendChild(div);
}

async function generateGraph() {
  const button = document.getElementById("graphBtn");

  const loader = document.createElement("span");
  loader.className = "loader";
  button.appendChild(loader);
  button.disabled = true;

  const response = await fetch(`${url}/faker`, {
    method: "GET",
  });

  loader.remove();
  button.disabled = false;

  const data = await response.json();

  const countries = data.data.map((item) => item.country);
  const contact = data.data.map((item) => item.contact);
  const genders = contact.map((item) => item.gender);

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
      name: person.name,
      email: person.email,
      country: person.country,
      gender: person.contact.gender,
    };
  });

  const gridContainer = document.createElement("div");
  gridContainer.className = "gridContainer";
  container.appendChild(gridContainer);

  peopleData.forEach((item, index) => {
    const personCard = document.createElement("div");

    personCard.innerHTML = `
      <div class="card graph">
        <h4 class="title">Person ${index + 1}</h4>
        <p>Name</p>
        <p style="color: white;">${item.name}</p>
        <p>Email</p>
        <p style="color: white;">${item.email}</p>
        <p>Gender</p>
        <p style="color: white;">${item.gender}</p>
        <p>Country</p>
        <p style="color: white;">${item.country}</p>
      </div>
    `;

    gridContainer.appendChild(personCard);
  });

  await getChartData(countries, countryMap);
}

async function getColor(color) {
  try {
    const response = await fetch(`${url}/color`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: color }),
    });

    const data = await response.json();

    container.innerHTML = `
    <div class="color-item">
      <h4 class="title">Base color</h4>
      <div class="color-card" id="base">
        <p>Napapansin mo na ba?</p>
      </div>
      <div class="line"></div>
      <h4 class="title">Complementary</h4>
      <div class="color-card" id="complementary">
        <p>Iniibig kita</p>
      </div>
      <div class="line"></div>
      <h4 class="title">Grayscale</h4>
      <div class="color-card" id="grayscale">
        <p>Aking sinta</p>
      </div>
    </div>`;
  } catch (e) {
    console.error(e);
  }
}

async function compileCode(payload) {
  try {
    const response = await fetch(`${url}/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
