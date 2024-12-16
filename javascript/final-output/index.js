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
      console.log(e.target.value);
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

async function getChartData() {
  const response = await fetch(
    `https://quickchart.io/chart?c={type:'bar',data:{labels:[2012,2013,2014,2015, 2016],datasets:[{label:'Users',data:[120,60,50,180,120]}]}}
`,
    {
      method: "GET",
    }
  );

  const data = await response.arrayBuffer();

  const img = document.createElement("img");
  img.src = URL.createObjectURL(new Blob([data], { type: "image/png" }));
  container.appendChild(img);
}

async function generateGraph() {
  const button = document.getElementById("graphBtn");

  const loader = document.createElement("span");
  loader.className = "loader";
  button.appendChild(loader);
  button.disabled = true;

  // const response = await fetch(`${url}/generate`, {
  //   method: "GET",
  // });

  loader.remove();
  button.disabled = false;

  // const data = await response.json();
  await getChartData();
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
