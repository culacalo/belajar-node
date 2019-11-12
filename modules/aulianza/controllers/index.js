class AulianzaController {
    constructor() {
        this.index = this.index.bind(this)
    }

    index(req, res) {
        res.send({
            name: "aulianza",
            age: "21",
            education: {
                sd: "sdn 16"
            }
        })
    }

}
module.exports = AulianzaController;