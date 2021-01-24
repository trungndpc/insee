import { data } from "autoprefixer";

const vnf_regex_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
export class NowConstructionForm {

    static getChangeAndValidate(data, construction, promotion) {
        let change = {};
        if (data.address != construction.address) {
            if (this.isValidAddress(data.address)) {
                change.address = data.address
            }
        }
        if (data.city != construction.city) {
            if (this.isValidCity(data.city)) {
                change.city = data.city
            }
        }

        if (data.district != construction.district) {
            if (this.isValidDistrict(data.district)) {
                change.district = data.district
            }
        }

        if (data.name != construction.name) {
            if (this.isValidStoreName(data.name)) {
                change.name = data.name
            }
        }
        if (data.phone != construction.phone) {
            if (this.isValidPhoneName(data.phone)) {
                change.phone = data.phone
            }
        }

        if (data.quantity != construction.quantity) {
            if (this.isValidQuantity(data.quantity, promotion.ruleQuantily)) {
                change.quantity = data.quantity
            }
        }

        if (data.extra.agree[0] != construction.extra.agree[0]) {
            if (this.isValidPolicy(data.extra)) {
                change.extra = data.extra
            }
        }
        return change;
    }

    static isValid2Create(form, promotion) {
        return this.isValidAddress(form.address)
            && this.isValidCity(form.city)
            && this.isValidDistrict(form.district)
            && this.isValidStoreName(form.name)
            && this.isValidPhoneName(form.phone)
            && this.isValidQuantity(form.quantity, promotion.ruleQuantily)
            && this.isValidPolicy(form.extra)
    }

    static isValidAddress(address) {
        if (!address) {
            throw 'Vui lòng nhập địa chỉ'
        }
        if (address.length <= 10) {
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
        if (storeName.length <= 10) {
            throw 'Tên cửa hàng phải lớn hơn 10 ký tự'
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
        if ((!fileList || fileList.length == 0) && (!current || current == 0)) {
            throw 'Vui lòng chọn ít nhất một hóa đơn'
        }
        if (fileList && fileList.length >= 3) {
            throw 'Số hóa đơn nhỏ hơn 3'
        }
        return true;
    }


    static isValidImg(fileList, current) {
        if ((!fileList || fileList.length == 0) && (!current || current == 0)) {
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
        return true;
    }
}

export class IntroConstructionForm {

    static getChangeAndValidate(data, construction) {
        let change = {};
        if (data.address != construction.address) {
            if (this.isValidAddress(data.address)) {
                change.address = data.address
            }
        }
        if (data.city != construction.city) {
            if (this.isValidCity(data.city)) {
                change.city = data.city
            }
        }

        if (data.district != construction.district) {
            if (this.isValidDistrict(data.district)) {
                change.district = data.district
            }
        }

        if (data.name != construction.name) {
            if (this.isValidOwnerName(data.name)) {
                change.name = data.name
            }
        }
        if (data.phone != construction.phone) {
            if (this.isValidOwnerPhone(data.phone)) {
                change.phone = data.phone
            }
        }

        if (data.estimateTimeStart != construction.estimateTimeStart) {
            if (this.isValidEstimateTimeStart(data.estimateTimeStart)) {
                change.estimateTimeStart = data.estimateTimeStart
            }
        }

        if (data.typeConstruction != construction.typeConstruction) {
            if (this.isValidTypeConstruction(data.typeConstruction)) {
                change.typeConstruction = data.typeConstruction
            }
        }

        if (data.extra.agree[0] != construction.extra.agree[0]) {
            change.extra = data.extra
        }
        return change;
    }

    static isValid2Create(form) {
        return this.isValidAddress(form.address)
            && this.isValidCity(form.city)
            && this.isValidDistrict(form.district)
            && this.isValidEstimateTimeStart(form.estimateTimeStart)
            && this.isValidEstimateTimeStart(form.typeConstruction)
            && this.isValidOwnerName(form.name)
            && this.isValidOwnerPhone(form.phone)
    }

    static isValidAddress(address) {
        if (!address) {
            throw 'Vui lòng nhập địa chỉ'
        }
        if (address.length <= 10) {
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

    static isValidEstimateTimeStart(time) {
        if (!time) {
            throw 'Vui lòng chọn thời gian công trình bắt đầu'
        }
        return true
    }

    static isValidTypeConstruction(typeConstruction) {
        if (!typeConstruction || typeConstruction == 0) {
            throw 'Vui lòng chọn loại công trình'
        }
        return true;
    }

    static isValidOwnerName(storeName) {
        if (!storeName) {
            throw 'Vui lòng nhập tên chủ nhà'
        }
        if (storeName.length <= 10) {
            throw 'Tên cửa hàng phải lớn hơn 10 ký tự'
        }
        return true;
    }

    static isValidOwnerPhone(storePhone) {
        if (!storePhone) {
            throw 'Vui lòng nhập số điện thoại chủ nhà'
        }
        if (!vnf_regex_phone.test(storePhone)) {
            throw 'Số điện thoại không hợp lệ'
        }
        return true;
    }

}