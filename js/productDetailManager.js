const retrieveProductIdFromURI = () => {
    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const product_id = url_params.get('id');
    if (product_id) {
        return product_id;
    }
    throw new Error('Cannot find product id in URI params.');
}

const product_id = retrieveProductIdFromURI();
const product_id_element = document.querySelector('#product_id');
if (product_id_element) {
    product_id_element.innerText = product_id;
}