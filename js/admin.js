var spService = new ProductsService();
var validation = new Validation();

function getProductList() {
    spService.getProductList().then(function (result) {
        hienThiTable(result.data);
    }).catch(function (error) {
        console.log(error);
    });  
}

getProductList();

function hienThiTable(mangSP) {
    var content = "";
    mangSP.map(function (item, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.screen}</td>
        <td>${item.blackCamera}</td>
        <td>${item.frontCamera}</td>
        <td><img src="${item.img}"></img></td>
        <td>${item.desc}</td>
        <td>${item.type}</td>
        <td>
        <button class="btn btn-danger" onclick="xoa('${item.id}')">Xóa</button>
        <button class="btn btn-info" onclick="layChiTiet('${item.id}')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
        </tr>
        `;
    })
    document.querySelector("#listProduct").innerHTML = content;
}
function themSP() {
    var ten = document.querySelector("#TenSP").value;
    var gia = document.querySelector("#GiaSP").value;
    var manHinh = document.querySelector("#ManHinh").value;
    var camSau = document.querySelector("#CamSau").value;
    var camTruoc = document.querySelector("#CamTruoc").value;
    var hinhAnh = document.querySelector("#HinhSP").value;
    var moTa = document.querySelector("#MoTa").value;
    var loaiSP = document.querySelector("#LoaiSP").value;


    var isValid = true;
    isValid &= validation.checkEmpty(ten, "tbTenSP", "Tên sản phẩm không được để trống");
    isValid &= validation.checkEmpty(gia, "tbGiaSP", "Giá không được để trống");
    isValid &= validation.checkEmpty(manHinh, "tbManHinh", "Kích thước màn hình không được để trống");
    isValid &= validation.checkEmpty(camSau, "tbCamSau", "Thông tin camera sau không được để trống");
    isValid &= validation.checkEmpty(camTruoc, "tbCamTruoc", "Thông tin camera trước không được để trống");
    isValid &= validation.checkEmpty(hinhAnh, "tbHinhSP", "Hình sản phẩm không được để trống");
    isValid &= validation.checkEmpty(moTa, "tbMoTa", "Mô tả sản phẩm không được để trống");
    isValid &= validation.checkDropdown("LoaiSP", "tbLoaiSP", "Xin vui lòng chọn loại sản phẩm");

    if (isValid) {
        var sp = new Products(ten, gia, manHinh, camSau, camTruoc, hinhAnh, moTa, loaiSP);
        spService.addProduct(sp)
        .then(function (result) {
            console.log(result.data);
            getProductList();
            document.querySelector("#myModal .close").click();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

 
};

document.querySelector("#btnThemSP").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="themSP();">Thêm</button>
    `
});

function layChiTiet(id) {
    spService.getProduct(id)
        .then(function (result) {
            console.log(result.data);
            document.querySelector("#TenSP").value =result.data.name;
            document.querySelector("#GiaSP").value =result.data.price;
            document.querySelector("#ManHinh").value =result.data.screen;
            document.querySelector("#CamSau").value =result.data.blackCamera;
            document.querySelector("#CamTruoc").value =result.data.frontCamera;
            document.querySelector("#HinhSP").value =result.data.img;
            document.querySelector("#MoTa").value =result.data.desc;
            document.querySelector("#LoaiSP").value =result.data.type;
            document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="capNhat('${result.data.id}');">Cập nhật</button>
            `
        })
        .catch(function (error) {
            console.log(error);
        })    
}

function capNhat(id){
    var ten = document.querySelector("#TenSP").value;
    var gia = document.querySelector("#GiaSP").value;
    var manHinh = document.querySelector("#ManHinh").value;
    var camSau = document.querySelector("#CamSau").value;
    var camTruoc = document.querySelector("#CamTruoc").value;
    var hinhAnh = document.querySelector("#HinhSP").value;
    var moTa = document.querySelector("#MoTa").value;
    var loaiSP = document.querySelector("#LoaiSP").value;

    var sp = new Products(ten, gia, manHinh, camSau, camTruoc, hinhAnh, moTa, loaiSP);
    spService.updateProduct(sp,id)
    .then(function(result){
        console.log(result.data);
        getProductList();
        document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    })
}

function xoa(id){
    spService.deleteProduct(id)
    .then(function(result){
        console.log(result.data);
        getProductList();
    })
    .catch(function(error){
        console.log(error);
    })
}