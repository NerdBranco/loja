module.exports = function(application){
    application.get("/carrinho", function(req, res){
        application.app.controllers.carrinho.carrinho(application, req, res)
    })
}