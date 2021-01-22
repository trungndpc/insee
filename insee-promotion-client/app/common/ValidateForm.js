
const vnf_regex_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
export class NowConstructionForm {

    static isValid2Create(form) {
        return this.isValidAddress(form.address)
             && this.isValidCity(form.city) 
            && this.isValidDistrict(form.district)
            && this.isValidStoreName(form.name)
            && this.isValidPhoneName(form.phone)
            && this.isValidQuantity(form.quantity)
            && this.isValidPolicy(form.extra)

    }
    static isValidAddress(address) {
        if (!address) {
            throw 'Vui lòng nhập địa chỉ'
        }
        if (address.length <= 20) {
            throw 'Địa chỉ phải lớn hơn 20 ký tự'
        }
        return true;
    }
    static isValidCity(city) {
        if (city == 0) {
            throw 'Vui lòng chọn thành phố'
        }
        return true;
    }

    static isValidDistrict(district) {
        if (district == 0) {
            throw 'Vui lòng chọn quận'
        }
        return true;
    }

    static isValidStoreName(storeName) {
        if (!storeName) {
            throw 'Vui lòng nhập tên cửa hàng'
        }
        if (address.length <= 20) {
            throw 'Tên cửa hàng phải lớn hơn 20 ký tự'
        }
        return true;
    }

    static isValidPhoneName(storePhone) {
        if (!storePhone) {
            throw 'Vui lòng nhập số điện thoại'
        }
        if (!vnf_regex_phone.test(storePhone)) {
            throw 'Số điện thoại không hợp lệ'
        }
        return true;
    }

    static isValidQuantity(quantity, min) {
        if (!quantity || quantity == 0) {
            throw 'Vui lòng nhập số lượng sản phẩm'
        }
        if (quantity < min) {
            throw 'Số lượng sản phẩm phải đủ yêu cầu của chương trình'
        }
        return true;
    }

    static isValidBill(fileList, current) {
        if ((!fileList || fileList.length == 0) && current == 0) {
            throw 'Vui lòng chọn ít nhất một hóa đơn'
        }
        if (fileList && fileList.length >= 3) {
            throw 'Số hóa đơn nhỏ hơn 3'
        }
        return true;
    }


    static isValidImg(fileList, current) {
        if ((!fileList || fileList.length == 0) && current == 0) {
            throw 'Vui lòng chọn ít nhất một hình ảnh'
        }
        if (fileList && fileList.length >= 3) {
            throw 'Số hình ảnh nhỏ hơn 3'
        }
        return true;
    }
    
    static isValidPolicy(extra) {
        let agree = extra['agree']
        if (!agree || !agree.includes(1)) {
            throw 'Vui lòng đồng ý với điều khoản của chúng tôi'
        }
    }
}

