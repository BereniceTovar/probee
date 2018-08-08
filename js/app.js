const allProducts = (products) => {
    $("#products").html("");
    $('#products').css("display", "block");
    $('#info-product').css("display", "none");
    console.log(products);
    const infoProducts = products.results;
    console.log(infoProducts);
    infoProducts.forEach((product) =>{
        let nameProduct = product.title;
        let image = product.thumbnail;
        let id = product.id;
        $("#products").append(template(nameProduct, image, id));
        $("#carouselExampleIndicators").remove();
    })
}

const template = (nameProduct, image, id) => {
    console.log(id);
    let t = `<div class="container-product" data-id=${id}><img src='${image}' alt='picture-product'><br><p class="name-product">${nameProduct}</p></div`;
    return t;
}

const ajaxProducts = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${$('#search-p').val()}&limit=12`,
        type: 'GET',
        datatype: 'json',
    })
    .done((response) => {
        console.log(response);
        allProducts(response);
    })
    .fail((error) => {
        console.log('Error');
    });
}

    //Specific info
    $(document).on("click", '.container-product', (event) => { 
        console.log('click');
        $('#info-product').css("display", "block");
        $('#products').css("display", "none");
        const infoProduct = (products) => {
            let image = products.pictures[0].secure_url;
            let nameProduct = products.title;
            let price = products.price;
            let warranty = products.warranty;
            let brand = products.attributes[1].value_name;
            let material = products.attributes[5].value_name;
                $("#info-product").append(template2(image, nameProduct, price, brand, material, warranty));
                $(".back").click(() => {window.location.reload(true);});
            }
    
        const template2 = (image, nameProduct, price, brand, material, warranty) => {
        let t = `<div><img src='${image} alt='product-picture'><br><h4>${nameProduct}<h4><br><h5>Precio: $${price}
        MXN</h5><br><h5>Brand: ${brand}<br></h5><h5>Material: ${material}</h5><p>Garantía: ${warranty}</p></div>
        <button type="button" class="back btn btn-outline-secondary descr-btn">Menú principal</button">
        <button type="button" class="btn btn-success descr-btn">Comprar ahora</button">`;
            return t;
        }
        
        const ajaxProducts2 = (product_id) => {
            $.ajax({
                url: `https://api.mercadolibre.com/items/MLM614975870`,
                type: 'GET',
                datatype: 'json',
            })
            .done((response) => {
                console.log(response);
                infoProduct(response);
            })
            .fail((error) => {
                console.log('Error2');
            });
        }
    
        ajaxProducts2($(this).data('id'));
    
    });

$(document).ready(() => {
    console.log("La página está cargada");
    $("#search-btn").click(ajaxProducts);

});

/*
const allProducts = (products) => {
    $("#products").html("");
    console.log(products);
    const infoProducts = products.results;
    console.log(infoProducts);
    infoProducts.forEach((product) =>{
        let nameProduct = product.title;
        let image = product.thumbnail;
        let id = product.id;
        console.log(id);
        $("#products").append(template(nameProduct, image, id));
        $("#carouselExampleIndicators").remove();
    })
}

const template = (nameProduct, image, id) => {
    let t = `<div class="container-product" data-id=${id}><img src='${image}' alt='picture-product'><br><p class="name-product">${nameProduct}</p></div`;
    return t;
}

const ajaxProducts = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${$('#search-p').val()}&limit=12`,
        type: 'GET',
        datatype: 'json',
    })
    .done((response) => {
        console.log(response);
        allProducts(response);
    })
    .fail((error) => {
        console.log('Error');
    });
}

    //Specific info
    $(document).on("click", '.container-product', (event) => { 
        console.log('click');
        const infoProduct = (products) => {
            //console.log(products);
    
                $("#products").remove();
                //$("#elementos-pkm").append(template2(name, id, imagen, speed, specialDefense, specialAttack, defense, attack, hp));
                //$(".back").click(function(){window.location.reload(true);});
            }
    
        const template2 = (name, id, imagen) => {
            let t = `<div></div>`
            return t;
        }
        
        const ajaxProducts2 = (product_id) => {
            $.ajax({
                url: `https://api.mercadolibre.com/items/${product_id}`,
                type: 'GET',
                datatype: 'json',
            })
            .done((response) => {
                console.log(response);
                infoProduct(response);
            })
            .fail((error) => {
                console.log('Error2');
            });
        }
    
        ajaxProducts2($(this).data('id'));
    
    });

$(document).ready(() => {
    console.log("La página está cargada");
    $("#search-btn").click(ajaxProducts);

});
*/
