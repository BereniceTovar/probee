const allProducts = (products) => {
    $("#products").html("");
    $('#products').css("display", "block");
    $('#info-product').css("display", "none");
    const infoProducts = products.results;
    infoProducts.forEach((product) =>{
        let nameProduct = product.title;
        let image = product.thumbnail;
        let id = product.id;
        $("#products").append(template(nameProduct, image, id));
        $("#carouselExampleIndicators").remove();
    })
}

const template = (nameProduct, image, id) => {
    let t = `<div onClick="idProduct(this)" class="container-product" data-id=${id}><img src='${image}' alt='picture-product'><br><p class="name-product">${nameProduct}</p></div`;
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
        //console.log(response);
        allProducts(response);
    })
    .fail((error) => {
        console.log('Error');
        swal("¡Error!", "Intentalo de nuevo");
    });
}

function idProduct(elem){
    var dataId = $(elem).data("id");

        //Specific info
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
            let t = `<div><h4>${nameProduct}<h4><img src='${image} alt='product-picture'><br><div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i></div><h5>Precio menudeo: $${price} MXN</h5><h5>Precio mayoreo negociable por piezas, contactar al proveedor**</h5><br><h5>Marca: ${brand}<br></h5><h5>Material: ${material}
            </h5><p>Garantía: ${warranty}</p></div><button type="button" class="back btn btn-outline-secondary descr-btn">Menú principal</button">
            <button type="button" class="btn btn-success descr-btn">Contactar proveedor</button">`;
                return t;
            }
            
            const ajaxProducts2 = (dataId) => {
                //console.log(dataId);
                $.ajax({
                    url: `https://api.mercadolibre.com/items/${dataId}`,
                    type: 'GET',
                    datatype: 'json',
                })
                .done((response) => {
                    console.log(response);
                    infoProduct(response);
                })
                .fail((error) => {
                    console.log('Error2');
                    swal("¡Error!", "Intentalo de nuevo");
                });
            }
        
            ajaxProducts2(dataId);
}

//Paypal Button
paypal.Button.render({
    env: 'sandbox',
    client: {
        sandbox: 'AQ5ozK_EXM5J6TXRT-cVu8AI0r37ZnUDQEmq-d1X7HzOwBU7b0t083U1u5XEhSXX-KrQGTCO9V2e2vD8',
        //production: 'ARO_9e46muyq76983ZX3kO_u58nMI9o3kBut01mNHNnUskXmfWKYCalEq0cHRhFFxG0Ng5huPUryKc3z'
    },
    payment: function (data, actions) {
        return actions.payment.create({
        transactions: [{
            amount: {
            total: '0.01',
            currency: 'USD'
            }
        }]
        });
    },
    onAuthorize: function (data, actions) {
        return actions.payment.execute()
        .then(function () {
            swal("Suscripción Exitosa", "¡Bienvenid@ a Probee!", "success");
            //window.alert('¡Agradecemos su suscripción!');
        });
    }
    }, '#paypal-button');


$(document).ready(() => {
    console.log("La página está cargada");
    $("#search-btn").click(ajaxProducts);

});

/*
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
    let t = `<div onClick="idProduct(this)" class="container-product" data-id=${id}><img src='${image}' alt='picture-product'><br><p class="name-product">${nameProduct}</p></div`;
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

function idProduct(elem){
    var dataId = $(elem).data("id");

        //Specific info
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
            MXN</h5><br><h5>Marca: ${brand}<br></h5><h5>Material: ${material}</h5><p>Garantía: ${warranty}</p></div>
            <button type="button" class="back btn btn-outline-secondary descr-btn">Menú principal</button">
            <button type="button" class="btn btn-success descr-btn">Comprar ahora</button">`;
                return t;
            }
            
            const ajaxProducts2 = (dataId) => {
                console.log(dataId);
                $.ajax({
                    url: `https://api.mercadolibre.com/items/${dataId}`,
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
        
            ajaxProducts2(dataId);
}

//Paypal Button
paypal.Button.render({
    env: 'sandbox',
    client: {
        sandbox: 'AQ5ozK_EXM5J6TXRT-cVu8AI0r37ZnUDQEmq-d1X7HzOwBU7b0t083U1u5XEhSXX-KrQGTCO9V2e2vD8',
        //production: 'ARO_9e46muyq76983ZX3kO_u58nMI9o3kBut01mNHNnUskXmfWKYCalEq0cHRhFFxG0Ng5huPUryKc3z'
    },
    payment: function (data, actions) {
        return actions.payment.create({
        transactions: [{
            amount: {
            total: '0.01',
            currency: 'USD'
            }
        }]
        });
    },
    onAuthorize: function (data, actions) {
        return actions.payment.execute()
        .then(function () {
            window.alert('Gracias por tu compra!');
        });
    }
    }, '.paypal-button');


$(document).ready(() => {
    console.log("La página está cargada");
    $("#search-btn").click(ajaxProducts);

});

*/
