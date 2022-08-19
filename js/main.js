var spService = new ProductsService();

function hieuThiSanPham(mangSP){
    var content = "";
    mangSP.map(function(newProducts, index){
        content += `
            <div>
            <h2>SP</h2>
            <div><img src="${newProducts.img}"></img></div>
            </div>
        `;
    });
    console.log(content);
    document.getElementById("products").innerHTML = content;
}

function getProductList() {
    spService.getProductList().then(function (result) {
        console.log(result);
        console.log(result.data);
        hieuThiSanPham(result.data);
    }).catch(function (error) {
        console.log(error);
    });  
}

getProductList();



