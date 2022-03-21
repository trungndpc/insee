

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
            case 5 : return COLLECT_POINT;
            default: return null;
        }
    }

    getName() {
        switch(this.type) {
            case 1: return "Công trình tiếp theo";
            case 2: return "Upload hóa đơn nhận quà";
            case 3: return "Upload hóa đơn nhận quà v2";
            case 4: return "Loyalty"
            case 5: return "Tích điểm đổi quà"
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2, LOYALTY, COLLECT_POINT]
    }

}



export const NEXT_CONSTRUCTION = new TypeConstruction(1);
export const NOW_CONSTRUCTION = new TypeConstruction(2);
export const NOW_CONSTRUCTION_V2 = new TypeConstruction(3);
export const LOYALTY = new TypeConstruction(4);
export const COLLECT_POINT = new TypeConstruction(5);
