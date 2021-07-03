export class TypePromotion {
    static getLink2Form(type, id) {
        if (type == 1) {
            return '/khuyen-mai/' + id + '/cong-trinh-tiep-theo';
        }
        if (type == 2 || type == 3) {
            return '/khuyen-mai/' + id + '/up-hoa-don-nha-qua';
             
        }
        if (type == 5) {
            return '/khuyen-mai/' + id + '/loyalty';
        }
        
        return '/khuyen-mai/' + id + '/du-doan-ket-qua-bong-da';
    }
}