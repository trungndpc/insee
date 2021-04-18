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
            case 4 : return APPROVED;
        }
    }

    static getColor(status) {
        switch(status) {
            case 1: return '#28a745';
            case 2: return '#b71c1c';
        }
    }

    static getName(status) {
        switch(status) {
            case 1 : return "Chờ nhận"
            case 2 : return "Đã nhận";
            
        }
    }
    
}

export const WAITING_RECEIVE = new GiftStatus(1);
export const RECEIVED = new GiftStatus(2);
export const ROLLED = new GiftStatus(3);
export const APPROVED = new GiftStatus(4);