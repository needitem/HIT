document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginBtn");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const errorMessageDiv = document.getElementById("errorMessage");

  loginButton.addEventListener("click", async () => {
    errorMessageDiv.textContent = "";

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = axios
        .post(
          "https://180c-34-124-245-115.ngrok-free.app/instagram",
          {
            userid: username,
            passwd: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // Promise handling with .then()

          if (response.status === 200) {
            if (response.data.success) {

              console.log("dd", response.data);
              const messageData = {
                success: response.data.success,
                username: response.data.name,
                // 필요한 다른 정보 추가
              };

              // 메시지 전송 (문자열로 변환하여 전송)
              window.opener.postMessage(JSON.stringify(messageData), '*'); // '*'는 모든 출처 허용 (개발 환경)

              setTimeout(() => {
                window.close();
              }, 500);
            } else {
              errorMessageDiv.textContent =
                response.data.message || "Login failed";
            }
          } else {
            errorMessageDiv.textContent = "An error occurred during login";
          }
        });
    } catch (error) {
      console.error("Login error:", error);
      errorMessageDiv.textContent = "Unable to connect to the server";
    }
  });

});
