const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const password = document.getElementById("password");

// lăngs nghe sự kiện form đăng nhập tk
formLogin.addEventListener("submit",function(e){
    // ngăn chặn sự kiện load lại trang 
    e.preventDefault();

    // validate dữ liệu đầu vào



    // lấy dữ liệu từ local
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // lấy email và mk mà người dùng đã đăng kí có tồn tại trên local hay không
    const findUser = userLocal.find(
        user => 
            user.useremail === emailElement.value &&
         user.userpassword === password.value
        );
        console.log("findUser");
        if(!findUser){
            // nếu k báo cho người dùng biết nhâp lại dữ liệu
            alert("email hoặc mật khẩu sai ");
        }else{
            // nếu có đăng nhập thành công 
            window.location.href ="index-login.html";
        } 

} );
