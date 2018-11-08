module.exports = function(application){
    application.get("/produto", function(req, res){
        application.app.controllers.produto.produto(application, req, res)
    })
    
    application.get("/addProduto", function(req, res){
        application.app.controllers.produto.addProduto(application, req, res)
    })

    application.post("/addProduto", function(req, res){
        application.app.controllers.produto.salvarProduto(application, req, res)
    })

    application.get("/listarProduto", function(req, res){
        application.app.controllers.produto.listarProduto(application, req, res)
    })
}