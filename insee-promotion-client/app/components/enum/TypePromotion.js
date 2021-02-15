export class TypePromotion {
    static getLink2Form(type, id) {
        return  '/khuyen-mai/' + id + '/' + (type == 1  ? 'cong-trinh-tiep-theo' : 'up-hoa-don-nha-qua');

    }
}