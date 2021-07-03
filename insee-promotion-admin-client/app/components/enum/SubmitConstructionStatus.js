

export class SubmitConstructionStatus{

    constructor(value) {
        this.value = value;
    }

    static findByValue(value) {
        switch(value) {
            case 1 : return WAITING;
            case 2 : return REJECTED;
            case 3 : return APPROVED;
            default: return null;
        }
    }

    getName() {
        switch(this.value) {
            case 1: return "Chờ duyệt";
            case 2: return "Đã từ chối";
            case 3: return "Đã chấp nhận";
        }
    }

    getValue() {
        return this.value;
    }

    static getList() {
        return [WAITING, REJECTED, APPROVED]
    }

}

export const WAITING = new SubmitConstructionStatus(1);
export const REJECTED = new SubmitConstructionStatus(2);
export const APPROVED = new SubmitConstructionStatus(3);