import Alert from 'react-s-alert';

export default class AlertUtils {
  static CREATE_PROMOTION_SUCCESS = 'Thành công';
  static CREATE_PROMOTION_FAILED = 'Thất bại'

  static showSuccess(message) {
    Alert.success(message, {
      position: 'top-right',
      effect: 'slide',
      timeout: 4000,
      offset: 50
    });
  }

  static showWarning(message) {
    Alert.warning(message, {
      position: 'top-right',
      effect: 'slide',
      timeout: 4000,
      offset: 50
    });
  }

  static showError(message) {
    Alert.error(message, {
      position: 'top-right',
      effect: 'slide',
      timeout: 4000,
      offset: 50
    });
  }
}
