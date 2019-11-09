class WanController {
    constructor() {
        this.index = this.index.bind(this);
    }

    async index(req, res) {
        res.json({
            name: "Wanda Ichsanul Isra",
        });
    }
}

module.exports = WanController;