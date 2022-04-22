

export class TypeBroadcast {

    constructor(type) {
        this.type = type;
    }

    static findByType(type) {
        switch (type) {
            case 1: return BASIC_BROADCAST;
            default: return null;
        }
    }

    getName() {
        switch (this.type) {
            case 1: return "Broadcast bài viết";
        }
    }

    getType() {
        return this.type;
    }

    static getList() {
        return [BASIC_BROADCAST]
    }

}

export const BASIC_BROADCAST = new TypeBroadcast(1);