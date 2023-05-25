function DSNV() {
    this.arr = [];

    // Thêm nv vào DSNV
    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    //Tìm vị trí đối tượng trong mảng
    this.timViTri = function (taiKhoan) {
        /**
         * 0. Tạo bất kì biến nào != 0, mà arr đã có vị trí từ 0 trở lên rồi nên ta tạo biến index = -1;
         * 1. Duyệt mảng để lấy qua hết các phần tử trong mảng
         * 2. nv =  arr [i]
         * 3. Nếu nv.taiKhoan trùng với taiKhoan, if true ==> index = i
         * break  
         */

        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };

    // Xoá nv khỏi DSNV
    this.xoaNV = function (taiKhoan) {
        //Tạo biến index và gán giá trị từ hàm timViTri
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        };
    };

    //Lấy thông tin nv
    this.layThongTinNV1 = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index != -1) {
            return this.arr[index];
        }
        return null;
    }

    // Cập nhật nv từ DSNV
    this.capNhatNV = function (nv) {
        var index = this.timViTri(nv.taiKhoan);
        if (index != -1) {
            this.arr[index] = nv;
        }
    };

    //Tìm kiếm 
    this.timKiemNV = function (keyword) {
        var mangTimKiem = [];
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            var keywordLowerCase = keyword.toLowerCase();
            var loaiNVLowerCase = nv.xepLoai.toLowerCase();
            if (loaiNVLowerCase.indexOf(keywordLowerCase) !== -1) {
                mangTimKiem.push(nv);
            }

        }
        return mangTimKiem;
    };
};