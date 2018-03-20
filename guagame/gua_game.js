/*
var guaGame = function(fps, images, runCallback) {
    // images 是一个对象,里面是图片的引用名字和路径
    // 程序在所有图片加载完成后才运行
    var g = {
        // 存储事件 比方说 {'a': paddle.moveLeft()}
        actions: {},
        // 存储按键状态 比方说 {'a': true}  'a' 键被按下 / 'a' 键松开
        keydowns: {},
        // 存储图片信息 比方说 {'paddle': paddle 这张图片}
        images: {},
        // 存储当前游戏场景
        scene: null,
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // log('context:', g.context)
    // draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    // events
    window.addEventListener('keydown', function(event){
        // 通过 event.key 取到按了哪个键
        var key = event.key
        g.keydowns[key] = true
    })
    window.addEventListener('keyup', function(event){
        var key = event.key
        g.keydowns[key] = false
    })
    // register
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
    // timer
    window.fps = 30
    var runloop = function() {
        // 查看事件
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 若按键被按下,调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for(var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        // log('name', name)
        // log('path', path)
        let img = new Image()
        img.src = path
        // image 的 onload() 事件
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片载入完成后,调用 run
            // 这里是个异步,未采用 promise 等异步解决方法,而是用了一个比较原始的土方法
            // 判断两个数组长度来检测是否加载完全
            loads.push(1)
            if(loads.length === names.length) {
                g.__start()
            }
        }
    }

    g.imageByName = function(name) {
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = function(scene) {
        g.scene = scene
        // 定时器
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }
    // 开始运行程序
    g.__start = function(scene) {
        runCallback(g)
    }

    return g
}
*/

class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        var self = this
        // events
        window.addEventListener('keydown', event => {
            // 通过 event.key 取到按了哪个键
            var key = event.key
            this.keydowns[key] = true
        })
        window.addEventListener('keyup', function(event){
            var key = event.key
            self.keydowns[key] = false
        })
        this.init()
    }

    // 单例模式,目的是为了只初始化这个类一次
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // img 是一个 guaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // register
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    runloop() {
        log(window.fps)
        var g = this
        // 查看事件
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 若按键被按下,调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        this.context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(this.images)
        for(var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
            // log('name', name)
            // log('path', path)
            let img = new Image()
            img.src = path
            // image 的 onload() 事件
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片载入完成后,调用 run
                // 这里是个异步,未采用 promise 等异步解决方法,而是用了一个比较原始的土方法
                // 判断两个数组长度来检测是否加载完全
                loads.push(1)
                if(loads.length === names.length) {
                    g.__start()
                }
            }
        }
    }
    textureByName(name) {
        var g = this
        log('image by name', g.images)
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 定时器
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        var g = this
        g.scene = scene
    }
    // 开始运行程序
    __start(scene) {
        var g = this
        this.runCallback(g)
    }
}
