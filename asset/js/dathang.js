const btn= document.getElementsByClassName("themvaogiohang");

// console.log(btn)
const btnArray = Array.from(btn);

btnArray.forEach(function(button,index){
    // console.log(button,index)
    button.addEventListener("click",function(event){
       var btnItem = event.target
        var product = btnItem.parentElement
        // lấy hình ảnh, tên sản phẩm , giá tiền  từ trong phần tử bằng class
        var producImg = product.querySelector(".product-card__thumb").src
        var producname = product.querySelector(".product-card__title").innerText
        var produccart = product.querySelector(".product-card__price").innerText
        // console.log(produccart,producname ,producImg)
        addcart(produccart,producname ,producImg)
    })

});
function addcart(produccart, producname, producImg) {
    var cartItem = document.querySelectorAll("tbody tr");
    var cartItems = [];
    
    // Kiểm tra xem giỏ hàng đã có dữ liệu trong localStorage chưa
    if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }

    var item = {
        img: producImg,
        name: producname,
        price: produccart,
        quantity: 1
    };

    // Thêm sản phẩm vào giỏ hàng
    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Hiển thị sản phẩm trong bảng giỏ hàng
    var addtr = document.createElement("tr");
    var trcontent = ' <tr><td style="display:flex; align-items: center; justify-content: center;"><img style="width:70px;" src="'+producImg+'" alt="">'+producname+'</td><td><span>'+produccart+'</span></td><td><input style="width:30px; outline:none;" type="number" value="1" min="0"></td><td style="cursor:pointer;"><span class="dele">xóa</span></td></tr>';
    addtr.innerHTML = trcontent;
    var carttable = document.querySelector("tbody");
    carttable.append(addtr);
    carttotal();
    xoasp();
}
// 
// -------------------tính -----------------------------
function  carttotal(){
    var cartItem = document.querySelectorAll("tbody tr ")
    var giatien = 0
    // console.log(cartItem)
    for( var i=0;i<cartItem.length; i++){
        // console.log(i)
        var inputValue = cartItem[i].querySelector("input").value
        // console.log(inputValue)
        var produccart = cartItem[i].querySelector("span").innerHTML
        // console.log(produccart)
        sanpham = inputValue*produccart
        // console.log(sanpham)
        giatien = giatien+sanpham
        // console.log(giatien)
        inputchage()
    }
    var tongtien = document.querySelector(".Price-total span")
    tongtien.innerHTML = giatien
    // console.log(tongtien)

}
// --------------------xoa san pham---------------
function xoasp() {
    var cartItems = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItems.length; i++) {
        var dele = cartItems[i].querySelector(".dele");
        dele.addEventListener("click", function(event) {
            var cartDele = event.target;
            var cartitemR = cartDele.parentElement.parentElement;  // Điều chỉnh để đạt được hàng
            cartitemR.remove(); // Giả sử bạn muốn xóa hàng
            // console.log(cartitemR);
            carttotal()
            

        });
    }
}
function inputchage() {
    var cartItems = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItems.length; i++) {
        var inputvalue = cartItems[i].querySelector("input");
        inputvalue.addEventListener("change", function(event) {
            carttotal(); // Gọi hàm total khi có sự thay đổi giá trị trong input
        });
    }
}