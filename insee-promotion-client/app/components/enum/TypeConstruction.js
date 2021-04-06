

export class TypeConstruction{

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch(type) {
            case 1 : return NEXT_CONSTRUCTION;
            case 2 : return NOW_CONSTRUCTION;
            case 3 : return NOW_CONSTRUCTION_V2;
            default: return null;
        }
    }

    getType() {
        return this.type;
    }

    
}

export const NEXT_CONSTRUCTION = new TypeConstruction(1);
export const NOW_CONSTRUCTION = new TypeConstruction(2);
export const NOW_CONSTRUCTION_V2 = new TypeConstruction(3);
