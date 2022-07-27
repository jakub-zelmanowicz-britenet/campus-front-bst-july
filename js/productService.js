const getProducts = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/product')
            .then( async response => {
                const products = await response.json();
                resolve(products);
            } )
            .catch( error => {
                console.log('[DEBUG] ERROR');
                console.log(JSON.stringify(error));
                reject(error);
            } );
    } );
}

const renderProducts = (products) => {
    const productsElement = document.querySelector('#products');
    if (productsElement) {
        products.forEach( product => {
            productsElement.innerHTML += `
                <a class="product a--no-style" href="product_detail.html?id=${product.id}">
                    <img class="product__img" src="img/najtansze-nowe-auta-otwarcie.jpeg" alt="Najtansze nowe auta"/>
                    <div class="product__info">
                        <h3> ${product.name} </h3>
                        <p> ${product.description} </p>
                        <div class="product__actions">
                            <p class="product__price"> ${product.price}PLN </p>
                            <p class="product__buy"> KUP </p>
                        </div>
                    </div>
                </a>
            `
        } );
    }
    else{
        throw new Error('Cannot find #products.');
    }
}

const createProduct = async () => {
    const user_token = sessionStorage.getItem('user_token');
    try {
        await fetch('http://localhost:8080/api/v1/product', {
            method: 'POST',
            headers: {
                'Authorization': user_token
            }
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
}

getProducts()
.then( products => {
    renderProducts(products);
} )
.catch( error => {
    console.log(JSON.stringify(error));
});