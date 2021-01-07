export class  ImageStatus {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status;
    }

    static findByStatus(status) {
        switch(status) {
            case 1 : return WAITING_APPROVAL;
            case 2 : return APPROVED;
            case 3 : return REJECTED;
        }
    }

    static getColor(status) {
        switch(status) {
            case 1: return '#fff';
            case 2: return '#28a745';
            case 3: return '#b71c1c'
        }
    }
    
}
export const WAITING_APPROVAL = new ImageStatus(1);
export const APPROVED = new ImageStatus(2);
export const  REJECTED = new ImageStatus(3);