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
            method: 'POST',
            url: 'https://62f67916612c13062b4f3afa.mockapi.io/Products',
            data: sp 
        });
    }

    
}