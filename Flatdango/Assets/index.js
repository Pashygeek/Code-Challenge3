const movieInfoElement = document.getElementById("movie-info");
const posterElement = document.getElementById("poster");
const titleElement = document.getElementById("title");
const runtimeElement = document.getElementById("runtime");
const showtimeElement = document.getElementById("showtime");
const ticketsAvailableElement = document.getElementById("tickets-available");
const buyTicketButton = document.getElementById("buy-ticket");

// Fetch movie details for the first movie
fetch("http://localhost:3000/films/1")
  .then(response => response.json())
  .then(movie => {
    // Update the movie details on the page
    posterElement.style.backgroundImage = `url(${movie.poster})`;
    titleElement.textContent = movie.title;
    runtimeElement.textContent = movie.runtime;
    showtimeElement.textContent = movie.showtime;
    ticketsAvailableElement.textContent = movie.capacity - movie.tickets_sold;

    // Update the Buy Ticket button
    if (movie.tickets_sold === movie.capacity) {
      buyTicketButton.disabled = true;
      buyTicketButton.textContent = "Sold Out";
    }
  })
  .catch(error => {
    console.error("Error fetching movie details:", error);
  });

// Fetch movie list and populate the films ul element
fetch("http://localhost:3000/films")
  .then(response => response.json())
  .then(movies => {
    const filmsElement = document.getElementById("films");
    filmsElement.innerHTML = "";

    // Add each movie to the list
    movies.forEach(movie => {
      const li = document.createElement("li");
      li.textContent = movie.title;
      li.classList.add("film", "item");
      filmsElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error fetching movie list:", error);
  });

  buyTicketButton.addEventListener("click", async () => {
    const response = await fetch('http://localhost:3000/films');
    const film = await response.json();
    const ticketsAvailable = film.capacity - film.tickets_sold;
    
    if (ticketsAvailable > 0) {
      // decrease the number of tickets available by 1
      ticketsAvailable--;
  
      // update the UI with the new number of tickets available
      ticketsAvailableElement.innerText = ticketsAvailable;
  
      // show a successful purchased ticket message
      alert('Ticket purchased successfully!');
    } else {
      // show an error message
      alert('Sorry, there are no more tickets available.');
    }
  });
  
 