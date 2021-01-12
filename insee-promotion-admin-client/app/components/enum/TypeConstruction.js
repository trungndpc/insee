

export class TypeConstruction{

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch(type) {
            case 1 : return NEXT_CONSTRUCTION;
            case 2 : return NOW_CONSTRUCTION;
            default: return null;
        }
    }

    getName() {
        switch(this.type) {
            case 1: return "Công trình tiếp theo";
            case 2: return "Upload hóa đơn nhận quà";
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [NEXT_CONSTRUCTION, NOW_CONSTRUCTION]
    }

}



export const NEXT_CONSTRUCTION = new TypeConstruction(1);
export const NOW_CONSTRUCTION = new TypeConstruction(2);