// console.log("heloo");
// lấy ra element
const formRegister = document.getElementById("formRegister");
const emailElement = document.getElementById("email");
const password = document.getElementById("password");
const resetpassword = document.getElementById("resetpassword");
// element liên quan đến lỗi 
const emailerror = document.getElementById("emailerror");
const passworderror = document.getElementById("passworderror");
const resetpassworderror = document.getElementById("Repassworderror");
// lấy dữ liệu trên local
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
/**
 * validate đỉa chỉ email
 * @param{*} email: chuỗi email người dùng nhập vào
 * @returns: dữ liệu nếu email đúng định dang thì ùnifined 

 */
function  validateEmail  (email)  {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


// lắng nghe sự kiện bằng addEventListener forrm đăng kí tài khaonr 
formRegister.addEventListener("submit", function(e){
// ngăn chặn sự kiện load lại trang
  e.preventDefault();
//   validate dữ liệu đầu vào
  if(!emailElement.value){
//    hiển thị lỗi 
      emailerror.style.display="block";
  }else{
    // ẩn nỗi 
    emailerror.style.display="none";
       // kiểm tra định dạng email
       if(!validateEmail(emailElement.value) ){
        //    hiển thị lỗi 
      emailerror.style.display="block";
      emailerror.innerHTML ="email không đúng định dạng";
    }
  }
  //   validate dữ liệu đầu vào
  if(!password.value){
    //    hiển thị lỗi 
          passworderror.style.display="block";
      }else{
        // ẩn nỗi 
        passworderror.style.display="none";
      }

      //   validate dữ liệu đầu vào
  if(!resetpassword.value){
    //    hiển thị lỗi 
          resetpassworderror.style.display="block";
      }else{
        // ẩn nỗi 
        resetpassworderror.style.display="none";
      }
    
    //   kiểm tra mât khẩu 
    if(password.value !== resetpassword.value ){
        resetpassworderror.style.display="block";
        resetpassworderror.innerHTML ="mật khẩu không khớp";
    }else{
        resetpassworderror.style.display="none";
    }
    // gửi dữ liệu từ form lên localstrage
    if(emailElement.value &&
         password.value &&
          resetpassword.value &&
           password.value === resetpassword.value&&
           validateEmail(emailElement.value)

         ){
        //   console.log("submit")  
        // lấy dữ liệu từ form và gộp thành đối tượng user
        const  user ={
            useId: Math.ceil(Math.random() * 1000000000),
            useremail: emailElement.value,
            userpassword: password.value
        };
        // console.log(user);
        // push trữ dữ liệu trên l0cal
        userLocal.push(user);

        // lưu trữ dữ liệu lên local 
        localStorage.setItem("users",JSON.stringify(userLocal) );
        // chuyển hướng về trang đăng nhập sau 1s
        setTimeout(function(){
            window.location.href ="sign-in.html";
        }, 1000)
       

    }

});
 