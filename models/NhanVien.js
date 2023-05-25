function NhanVien(_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _soGioLam) {
    // Property
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.soGioLam = _soGioLam;
    this.tongLuong = 0;
    this.loai = "";

    // Method
    this.tinhTongLuong = function () {
        if (this.chucVu === "Sếp") {
            this.tongLuong = Number(this.luongCoBan) * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = Number(this.luongCoBan) * 2;
        } else if (this.chucVu === "Nhân viên") {
            this.tongLuong = Number(this.luongCoBan) * 1;
        }
    };

    this.xepLoai = function () {
        if (this.soGioLam >= 192) {
            this.loai = "Xuất sắc";
        } else if (this.soGioLam >= 176 && this.soGioLam < 192) {
            this.loai = "Giỏi";
        } else if (this.soGioLam >= 160 && this.soGioLam < 176) {
            this.loai = "Khá";
        } else {
            this.loai = "Trung Bình";
        }
        return this.loai;
    };
}