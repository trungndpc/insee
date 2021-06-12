

export class WraperTypeConstruction{

    constructor(id, typeConstructions, typeGifts, name) {
        this.id = id;
        this.typeConstructions  = typeConstructions;
        this.typeGifts = typeGifts;
        this.name = name
    }

    static findById(id) {
        switch(id) {
            case 1 : return UPLOAD_BILL_CARD_PHONE;
            case 2 : return UPLOAD_BILL_VOUCHER;
            case 3 : return INTRODUCTION_CONSTRUCTION;
            case 4 : return PREDICT_FOOTBALL;
            case 5 : return UPLOAD_VALUE_BILL;
            
        }
    }


    static getList() {
        return [UPLOAD_BILL_CARD_PHONE, UPLOAD_BILL_VOUCHER, INTRODUCTION_CONSTRUCTION, PREDICT_FOOTBALL, UPLOAD_VALUE_BILL]
    }

}


export const UPLOAD_BILL_CARD_PHONE = new WraperTypeConstruction(1, [2], [1], 'Up hóa đơn - Card Điện Thoại');
export const UPLOAD_BILL_VOUCHER = new WraperTypeConstruction(2, [2], [3],'Up hóa đơn - Voucher');
export const INTRODUCTION_CONSTRUCTION = new WraperTypeConstruction(3, [1], [1, 3], 'Giới thiệu công trình');
export const PREDICT_FOOTBALL = new WraperTypeConstruction(4, [4], [1, 3], 'Dự đoán kết quả bóng đá');
export const UPLOAD_VALUE_BILL = new WraperTypeConstruction(5, [3], [1,3], "Upload giá trị hóa đơn")