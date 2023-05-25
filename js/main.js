var dsnv = new DSNV();

var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

//Tạo hàm lấy thông tin nhân viên
function layThongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value
    var _hoTen = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _soGioLam = getEle("gioLam").value;

    //Validation
    var isValid = true;

    if (isAdd) {
        //Validation _taiKhoan
        isValid &= validation.kiemTraRong(_taiKhoan, "tbTKNV", "Vui lòng không để trống") && validation.kiemTraPattern(_taiKhoan, "^[0-9]+$", "tbTKNV", "Vui lòng nhập số") && validation.kiemTraDoDaiKiTu(_taiKhoan, "tbTKNV", "Vui lòng nhập từ 4 - 6 ký số", 4, 6) && validation.kiemTraTaiKhoanTonTai(_taiKhoan, "tbTKNV", "Tài khoản đã tồn tại", dsnv.arr);
    };

    //Validation _hoTen
    isValid &= validation.kiemTraRong(_hoTen, "tbTen", "Vui lòng không để trống") && validation.kiemTraChuoiKiTu(_hoTen, "tbTen", "Tên nhân viên phải là chữ")


    //Validation _email
    isValid &=
        validation.kiemTraRong(_email, "tbEmail", "Vui lòng không để trống")
        && validation.kiemTraPattern(_email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "tbEmail", "Email sai định dạng")


    //Validation _matKhau
    isValid
        &= validation.kiemTraRong(_matKhau, "tbMatKhau", "Vui lòng không để trống")
        && validation.kiemTraDoDaiKiTu(_matKhau, "tbMatKhau", "Vui lòng nhập từ 6 - 10 ký tự", 6, 10)
        && validation.kiemTraPattern(_matKhau, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "tbMatKhau", "Mật khẩu cần chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")

    //Validation _ngayLam
    isValid &= validation.kiemTraRong(_ngayLam, "tbNgay", "Vui lòng không để trống") && validation.kiemTraPattern(_ngayLam, /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/, "tbNgay", "Vui lòng định dạng mm/dd/yyyy")
    //Validation _luongCoBan
    isValid &= validation.kiemTraRong(_luongCoBan, "tbLuongCB", "Vui lòng không để trống") && validation.kiemTraGioiHan(_luongCoBan, "tbLuongCB", "Mức lương cơ bản phải từ 1,000,000 đến 20,000,000", 1000000, 20000000);
    //Validation _chucVu 
    validation.kiemTraChucVu("chucvu", "tbChucVu", "Vui lòng chọn chức vụ");
    //Validation _soGioLam
    isValid &= validation.kiemTraRong(_soGioLam, "tbGiolam", "Vui lòng không để trống") && validation.kiemTraPattern(_soGioLam, /^[0-9]+$/, "tbGiolam", "Vui lòng nhập số") && validation.kiemTraGioiHan(_soGioLam, "tbGiolam", "Số giờ làm trong tháng 80 - 200 giờ", 80, 200);

    if (!isValid) return null;

    // Tạo đối tượng nv từ lớp đối tượng NhanVien
    var nv = new NhanVien(_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _soGioLam);

    //Tính tổng lương nv
    nv.tinhTongLuong();

    //Xếp loại nv
    nv.xepLoai();

    return nv;
};

// Tạo hàm lấy thông tin ra ngoài bảng
function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loai}</td>
            <td>
            <button class="btn btn-info" onclick="editNV ('${nv.taiKhoan}')" data-toggle="modal" 
            data-target="#myModal" >Chỉnh sửa</button>
            <button class="btn btnb-danger" onclick= "deleteNV ('${nv.taiKhoan}')">Xoá</button>
            </td>
        </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content
};

//Xoá nhân viên
function deleteNV(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}

//Sửa thông tin nhân viên
function editNV(taiKhoan) {
    var nv = dsnv.layThongTinNV1(taiKhoan);
    if (nv) {
        // Dom tới các thẻ input để show giá trị
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.soGioLam;
    };
};

//Cập nhật thông tin nhân viên
getEle("btnCapNhat").addEventListener("click", function (event) {
    event.preventDefault();
    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});

//Reset thông tin trên form
getEle("btnThem").addEventListener("click", function () {
    //Clear value form
    getEle("formNV").reset();
    //disabled #tknv
    getEle("tknv").disabled = false;
})

//Thêm nhân viên
getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();
    //Gọi hàm layThongTinNV để tạo đối tượng nv, đặt biến nv gán cho giá trị trả về từ hàm
    var nv = layThongTinNV(true);
    console.log(nv);

    //Thêm nv vào dsnv
    dsnv.themNV(nv);

    // Render data ra bảng
    renderTable(dsnv.arr);

    setLocalStorage();
});

//Tìm kiếm nhân viên
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
});

//Hàm lưu data dưới local
function setLocalStorage() {
    //Convert mảng dsnv.arr từ JSON sang String
    var dataString = JSON.stringify(dsnv.arr);

    //Set localStorage
    localStorage.setItem("DSNV", dataString);
};

//Hàm lấy thông tin dưới local
function getLocalStorage() {
    //Check if DSNV có tồn tại
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");

        // Chuyển từ String sang JSON và phục hồi data trong chính mảng arr của đối tượng dsnv
        dsnv.arr = JSON.parse(dataString);

        //Render ra bảng
        renderTable(dsnv.arr);
    }

}