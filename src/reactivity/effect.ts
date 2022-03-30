class ReactiveEffect {
  private _fn: Function;
  constructor(fn) {
    this._fn = fn
  }
  //收集依赖
  effect() {

  }
  //触发依赖
  run() {
    activeEffect = this
    this._fn()
  }
}
const targetMap = new Map()
export function track(target, key) {
  //target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, key);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

