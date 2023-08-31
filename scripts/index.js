// load data
const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
loadPhones("phone");

// show the loaded data
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  // handle show all button
  const showAllBtn = document.getElementById("show-all");
  if (phones.length > 6 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  // find single item
  phones.forEach((phone) => {
    const phoneItem = document.createElement("div");
    phoneItem.classList = `border p-5 rounded-lg space-y-5`;
    phoneItem.innerHTML = `
        <div class="flex justify-center bg-blue-50 rounded-lg">
            <img src="${phone.image}" alt="${phone.phone_name}" class="p-10"
            />
        </div>
        <div class="font-poppins text-gray-700 text-center space-y-2">
            <h2 class="text-base md:text-2xl font-bold">${phone.phone_name}</h2>
            <p class="text-base">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-base md:text-xl font-bold">$999</p>
            <div class="flex justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="text-base font-semibold text-white bg-blue-500 px-3 py-2 rounded-lg">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneItem);
  });

  // set loader false when item will get found
  handleLoader(false);
};

// handle searching
const handleSearch = (isShowAll) => {
  // get search field
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value ? searchField.value : "phone";
  loadPhones(searchText, isShowAll);

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

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// load single phone details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const details = data.data;
  detailsModal(details);
};

// handle details modal
const detailsModal = (details) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <div class="flex justify-center bg-blue-50 rounded-lg">
        <img src="${details.image}" alt="${details.name}" class="p-10"/>
    </div>
    <div class="text-gray-700 space-y-2">
        <h1 class="text-base text-center md:text-2xl font-bold">${
          details.name
        }</h1>
        <p class="text-base text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-base"><span class="font-semibold">Storage: </span>${
          details?.mainFeatures?.storage || "No available"
        }</p>
        <p class="text-base"><span class="font-semibold">Display Size: </span>${
          details?.mainFeatures?.displaySize || "No available"
        }</p>
        <p class="text-base"><span class="font-semibold">Chip Set: </span>${
          details?.mainFeatures?.chipSet || "No available"
        }</p>
        <p class="text-base"><span class="font-semibold">GPS: </span>${
          details?.others?.GPS || "No available"
        }</p>
    </div>
    <div class="modal-action flex justify-center">
        <button class="text-base font-semibold text-white bg-red-500 px-3 py-2 rounded-lg">Close</button>
    </div>
  `;
  modal.showModal();
};
