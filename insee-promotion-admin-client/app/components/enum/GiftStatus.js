export class  GiftStatus {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status;
    }

    static findByStatus(status) {
        switch(status) {
            case 1 : return WAITING_RECEIVE;
            case 2 : return RECEIVED;
            case 3 : return ROLLED;
            case 4 : return WAITING_SENT;
        }
    }

    static getColor(status) {
        switch(status) {
            case 1: return '#1890ff';
            case 2: return '#b71c1c';
            case 3: return  '#ff4d4f';
            case 4: return '#ff4d4f'
        }
    }

    static getName(status) {
        switch(status) {
            case 1 : return "Chờ nhận"
            case 2 : return "Đã nhận"
            case 3 : return "Đã quay"
            case 4 : return "Chờ Gửi"
        }
    }
    
}
export const WAITING_RECEIVE = new GiftStatus(1);
export const RECEIVED = new GiftStatus(2);
export const ROLLED = new GiftStatus(3)
export const WAITING_SENT = new GiftStatus(4);