class ReactiveEffcet {
  _fn: Function
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}
const targetMap = new Map()
export function track(target, key) {
  //targetMap => deps => dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    effect.run()
  }
}
let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffcet(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}
