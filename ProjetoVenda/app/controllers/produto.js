module.exports.produto = function (application, req, res) {
    res.render("./produto/produto");
}

module.exports.addProduto = function (application, req, res) {
    res.render("./produto/add", { validacao: {}, dadosForm: {}, adicionado: {bool: 0}});
}

module.exports.listarProduto = function (application, req, res) {

    req.getConnection(function (error, conn) {
        conn.query('SELECT * FROM produto ORDER BY id', function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                res.render("./produto/listar", {
                    title: 'Product List',
                    data: ''
                });
            } else {
                // render to views/user/list.ejs template file
                res.render("./produto/listar", {
                    title: 'Product List',
                    data: rows
                });
            }
        })
    })
}

module.exports.salvarProduto = function (application, req, res) {
    var dadosForm = req.body;
    req.assert('nomeProduto', 'Nome não pode ser vazio!').notEmpty();
    req.assert('precoProduto', 'Preco não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        //res.send('existem erros no formulario');
        res.render('./produto/add', { validacao: erros, dadosForm: dadosForm, adicionado: {bool: 0} });
        return;
    } else {
        var produto = {
            nome: req.sanitize('nomeProduto').escape().trim(),
            preco: req.sanitize('precoProduto').escape().trim()
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO produto SET ?', produto, function (err, result) {
                if (err) {
                    req.flash('error', err)

                    res.render('./produto/add', {
                        title: 'Add new product',
                        nomeProduto: produto.nome,
                        precoProduto: produto.preco,
                        validacao: {},
                        adicionado: {bool: 0},
                        dadosForm: {}
                    })
                } else {
                    req.flash('success', 'Data added succefully!')

                    res.render('./produto/add', {
                        title: 'Add new product',
                        nomeProduto: '',
                        precoProduto: '',
                        validacao: {},
                        adicionado: {
                            bool: 1,
                            msg: 'Produto adicionado com sucesso!'
                        },
                        dadosForm: {}
                    })
                }
            })
        })
    }
}