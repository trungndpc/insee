export class TypeGiftRedeemPoint {
    constructor(type) {
        this.type = type
    }

    static findById(id) {
        switch (id) {
            case 20: return CARD_PHONE;
            case 200: return VOUCHER;
            case 1000: return MICROWAVE;
            case 5000: return MOTORCYCLE;
        }
    }

    getType() {
        return this.type;
    }


    getName() {
        switch (this.type) {
            case 20: return "Thẻ điện thoại"
            case 200: return "Phiếu giảm giá"
            case 1000: return "Lò vi sóng"
            case 5000: return "Xe máy"

        }
    }

    static getList() {
        return [CARD_PHONE, VOUCHER, MICROWAVE, MOTORCYCLE]
    }

}

export const CARD_PHONE = new TypeGiftRedeemPoint(20);
export const VOUCHER = new TypeGiftRedeemPoint(200);
export const MICROWAVE = new TypeGiftRedeemPoint(1000);
export const MOTORCYCLE = new TypeGiftRedeemPoint(5000);
