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
    }
}
export const WAITING_APPROVAL = new StatusConstruction(1);
export const APPROVED = new StatusConstruction(2);
export const REJECTED = new StatusConstruction(3);
export const SEND_GIFT = new StatusConstruction(4);
export const RECIEVED = new StatusConstruction(5);

