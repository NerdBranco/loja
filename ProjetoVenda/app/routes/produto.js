module.exports = function(application){
    application.get("/produto", function(req, res){
        application.app.controllers.produto.produto(application, req, res)
    })
}