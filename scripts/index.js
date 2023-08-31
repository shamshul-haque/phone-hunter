// load data
const loadPhones = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
loadPhones("phone");

// show the loaded data
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  phones = phones.slice(0, 6);

  // handle show all button
  const showAllBtn = document.getElementById("show-all");
  if (phones.length > 6) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // find single item
  phones.forEach((phone) => {
    const phoneItem = document.createElement("div");
    phoneItem.classList = `border p-5 rounded-lg space-y-5`;
    phoneItem.innerHTML = `
        <div class="flex justify-center bg-blue-50 rounded-lg">
            <img src="${phone.image}" alt="${phone.phone_name}" class="p-10 rounded-lg"
            />
        </div>
        <div class="font-poppins text-gray-700 text-center space-y-2">
            <h2 class="text-base md:text-2xl font-bold">${phone.phone_name}</h2>
            <p class="text-base ">Description will be dynamic</p>
            <p class="text-base md:text-xl font-bold">$999</p>
            <div class="flex justify-center">
                <button onclick="handleShowDetails('')" class="text-base font-semibold text-white bg-blue-500 px-3 py-2 rounded-lg">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneItem);
  });

  // set loader false when item will get found
  handleLoader(false);
};

// handle searching
const handleSearch = () => {
  // get search field
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);

  // set loader true when item will be searched
  handleLoader(true);
};

// handle loader
const handleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};
