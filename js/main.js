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

var cart = [];

function setlocalStorage() {
  localStorage.setItem("CART", JSON.stringify(cart));
}
function getLocalStorage() {
  if (localStorage.getItem("CART") != null) {
      cart = JSON.parse(localStorage.getItem("CART"));
      showGioHang(cart);
  }
}
getLocalStorage();

function themSPGioHang(id) {
  spService.getProduct(id)
    .then(function (result) {
      var spGioHang = result.data;
      var cartItem = { product: { spGioHang }, quality: 1 };
      checkGioHang(cartItem);
      showGioHang(cart);
      setlocalStorage();
    })
    .catch(function (error) {
    });
}

function checkGioHang(cartItem) {
  if (cart == "") {
    cart.push(cartItem);
  } else {
    var flag = true;
    cart.map(function (Item, index) {
      if (cartItem.product.spGioHang.id == Item.product.spGioHang.id) {
        Item.quality++;
        flag = false
      }
    });
    if (flag) {
      cart.push(cartItem);
    }
  }
}

function showGioHang(mangSP) {
  var content = "";
  mangSP.map(function (Products, index) {
    content += `
      <tr>
      <td>${Products.product.spGioHang.name}</td>
      <td id="price">${Products.product.spGioHang.price}</td>
      <td>
      <button class="btn btn-warning" onclick="changeQuanlity('minus', ${Products.product.spGioHang.id})">-</button>
      ${Products.quality}
      <button class="btn btn-warning" onclick="changeQuanlity('plus', ${Products.product.spGioHang.id})">+</button>
      </td>
      <td>
      <button class="btn btn-warning" onclick="removeCart('${Products.product.spGioHang.id}')">Remove</button>
      </td>
      </tr>
    `
  })
  document.getElementById("tbodySP").innerHTML = content;
  totalBill();
}

function changeQuanlity(action, id) {
  cart.map((Products, index) => {
    if (Products.product.spGioHang.id == id) {
      let quanlity = Products.quality;
      if (action === "minus" && quanlity > 1) {
        quanlity--;
      } else if (action === "plus") {
        quanlity++;
      }
      // console.log(cart[index]);
      cart[index] = { ...Products, quality: quanlity }
    }
    showGioHang(cart);
    setlocalStorage();
  })
}

function totalBill() {
  let totalBill = 0;
  cart.forEach((Products) => {
    totalBill += Products.product.spGioHang.price * Products.quality;
  });
  document.getElementById("totalBill").innerHTML = `$${totalBill}`;
}

function removeCart(id){
  cart = cart.filter((Products) => Products.product.spGioHang.id !== id);
  showGioHang(cart);
  setlocalStorage();
}

function clearCart(){
  cart = [];
  showGioHang(cart);
  setlocalStorage();
}
document.getElementById("thanhToan").onclick = clearCart;