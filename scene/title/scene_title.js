class GuaLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
        var label = GuaLable.new(game, 'hello')
        this.addElement(label)
        this.setupInputs()
    }
    setupInputs() {
        this.game.registerAction('k', function(){
            var s = Scene(game)
            this.game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        // this.game.context.fillText('按 k 游戏开始', 100, 100)
        super.draw()
    }
    update() {
        super.update()
    }
}

/**
var SceneTitle = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('k', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })

    s.draw = function() {
        // draw labels
        game.context.fillText('按 k 游戏开始', 100, 100)
    }

    s.update = function() {
    }

    return s
}
**/
