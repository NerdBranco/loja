$(function () {
    var carrinho = [];

    $("#search-produtos").keyup(function () {
        var texto = $(this).val().toLowerCase();

        $(".linhas-produtos").removeClass("d-none");
        $(".linhas-produtos").each(function () {
            if ($(this).text().toLowerCase().indexOf(texto) < 0)
                $(this).addClass("d-none");
        });
    });
    $(".addCar").click(function () {
        if ($(this).text() == 'Adicionar ao carrinho') {
            $(this).css('background-color', 'DimGray');
            $(this).text('Remover do carrinho');
            carrinho.push($(this).attr("id"));
            $("#comprarItens").text('Comprar itens selecionados [' + carrinho.length + ']');
        } else {
            $(this).css('background-color', '');
            $(this).text('Adicionar ao carrinho');
            let index = carrinho.indexOf($(this).attr("id"));
            carrinho.splice(index, 1);
            $("#comprarItens").text('Comprar itens selecionados [' + carrinho.length + ']');
        }
        console.log(carrinho);
    });

    $("#comprarItens").click(function () {
        
        $(this).ajax({
            url: 'http://10.0.0.108:8071',
            data: '{"data": "test de envio"',
            type: 'post',
            success: {
                
            }
        })
        
    });
});