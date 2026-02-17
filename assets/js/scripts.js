
let allCards = [];

// load all products
const loadProducts = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        allCards = data;
        displayProducts(allCards)
    })
    .catch(error => console.error(error))
}

// display all products
const displayProducts = (products) => {
    console.log(products);
    const trendingContainer = document.querySelector(".trending__container");

    const sliceProducts = products.slice(0, 3);
    
    for (let product of sliceProducts) {
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
                        <button class="flex-1 btn border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-100 transition">
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

loadProducts();