var spService = new ProductsService();
function getProductList() {
  spService
    .getProductList()
    .then(function (result) {
      console.log(result);
      console.log(result.data);
      hieuThiSanPham(result.data);
    })
    .catch(function (error) {
      //   console.log(error);
    });
}
getProductList();

function hieuThiSanPham(mangSP) {
  var content = "";
  mangSP.map(function (newProducts, index) {
    var i = 0;
    content += `
            <div class="card" style="width: 18rem;">
                <img src=${newProducts.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${newProducts.name}</h5>
                    <p class="card-text">${newProducts.price}</p>
                    <button id="btnThemVaoGioHang" class="btn btn-success">Thêm vào giỏ hàng</button>
                </div>
            </div>
          
        `;
        i++;
    // console.log(newProducts);
  });

  document.getElementById("Products").innerHTML = content;
}

// Hàm filter theo sản phẩm
function timKiemSP() {
  spService.getProductList().then(function (result) {
      // hieuThiSanPham(result.data);
      // var timKiem = document.getElementById("selectType").value;
      // if (timKiem != 0) {
      //   // var mangSP = result.data;
      //   var mangTK = result.data.filter((Products) => {
      //     return Products.type == timKiem;
      //   });
      //   hieuThiSanPham(mangTK);
      // }
    })
    .catch(function (error) {

    });
}

//Hàm thêm sản phẩm vào giỏ hàng

var cart= [];





