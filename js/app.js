const allProducts = (products) => {
    $("#products").html("");
    $("#search-btn").val("");
    console.log(products);
    const infoProducts = products.results;
    console.log(infoProducts);
    infoProducts.forEach((product) =>{
        let nameProduct = product.title;
        let image = product.thumbnail;
        $("#products").append(template(nameProduct, image));
        $("#carouselExampleIndicators").remove();
    })
}

const template = (nameProduct, image) => {
    let t = `<div class="container-product"><img src='${image}' alt='picture-product'><br><p class="name-product">${nameProduct}</p></div`;
    return t;
}

const ajaxProducts = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${$('#search-p').val()}&limit=12`,
        type: 'GET',
        datatype: 'json',
    })
    .done(function(response){
        console.log(response);
        allProducts(response);
    })
    .fail(function(error){
        console.log('Error');
    });
}



$(document).ready(() => {
    console.log("La página está cargada");
    $("#search-btn").click(ajaxProducts);


});