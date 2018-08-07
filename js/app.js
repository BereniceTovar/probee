const allProducts = (products) => {
    $("#products").html("");
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
    console.log(image);
    let t = `<div class="container-product"><img src='${image}' alt='picture-product'><br><p><b>Nombre del producto</b>: ${nameProduct}</p></div`;
    return t;
}

const ajaxProducts = (event) => {
    event.preventDefault();
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${$('#search-p').val()}&limit=10`,
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

/*


https://api.mercadolibre.com/items/MLM

$(document).ready(function(){
        
    console.log("Cargó");
    $("#elementos").empty();

var dibujarPokemones = function(pokemones){
    //console.log(pokemones);
    pokemones.forEach(function(pokemon){
        var id = pokemon.entry_number;
        var imagen = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        var url = pokemon.pokemon_species.url;
        var name = pokemon.pokemon_species.name.charAt(0).toUpperCase() + pokemon.pokemon_species.name.slice(1);
        $("#elementos").append(armarTemplate(name, url, imagen, id));
    })
}


var armarTemplate = function(name, url, imagen,id){
    var t = "<div class='cont-pokemon' data-id='"+id+"'><div class='elemento'>" + name + "</div><img class='img-pkmn' src='" + imagen + "' alt='imagen-pokemon'></div>" ;
    return t;
}

var ajaxPokemon = function(pokemon){
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1',
        type: 'GET',
        datatype: 'json',
    })
    .done(function(response){
        //console.log(response);
        dibujarPokemones(response.pokemon_entries);
        //Termina carga pokemones
    })
    .fail(function(error){
        console.log('Error');
    });
}

ajaxPokemon();


$(document).on("click", '.cont-pokemon', function(event) { 
    console.log("Info pokemon");

    var dibujarPokemones2 = function(pokemones){
        //console.log(pokemones);
            var name = pokemones.name.charAt(0).toUpperCase() + pokemones.name.slice(1);
            var id = pokemones.id;
            var imagen = pokemones.sprites.front_default;
            var speed = pokemones.stats[0].base_stat;
            var specialDefense = pokemones.stats[1].base_stat;
            var specialAttack = pokemones.stats[2].base_stat;
            var defense = pokemones.stats[3].base_stat;
            var attack = pokemones.stats[4].base_stat;
            var hp = pokemones.stats[5].base_stat;
            $("#elementos").remove();
            $("#elementos-pkm").append(armarTemplate2(name, id, imagen, speed, specialDefense, specialAttack, defense, attack, hp));
            $(".back").click(function(){window.location.reload(true);});
        }

    var armarTemplate2 = function(name, id, imagen, speed, specialDefense, specialAttack, defense, attack, hp){
        var t = "<div class='info-pokemon'><div class='names-pkmn'>" + name + "</div><div class='numb-pkmn'>#" + id + "</div><img class='specific-info' src='"
        + imagen + "' alt='pokemon'><div class='cont-h3'><h3>Profile</h3></div><br><div class='container-info-p'><span class='info-p'>Speed: " + speed + "</span><br><span class='info-p'>Special Defense: " 
        + specialDefense + "</span><br><span class='info-p'>Special Attack: " + specialAttack 
        + "</span><br><span class='info-p'>Defense: " + defense + "</span><br><span class='info-p'>Attack: " 
        + attack + "</span><br><span class='info-p'>HP: " + hp + "</span></div><br><center><button class='back' >Back</button></center></div>" ;
        return t;
    }
    
    var ajaxPokemon2 = function(pokemon_id){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/'+ pokemon_id,
            type: 'GET',
            datatype: 'json',
        })
        .done(function(response){
            //console.log(response);
            dibujarPokemones2(response);
        })
        .fail(function(error){
            console.log('Error');
            swal("Error!", "Try again");
        });
    }

    ajaxPokemon2($(this).data('id'));

});
})

*/