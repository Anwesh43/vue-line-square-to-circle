const w = window.innerWidth
const h = window.innerHeight
const scGap = 0.02
const delay = 50
const sizeFactor = 7

class ScaleUtil {

    static sinify(scale) {
        return Math.sin(scale * Math.PI)
    }

    static update(scale, dir) {
        return scale + dir * scGap
    }

    static midSinify(scale) {
        return Math.sin(scale * Math.PI / 2)
    }
}

class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale = ScaleUtil.update(this.scale, this.dir)
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {

    constructor() {
        this.animated = false
    }

    start(cb) {
       if (!this.animated) {
          this.animated = true
          this.interval = setInterval(cb, delay)
       }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

const animator = new Animator()

Vue.component('line-square-to-circle', {
    template : '#squareToCircle',
    data() {
        const state = new State()
        const size = Math.min(w, h) / sizeFactor
        const x = w / 2 - size / 2
        const y = h / 2 - size / 2
        const r = 0
        const l = 0
        return {x, y, r, state, size, l}
    },
    methods : {
        start() {
            this.state.startUpdating(() => {
                  animator.start(() => {
                      this.move()
                      this.state.update(() => {
                          animator.stop()
                          this.move()
                      })
                  })
            })
        },

        move() {

            const sf = ScaleUtil.sinify(this.state.scale)
            const change = w / 2 * sf
            this.x = w / 2 - this.size / 2 + change
            this.l = change
            this.r = 50 * ScaleUtil.midSinify(this.state.scale)
        }
    }
})

const vueInstance = new Vue({
    el : '#app',
})
