export class TypeCustomer {

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch (type) {
            case 1: return ADMIN;
            case 2: return CONTRUCTOR;
            case 3: return RETAILER;
            case 0: return ANONYMOUS;
            default: return null;
        }
    }

    getType() {
        return this.type;
    }

    getName() {
        switch (this.type) {
            case 1: return "Admin";
            case 2: return "Nhà thầu";
            case 3: return "Cửa hàng";
            case 0: return "Người quan tâm";
            default: return null;
        }
    }
}

export const ADMIN = new TypeCustomer(1);
export const CONTRUCTOR = new TypeCustomer(2);
export const RETAILER = new TypeCustomer(3);
export const ANONYMOUS = new TypeCustomer(0);