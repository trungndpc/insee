export class MatchStatus {

    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    static findById(id) {
        switch(id) {
            case 1 : return INIT;
            case 2 : return PROCESSING;
            case 3 : return DONE;
        }
    }

    static getList() {
        return [INIT, PROCESSING, DONE]
    }
}

export const INIT = new MatchStatus(1, 'Sắp bắt đầu', '#007bff');
export const PROCESSING = new MatchStatus(2, 'Đang diễn ra', '#28a745')
export const DONE = new MatchStatus(3, 'Đã kết thúc', '#dc3545');