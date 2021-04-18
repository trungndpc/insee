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
        }
    }

    static getColor(status) {
        switch(status) {
            case 1: return '#1890ff';
            case 2: return '#b71c1c';
            case 3: return  '#ff4d4f';
        }
    }

    static getName(status) {
        switch(status) {
            case 1 : return "Chờ nhận"
            case 2 : return "Đã nhận"
            case 3 : return "Đã quay"
        }
    }
    
}
export const WAITING_RECEIVE = new GiftStatus(1);
export const RECEIVED = new GiftStatus(2);
export const ROLLED = new GiftStatus(3)