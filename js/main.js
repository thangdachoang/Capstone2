// Modal giỏ hàng


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
    
    content += `
            <div class="card" style="width: 18rem;">
                <img src=${newProducts.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${newProducts.name}</h5>
                    <p class="card-text">${newProducts.price}</p>
                    <button  onclick="themSPGioHang('${newProducts.id}')" class="btn btn-success">Thêm vào giỏ hàng</button>
                </div>
            </div>
          
        `;
        
    // console.log(newProducts);
  });

  document.getElementById("products").innerHTML = content;
}

// Hàm filter theo sản phẩm
function timKiemSP() {
  spService.getProductList().then(function (result) {
      hieuThiSanPham(result.data);
      var timKiem = document.getElementById("selectType").value;
      if (timKiem != 0) {
        // var mangSP = result.data;
        var mangTK = result.data.filter((Products) => {
          return Products.type == timKiem;
        });
        hieuThiSanPham(mangTK);
      }
    })
    .catch(function (error) {

    });
}

//Hàm thêm sản phẩm vào giỏ hàng

var cart= [];


function themSPGioHang (id){
  spService.getProduct(id).then(function(result){
    var spGioHang = result.data;
    var cartItem ={product : {spGioHang} ,quality : 1};
    checkGioHang(cartItem);
    showGioHang(cart);
  })
  .catch(function(error){
  });
}

function checkGioHang(cartItem){
  if(cart ==""){
    cart.push(cartItem);
  }else{
    var flag = true;
    cart.map(function(Item, index){
      if(cartItem.product.spGioHang.id == Item.product.spGioHang.id){
        Item.quality++;
        flag = false
      }
    });
    if(flag){
      cart.push(cartItem);
    }
  }
}

function showGioHang(mangSP){
  var content = "";
  mangSP.map(function(Products, index){
    content += `
      <tr>
      <td>${Products.product.spGioHang.name}</td>
      <td>${Products.product.spGioHang.price}</td>
      <td>${Products.quality}</td>
      <td>
      <button class="btn btn-warning">Remove</button>
      </td>
      </tr>
    `
  })

  document.getElementById("tbodySP").innerHTML=content;
}

