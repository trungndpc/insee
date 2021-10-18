

export class TypePromotion{

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch(type) {
            case 1 : return NEXT_CONSTRUCTION;
            case 2 : return NOW_CONSTRUCTION;
            case 3 : return NOW_CONSTRUCTION_V2;
            case 4 : return PREDICT_FOOTBALL;
            case 5 : return LOYALTY;
            case 6 : return SHARE_LINK_TO_REGISTER;
            default: return null;
        }
    }

    getName() {
        switch(this.type) {
            case 1: return "Công trình tiếp theo";
            case 2: return "Upload hóa đơn nhận quà";
            case 3: return "Upload hóa đơn nhận quà v2";
            case 4: return "Dự đoán kết quả bóng đá"
            case 5: return "Loyalty"
            case 6: return "Chia sẻ link đăng ký"
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [NEXT_CONSTRUCTION, NOW_CONSTRUCTION, NOW_CONSTRUCTION_V2, PREDICT_FOOTBALL, LOYALTY, SHARE_LINK_TO_REGISTER]
    }

}



export const NEXT_CONSTRUCTION = new TypePromotion(1);
export const NOW_CONSTRUCTION = new TypePromotion(2);
export const NOW_CONSTRUCTION_V2 = new TypePromotion(3);
export const PREDICT_FOOTBALL = new TypePromotion(4);
export const LOYALTY = new TypePromotion(5);
export const SHARE_LINK_TO_REGISTER = new TypePromotion(6);