function ProductsService() {
    this.getProductList = function () {
        var promise = axios({
            method: 'get',
            url: 'https://62f67916612c13062b4f3afa.mockapi.io/Products',
        });
        return promise;
    }
    this.addProduct = function (sp) {
        console.log("add service", sp);
        return axios({
            method: 'post',
            url: 'https://62f67916612c13062b4f3afa.mockapi.io/Products',
            data: sp 
        });
    }

    this.getProduct = function(id){
        return axios ({
            method: 'get',
            url: `https://62f67916612c13062b4f3afa.mockapi.io/Products/${id}`
        });
    }
    this.updateProduct = function(sp,id){
        return axios ({
            method: 'put',
            url: `https://62f67916612c13062b4f3afa.mockapi.io/Products/${id}`,
            data:sp
        });
    }
    this.deleteProduct = function(id){
        return axios ({
            method: 'delete',
            url: `https://62f67916612c13062b4f3afa.mockapi.io/Products/${id}`
        });
    }
}