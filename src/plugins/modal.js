import CharacterModal from '../components/CharacterModal'

const Modal = {
  install(Vue) {
    this.EventBus = new Vue()
    Vue.component('app-modal', CharacterModal)
    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit('show', params)
      }
    }
  }
}

export default Modal