export class StatusBroadcast {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status;
    }

    getName() {
        switch (this.status) {
            case 0: return 'Chờ duyệt'
            case 1: return 'Thành công'
            case -1: return 'Thất bại'
            case 2: return 'Đã duyệt'
        }
    }

    static findBySatus(status) {
        switch (status) {
            case 0: return INIT;
            case 1: return SUCCESS;
            case -1: return FAILED;
            case 2: return APPROVED;
        }
    }

}

export const INIT = new StatusBroadcast(0);
export const SUCCESS = new StatusBroadcast(1);
export const FAILED = new StatusBroadcast(-1);
export const APPROVED = new StatusBroadcast(2);
