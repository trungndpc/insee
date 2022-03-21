
export class RedeemPointStatus {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status;
    }

    static findByStatus(status) {
        switch (status) {
            case 1: return INIT;
            case 2: return APPROVED;
            case 3: return SENT_GIFT;
        }
    }

    static getColor(status) {
        switch (status) {
            case 1: return '#1890ff';
            case 2: return '#b71c1c';
            case 3: return '#ff4d4f';
        }
    }

    getName() {
        switch (this.status) {
            case 1: return "Chờ duyệt"
            case 2: return "Đã duyệt - chờ gửi"
            case 3: return "Đã gửi"
        }
    }

}
export const INIT = new RedeemPointStatus(1);
export const APPROVED = new RedeemPointStatus(2);
export const SENT_GIFT = new RedeemPointStatus(3);