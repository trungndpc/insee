
export default class CommonUtil {

  
    static formatMoney(money) {
      return money.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
    }
  
  
  }
  