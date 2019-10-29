const w = window.innerWidth
const h = window.innerHeight
const scGap = 0.02
const delay = 30

class ScaleUtil {

    static sinify(scale) {
        return Math.sin(scale * Math.PI)
    }

    static update(scale, dir) {
        return scale + dir * scGap
    }
}

class State {

    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale = ScaleUtil.update(scale, dir)
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
