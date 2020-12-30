

export class CustomerStatusEnum{

    constructor(status) {
        this.status = status;
    }

    static findByStatus(status) {
        switch(status) {
            case 1 : return DO_NOT_HAVE_ACCOUNT;
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
            case 1 : return '#778899';
            case 2 : return '#b71c1c';
            case 3 : return '#778899';
            case 4 : return '#088dcd';
            default: return null;
        }
    }

    getName() {
        switch(this.status) {
            case 1 : return 'Chưa có tài khoản';
            case 2 : return 'Cần xem xét';
            case 3 : return 'Đã từ chối';
            case 4 : return 'Đã chấp nhận';
            default: return null;
        }
    }
}

export const DO_NOT_HAVE_ACCOUNT = new CustomerStatusEnum(1);
export const NEED_REVIEW = new CustomerStatusEnum(2);
export const REJECTED = new CustomerStatusEnum(3);
export const APPROVED = new CustomerStatusEnum(4);