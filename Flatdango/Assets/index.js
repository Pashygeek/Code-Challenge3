//Set the url of the API
const url = "https://flatdango.vercel.app/db.json"
//fetches data from the API and appends the details of the first movie to the page
function fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => appendFirstMovie(data.films));
  }
  fetchData();

  //append details of the firt movie to the page
  function appendFirstMovie(data) {
    //select necessary elements
    let first = data[0];
    let button1 = document.getElementById("button");
    button1.innerHTML = "";
    let image = document.getElementById("poster");
    let title = document.getElementById("title");
    let runtime = document.getElementById("runtime");
    let showtime = document.getElementById("showtime");
    let tickets = document.getElementById("tickets");
    let details = document.getElementById("details");
    //create a button to buy tickets
    let button = document.createElement("button");
    button.id = "btn";
    button.textContent = "Buy Ticket";
    let total = first.capacity - first.tickets.sold;
    button.addEventListener("click", () => {
      //decrease ticket count and update ticket count displayed
      if (total > 0) {
        total -= 1;
        document.getElementById("tickets").innerHTML = total;
      } else if (total < 1) {
        //display message if no tickets available
        document.getElementById("tickets").innerHTML = "*No tickets available";
      }
    });
    //update elements with details of the first movie
    title.textContent = first.title;
    runtime.textContent = first.runtime;
    showtime.textContent = first.showtime;
    tickets.textContent = first.capacity - first.tickets_sold;
    details.textContent = first.description;
    image.src = `
      ${first.poster}
      `;
    button.appendChild(button);
  }

  //fetches list of movies from the API in the menu section
  function appendMenu() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => menuTitles(data.films));
  }
  appendMenu();

  //Displays the titles of the movies in the menu section
  function menuTitles(data) {
    data.forEach((item) => {
      //create a li element for each movie
      let title = document.createElement("li");
      title.id = "list";
      //add an event listener to display the details the clicked movie
      title.addEventListener("click", () => {
        const i = item.id;
        appendIndividualDetails(data[i - 1]);
      });
      let menu = document.getElementById("menu");
      title.textContent = item.title;
      menu.appendChild(title);
    });
  }

  //displays the details of the clicked movie in the main section
  function appendIndividualDetails(item) {
    //select the necessary elements
    let butonn = document.getElementById("button");
    butonn.innerHTML = "";
    let image = document.getElementById("poster");
    let title = document.getElementById("title");
    let runtime = document.getElementById("runtime");
    let showtime = document.getElementById("showtime");
    let tickets = document.getElementById("tickets");
    let details = document.getElementById("details");

    //create a button to buy tickets
    let button = document.createElement("button");
    button.id = "btn";
    button.textContent = "Buy Ticket";
    let total = item.capacity - item.tickets_sold;
    button.addEventListener("click", () => {

      //decreases ticket counts to 0 and updates ticket count displayed
      if (total > 0) {
        total -= 1;
        document.getElementById("tickets").innerHTML = total;
      } else if (total < 1) {
        document.getElementById("tickets").innerHTML = "*No tickets available";
      }
    });

    title.textContent = item.title;
    runtime.textContent = item.runtime;
    showtime.textContent = item.showtime;
    tickets.textContent = item.capacity - item.tickets_sold;
    details.textContent = item.details;
    image.src = `
      ${item.poster}
      `;
    butonn.appendChild(button);
  }