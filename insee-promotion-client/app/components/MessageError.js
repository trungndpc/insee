
const ERROR_MSG = {
    11: 'Thông tin nhà thầu cần được duyệt để có thể tham gia các chương trình khuyến mãi'
}
export default class MessageError {
    static getMsg(error) {
        return ERROR_MSG[-error];
    }
    
}