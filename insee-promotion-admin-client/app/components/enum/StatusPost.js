export class StatusPost {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status;
    }

    getName() {
        switch(this.status) {
            case 1 : return 'Mới khởi tạo'
            case 2 : return 'Đang soạn thảo'
            case 3 : return 'Công khai'
            case 4 : return 'Đã xóa'
        }
    }

    static findBySatus(status) {
        switch(status) {
            case 1 : return INIT;
            case 2 : return EDITING;
            case 3 : return PUBLISHED;
            case 4 : return DELETED;
        }
    }

}

export const INIT = new StatusPost(1);
export const EDITING = new StatusPost(2);
export const PUBLISHED = new StatusPost(3);
export const DELETED = new StatusPost(4);
