export class StatusConstruction {

    constructor(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getName() {
        switch(this.status) {
            case 1 : return 'Chờ duyệt'
            case 2 : return 'Đã xác nhận'
            case 3 : return 'Không xác nhận'
            case 4 : return 'Đã gửi quà'
            case 5 : return "Đã nhận quà"
            case 6 : return 'Đã chỉnh sữa lại'
            case 7 : return 'Đã xác nhận'
            case 8 : return 'Cần duyệt thêm'
            case 0 : return 'Chờ submit'
        }
    }



}

export function findByStatus(status) {
    switch(status) {
        case 1 : return WAITING_APPROVAL;
        case 2 : return APPROVED;
        case 3 : return REJECTED;
        case 4 : return SEND_GIFT;
        case 5 : return RECIEVED;
        case 6 : return RE_SUBMIT;
        case 7 : return VERIFIRED;
        case 8 : return NEED_APPROVAL_AGAIN;
        case 0 : return WAITING_SUBMIT;
    }
}
export const WAITING_APPROVAL = new StatusConstruction(1);
export const APPROVED = new StatusConstruction(2);
export const REJECTED = new StatusConstruction(3);
export const SEND_GIFT = new StatusConstruction(4);
export const RECIEVED = new StatusConstruction(5);
export const RE_SUBMIT = new StatusConstruction(6);
export const VERIFIRED = new StatusConstruction(7);
export const NEED_APPROVAL_AGAIN = new StatusConstruction(8);
export const WAITING_SUBMIT = new StatusConstruction(0);


