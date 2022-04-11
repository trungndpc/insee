
export class TypeLoyalty {

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch (type) {
            case 1: return ACCUMULATION_BAG;
            case 2: return ACCUMULATION_POINT;
            case 3: return PHEN_MAM;
            default: return null;
        }
    }

    getName() {
        switch (this.type) {
            case 1: return "Tích lũy bao";
            case 2: return "Tích lũy điểm";
            case 3: return "Phèn mặn"
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [ACCUMULATION_BAG, ACCUMULATION_POINT, PHEN_MAM]
    }

}



export const ACCUMULATION_BAG = new TypeLoyalty(1);
export const ACCUMULATION_POINT = new TypeLoyalty(2);
export const PHEN_MAM = new TypeLoyalty(3);
