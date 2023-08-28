// load the data
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// display the loaded data
const displayPhones = (phones, isShowAll) => {
  // get phone container
  const phoneContainer = document.getElementById("phone-container");

  //   clear phone container cards before add new cards
  phoneContainer.textContent = "";

  //   display show all button if items are more then 10
  const showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  //   display first 10 phone
  if (!isShowAll) {
    phones = phones.slice(0, 10);
  }

  // append the data in a new div
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
        <img src="${phone.image}" alt="${phone.phone_name}"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  //   hide loading spinner
  toggleLoader(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  // show loading spinner
  toggleLoader(true);

  // searching items
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// spinner or loader
const toggleLoader = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show details button
const handleShowDetails = async (slug) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  console.log(data);
};

// handel show all button
const handleShowAll = () => {
  handleSearch(true);
};
