export class UserRole{

    constructor(roleId) {
        this.roleId = roleId;
    }

    static findByRoleId(roleId) {
        switch(roleId) {
            case 1: return ADMIN;
            case 2: return CONTRUCTOR;
            case 3: return RETAILER;
            case 0: return ANONYMOUS;
            default: return null;
        }
    }

    getRoleId() {
        return this.roleId;
    }

    getName() {
        switch(this.roleId) {
            case 1: return "Admin";
            case 2: return "Nhà thầu";
            case 3: return "Cửa hàng";
            case 0: return "Người quan tâm";
            default: return null;
        }
    }
}

export const ADMIN = new UserRole(1);
export const CONTRUCTOR = new UserRole(2);
export const RETAILER = new UserRole(3);
export const ANONYMOUS = new UserRole(0);