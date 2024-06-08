document.addEventListener("DOMContentLoaded", function() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartBody = document.getElementById("cart-body");

    cartItems.forEach(function(item) {
        var addtr = document.createElement("tr");
        var trcontent = ' <tr><td style="display:flex; align-items: center; justify-content: center;"><img style="width:70px;" src="'+item.img+'" alt="">'+item.name+'</td><td><span>'+item.price+'</span></td><td><input style="width:30px; outline:none;" type="number" value="'+item.quantity+'" min="0"></td><td style="cursor:pointer;"><span class="dele">xóa</span></td></tr>';
        addtr.innerHTML = trcontent;
        cartBody.append(addtr);
    });

    carttotal();
    xoasp();
    inputchage();
});

function carttotal() {
    var cartItem = document.querySelectorAll("tbody tr");
    var giatien = 0;
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        var produccart = cartItem[i].querySelector("span").innerHTML;
        sanpham = inputValue * produccart;
        giatien = giatien + sanpham;
    }
    var tongtien = document.querySelector(".Price-total span");
    tongtien.innerHTML = giatien;
}

function xoasp() {
    var cartItems = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItems.length; i++) {
        var dele = cartItems[i].querySelector(".dele");
        dele.addEventListener("click", function(event) {
            var cartDele = event.target;
            var cartitemR = cartDele.parentElement.parentElement;
            cartitemR.remove();
            carttotal();

            // Cập nhật lại localStorage sau khi xóa
            var updatedCartItems = [];
            var remainingCartItems = document.querySelectorAll("tbody tr");
            remainingCartItems.forEach(function(remainingItem) {
                var img = remainingItem.querySelector("img").src;
                var name = remainingItem.querySelector("td").innerText;
                var price = remainingItem.querySelector("span").innerText;
                var quantity = remainingItem.querySelector("input").value;
                updatedCartItems.push({ img: img, name: name, price: price, quantity: quantity });
            });
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        });
    }
}

function inputchage() {
    var cartItems = document.querySelectorAll("tbody tr");
    for (var i = 0; i < cartItems.length; i++) {
        var inputvalue = cartItems[i].querySelector("input");
        inputvalue.addEventListener("change", function(event) {
            carttotal();
            
            // Cập nhật lại localStorage sau khi thay đổi số lượng
            var updatedCartItems = [];
            var remainingCartItems = document.querySelectorAll("tbody tr");
            remainingCartItems.forEach(function(remainingItem) {
                var img = remainingItem.querySelector("img").src;
                var name = remainingItem.querySelector("td").innerText;
                var price = remainingItem.querySelector("span").innerText;
                var quantity = remainingItem.querySelector("input").value;
                updatedCartItems.push({ img: img, name: name, price: price, quantity: quantity });
            });
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        });
    }
}