

export class CustomerStatus{

    constructor(status) {
        this.status = status;
    }

    static findByStatus(status) {
        switch(status) {
            case 2 : return NEED_REVIEW;
            case 3 : return REJECTED;
            case 4 : return APPROVED;
            default: return null;
        }
    }

    getStatus() {
        return this.status;
    }

    getColor() {
        switch(this.status) {
            case 2 : return '#b71c1c';
            case 3 : return '#778899';
            case 4 : return '#088dcd';
            default: return null;
        }
    }

    getName() {
        switch(this.status) {
            case 2 : return 'Cần xét duyệt';
            case 3 : return 'Đã từ chối';
            case 4 : return 'Đã chấp nhận';
            default: return null;
        }
    }
}

export const NEED_REVIEW = new CustomerStatus(2);
export const REJECTED = new CustomerStatus(3);
export const APPROVED = new CustomerStatus(4);