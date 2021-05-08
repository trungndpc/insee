

export class CustomerStatusEnum{

    constructor(status) {
        this.status = status;
    }

    static findByStatus(status) {
        switch(status) {
            case 1 : return NEED_REVIEW;
            case 2 : return APPROVED;
            case 3 : return REJECTED;
            default: return null;
        }
    }

    getStatus() {
        return this.status;
    }

    getColor() {
        switch(this.status) {
            case 1 : return '#b71c1c';
            case 2 : return '#778899';
            case 3 : return '#778899';
            default: return null;
        }
    }

    getName() {
        switch(this.status) {
            case 1 : return 'Cần xem xét';
            case 2 : return 'Đã chấp nhận';
            case 3 : return 'Từ chối';
            default: return null;
        }
    }
}

export const NEED_REVIEW = new CustomerStatusEnum(1);
export const APPROVED = new CustomerStatusEnum(2);
export const REJECTED = new CustomerStatusEnum(3);