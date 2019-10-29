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
