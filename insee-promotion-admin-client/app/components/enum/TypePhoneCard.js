export class TypePhoneCard {

    constructor(value) {
        this.value = value
    }

    static findByValue(value) {
        switch (value) {
            case 10: return CARD_10K;
            case 20: return CARD_20K;
            case 50: return CARD_50K;
            case 100: return CARD_100K;
            case 200: return CARD_200K;
            case 300: return CARD_300K;
            case 500: return CARD_500K;
            case 1000: return CARD_1000K;
        }
    }

    getType() {
        return this.value;
    }


    static getList() {
        return [CARD_10K, CARD_20K, CARD_50K, CARD_100K, CARD_200K, CARD_300K, CARD_500K, CARD_1000K]
    }

}

export const CARD_10K = new TypePhoneCard(10);
export const CARD_20K = new TypePhoneCard(20);
export const CARD_50K = new TypePhoneCard(50);
export const CARD_100K = new TypePhoneCard(100);
export const CARD_200K = new TypePhoneCard(200);
export const CARD_300K = new TypePhoneCard(300);
export const CARD_500K = new TypePhoneCard(500);
export const CARD_1000K = new TypePhoneCard(1000);


