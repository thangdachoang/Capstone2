function Validation() {
  // kiểm tra để trống
  this.checkEmpty = function (inputValue, spanID, message) {
    if (inputValue.trim() == "") {
      document.getElementById(spanID).innerHTML = message;
      return false;
    } else {
      document.getElementById(spanID).innerHTML = "";
      return true;
    }
  };

  //  Kiểm tra loại sản phẩm
  this.checkDropdown = function (selID, spanID, message) {
    var optionIndex = document.getElementById(selID).selectedIndex;
    console.log(optionIndex);
    if (optionIndex != 0) {
      // hợp lệ
      document.getElementById(spanID).innerHTML = "";
      return true;
    } else {
      // không hợp lệ
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };

}