export class  TypeGift {
    constructor(type) {
        this.type = type
    }

    static findById(id) {
        switch(id) {
            case 1 : return CARD_PHONE;
            case 2 : return LUCKY_DRAW_ROTATION;
        }
    }

    getType() {
        return this.type;
    }


    getName(id) {
        switch(id) {
            case 1 : return "Thẻ cào"
            case 2 : return "Vòng quay may mắn"
        }
    }
    
}

export const CARD_PHONE = new TypeGift(1);
export const LUCKY_DRAW_ROTATION = new TypeGift(2);