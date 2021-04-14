export default class LuckyRotationGift {


    static getNameGift(deg) {
        if (deg >= 0 && deg < 45) {
            return 'Rồng Con'
        }

        if (deg >= 45 && deg < 90) {
            return 'Người Tuyết'
        } 

        if (deg >= 90 && deg < 135) {
            return 'Con Ếch'
        } 
        
        if (deg >= 135 && deg < 180) {
            return 'Con Ốc'
        } 

        if (deg >= 180 && deg < 225) {
            return 'Con Cá Heo'
        } 
        
        if (deg >= 225 && deg < 270) {
            return 'Con Bọ'
        } 

        if (deg >= 270 && deg < 315) {
            return 'Con Gấu'
        } 

        if (deg >= 315 && deg < 360) {
            return 'Con Ngựa'
        } 
    }
}