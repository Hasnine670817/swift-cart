let allCards = [];

// load all products (Home page)
const loadProducts = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => displayProducts(data.slice(0, 3)))
    .catch(error => console.error(error))
}

// load all products (Products page)
const loadProducts2 = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        allCards = data;
        displayProducts(allCards);
        displayCategoryBtn();
    })
    .catch(error => console.error(error))
}

// display all products
const displayProducts = (products, limit = null) => {
    console.log(products);
    const trendingContainer = document.querySelector(".trending__container");
    if (!trendingContainer) return;
    trendingContainer.innerHTML = "";

    const visibleProducts = limit ? products.slice(0, limit) : products;
    
    for (let product of visibleProducts) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col">
                <figure class="bg-[#E5E7EB] p-4 rounded-t-2xl">
                    <img src="${product?.image}" alt="Product" class="h-56 object-contain mx-auto mb-4" />
                </figure>
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full w-fit">${product?.category}</span>
                        <div class="flex items-center text-yellow-500 text-sm">
                            <i class="fa-solid fa-star"></i>
                            <span class="ml-1 text-gray-600">${product?.rating?.rate} (${product?.rating?.count})</span>
                        </div>
                    </div>
                    <h3 class="text-gray-800 font-semibold mt-2 truncate">
                        ${product?.title}
                    </h3>

                    <div class="mt-3">
                        <span class="text-lg font-bold text-gray-900">$${product?.price}</span>
                    </div>

                    <div class="flex items-center justify-between mt-5 gap-3">
                        <button onclick="handleCardDetails(${product.id})" class="flex-1 btn border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-100 transition">
                            <i class="fa-solid fa-eye mr-2"></i> Details
                        </button>
                        <button class="flex-1 btn border-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition">
                            <i class="fa-solid fa-cart-plus mr-2"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;

        trendingContainer.appendChild(div);
    }
}


// for all category-btns
const displayCategoryBtn = () => {
    const btnContainer = document.getElementById("category-btn-container");
    btnContainer.innerHTML = "";

    const uniqueCategories = [...new Set(allCards.map(card => card.category))];

    // for create all btn
    const allBtn = document.createElement("div");
    allBtn.innerHTML = `
        <button type="button" class="btn text-white bg-[#4F39F6] border-0 text-sm rounded-3xl">
            All
        </button>
    `;
    const allButtonElement = allBtn.querySelector("button");
    allButtonElement.addEventListener("click", () => handleCategoryBtn("All", allButtonElement));
    btnContainer.appendChild(allBtn);

    uniqueCategories.forEach((category) => {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

        const div = document.createElement("div");
        div.innerHTML = `
            <button type="button" class="btn text-black text-sm rounded-3xl">${formattedCategory}</button>
        `;

        const btnElement = div.querySelector("button");
        btnElement.addEventListener("click", () => handleCategoryBtn(category, btnElement));

        btnContainer.appendChild(div);
    })
}

// handle category filter + active toggle
const handleCategoryBtn = (category, clickedBtn) => {
    const allButtons = document.querySelectorAll("#category-btn-container button");

    // remove active styles
    allButtons.forEach(btn => {
        btn.classList.remove("active-category", "border-0", "bg-[#4F39F6]", "text-white");
        btn.classList.add("text-black");
    });

    // add active styles to clicked one
    clickedBtn.classList.add("active-category", "border-0", "bg-[#4F39F6]", "text-white");

    // filter products
    if (category === "All") {
        displayProducts(allCards);
    } else {
        const filtered = allCards.filter(card => card.category === category);
        displayProducts(filtered);
    }
}


// for card details
const handleCardDetails = (id) => {
    const singleCard = allCards.find(card => card.id === id);
    
    if (!singleCard) return;

    const modal = document.getElementById("card__details__modal");
    const modalBox = modal.querySelector(".modal-box");
    modalBox.innerHTML = "";

    // Create content container
    const div = document.createElement("div");
    div.innerHTML = `
        <!-- Close Icon -->
        <button id="modal-close-btn" 
            class="absolute top-4 right-3 cursor-pointer text-gray-500 hover:text-gray-700 text-lg">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h3 class="text-xl font-bold text-gray-800 mb-3">${singleCard.title}</h3>

        <figure class="bg-[#F3F4F6] p-4 rounded-xl mb-4">
            <img src="${singleCard.image}" alt="${singleCard.title}" class="h-48 mx-auto object-contain">
        </figure>

        <p class="text-gray-600 text-sm mb-4">${singleCard.description}</p>

        <div class="flex justify-between items-center mb-5">
            <span class="text-lg font-bold text-gray-900">$${singleCard.price}</span>
            <div class="flex items-center text-yellow-500 text-sm">
                <i class="fa-solid fa-star"></i>
                <span class="ml-1 text-gray-700">${singleCard.rating?.rate} (${singleCard.rating?.count})</span>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button class="flex-1 btn bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
                <i class="fa-solid fa-cart-plus mr-2"></i> Add to Cart
            </button>
            <button class="flex-1 btn bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                <i class="fa-solid fa-bag-shopping mr-2"></i> Buy Now
            </button>
        </div>
    `;

    // Append to modal box
    modalBox.appendChild(div);

    // Show modal
    modal.showModal();

    // modal close functionality
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener("click", () => {
        modal.close();
    });
}


if (window.location.pathname.includes("products.html")) {
    loadProducts2(); // products page
} else {
    loadProducts(); // home page
}