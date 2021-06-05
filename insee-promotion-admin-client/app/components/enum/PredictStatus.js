export class PredictStatus {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static findById(id) {
        switch(id) {
            case 1 : return INIT;
            case 2 : return LOCKED;
            case 3 : return FAILED;
            case 4 : return SUCCESS;
            case 5 : return SEND_GIFT;
        }
    }

    static getList() {
        return [INIT, LOCKED, FAILED, SUCCESS, SEND_GIFT]
    }
}

export const INIT = new PredictStatus(1, 'Mới khởi tạo');
export const LOCKED = new PredictStatus(2, 'Đã khóa')
export const FAILED = new PredictStatus(3, 'Thất bại');
export const SUCCESS = new PredictStatus(4, 'Thành công');
export const SEND_GIFT = new PredictStatus(5, 'Đã gửi quà')
