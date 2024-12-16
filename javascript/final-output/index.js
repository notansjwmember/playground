const url = "http://localhost:8080";

const content = document.getElementById("content");
const container = document.querySelector(".container");

async function getChartData() {
  const response = await fetch(`${url}/chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      backgroundColor: "#fff",
      width: 500,
      height: 300,
      devicePixelRatio: 1.0,
      chart: {
        type: "bar",
        data: {
          labels: [2012, 2013, 2014, 2015, 2016],
          datasets: [
            {
              label: "Users",
              data: [120, 60, 50, 180, 120],
            },
          ],
        },
      },
    }),
  });

  const data = await response.json();
  console.log(data);
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

