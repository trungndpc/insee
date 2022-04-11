export class TypeGiftRedeemPoint {
    constructor(type) {
        this.type = type
    }

    static findById(id) {
        switch (id) {
            case 50: return VOUCHER_DMX_50K;
            case 100: return VOUCHER_DMX_200K;
            case 250: return VOUCHER_DMX_200K_SAC_DU_PHONG;
        }
    }

    getType() {
        return this.type;
    }


    getName() {
        switch (this.type) {
            case 50: return "Voucher ĐMX 50.000 VND"
            case 100: return "Voucher ĐMX 200.000 VND"
            case 250: return "Voucher ĐMX 200.000 + Sạc dự phòng"
        }
    }

    static getList() {
        return [VOUCHER_DMX_50K, VOUCHER_DMX_200K, VOUCHER_DMX_200K_SAC_DU_PHONG]
    }

}

export const VOUCHER_DMX_50K = new TypeGiftRedeemPoint(50);
export const VOUCHER_DMX_200K = new TypeGiftRedeemPoint(100);
export const VOUCHER_DMX_200K_SAC_DU_PHONG = new TypeGiftRedeemPoint(250);
