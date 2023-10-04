const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsGrid = document.getElementById('resultsGrid');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    const apiUrl = `https://8r21li.a.searchspring.io/api/search/search.json?resultsFormat=native&resultsPerPage=500&page=1&siteId=8r21li&q=${query}`;

    // Replace this with your API call logic to fetch and process search results
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error(error));
});

function displayResults(results) {
    resultsGrid.innerHTML = '';

    results.forEach(result => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = result.imageUrl;
        productImage.alt = result.name;
        productImage.classList.add('product-image');

        const productName = document.createElement('div');
        productName.textContent = result.name;
        productName.classList.add('product-name');

        const productPrice = document.createElement('div');
        if (result.maximum_price === result.active_price) {
            productPrice.textContent = `Price: ${result.active_price}`;
        } else {
            productPrice.innerHTML = `Was: ${result.maximum_price}<br>Now: ${result.active_price}`;
        }
        productPrice.classList.add('product-price');

        const productLink = document.createElement('a');
        productLink.href = result.url.replace('/app.', '/');
        productLink.appendChild(productImage);
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);

        productCard.appendChild(productLink);
        resultsGrid.appendChild(productCard);
    });
}
