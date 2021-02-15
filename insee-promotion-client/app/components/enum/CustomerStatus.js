

export class CustomerStatus{

    constructor(status) {
        this.status = status;
    }

    static findByStatus(status) {
        switch(status) {
            case 1 : return NEED_REVIEW;
            case 3 : return REJECTED;
            case 2 : return APPROVED;
            default: return null;
        }
    }

    getStatus() {
        return this.status;
    }

    getColor() {
        switch(this.status) {
            case 1 : return '#b71c1c';
            case 3 : return '#778899';
            case 2 : return '#088dcd';
            default: return null;
        }
    }

    getName() {
        switch(this.status) {
            case 1 : return 'Cần xét duyệt';
            case 3 : return 'Đã từ chối';
            case 2 : return 'Đã chấp nhận';
            default: return null;
        }
    }
}

export const NEED_REVIEW = new CustomerStatus(1);
export const REJECTED = new CustomerStatus(3);
export const APPROVED = new CustomerStatus(2);