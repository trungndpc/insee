
export class TypeLoyalty {

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch (type) {
            case 1: return ACCUMULATION_BAG;
            case 2: return ACCUMULATION_POINT;
            default: return null;
        }
    }

    getName() {
        switch (this.type) {
            case 1: return "Tích lũy bao";
            case 2: return "Tích lũy điểm";
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [ACCUMULATION_BAG, ACCUMULATION_POINT]
    }

}



export const ACCUMULATION_BAG = new TypeLoyalty(1);
export const ACCUMULATION_POINT = new TypeLoyalty(2);
