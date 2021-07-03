

export class TypeConstruction{

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch(type) {
            case 1 : return NEXT_CONSTRUCTION;
            case 2 : return NOW_CONSTRUCTION;
            case 3 : return NOW_CONSTRUCTION_V2;
            case 4 : return LOYALTY;
            default: return null;
        }
    }

    getName() {
        switch(this.type) {
            case 1: return "Công trình tiếp theo";
            case 2: return "Upload hóa đơn nhận quà";
            case 3: return "Upload hóa đơn nhận quà v2";
            case 4: return "Loyalty"
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2, LOYALTY]
    }

}



export const NEXT_CONSTRUCTION = new TypeConstruction(1);
export const NOW_CONSTRUCTION = new TypeConstruction(2);
export const NOW_CONSTRUCTION_V2 = new TypeConstruction(3);
export const LOYALTY = new TypeConstruction(4);