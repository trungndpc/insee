
export default class AppUtils {

  static push(path) {
    window.pushHistory(path)
  }

  static toggleModal(isOpen) {
    if (isOpen) {
      document.body.className = 'open-modal'
    } else {
      document.body.className = ''
    }
  }


}
