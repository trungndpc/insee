export class TypePromotion {
    // NEXT_CONSTRUCTION(1), NOW_CONSTRUCTION(2), NOW_CONSTRUCTION_V2(3), PREDICT_FOOTBALL(4), LOYALTY(5);
    constructor(type) {
        this.type = type;
    }

    static getLink2Detail(type, id) {
        switch(type) {
            case NEXT_CONSTRUCTION.type :
                return '/khuyen-mai/' + id + '/cong-trinh-tiep-theo';
            case NOW_CONSTRUCTION.type : 
            case NOW_CONSTRUCTION_V2.type : 
                return '/khuyen-mai/' + id + '/up-hoa-don-nha-qua';
            case PREDICT_FOOTBALL.type : 
                return '/khuyen-mai/' + id + '/du-doan-ket-qua-bong-da'; 
            case SHARE_LINK_REGISTRY.type : 
                return '/khuyen-mai/' + id + '/gioi-thieu-thanh-vien';
            case LOYALTY.type : 
                return '/khuyen-mai/' + id + '/loyalty';
        }
    }
}

export const NEXT_CONSTRUCTION = new TypePromotion(1)
export const NOW_CONSTRUCTION  = new TypePromotion(2)
export const NOW_CONSTRUCTION_V2 = new TypePromotion(3)
export const PREDICT_FOOTBALL = new TypePromotion(4)
export const LOYALTY = new TypePromotion(5)
export const SHARE_LINK_REGISTRY = new TypePromotion(6)

