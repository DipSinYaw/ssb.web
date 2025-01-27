document.addEventListener('DOMContentLoaded', () => {
    const loginModal = `
    <div id="id-login-modal" class="modal">
        <div class="register-form">
            <form class="modal-content animate" name="registerForm">
                <div class="container">
                    <label for="register-username"><b>Username</b></label>
                    <input type="text" id="register-username" placeholder="Enter Username" name="uname" required>

                    <label for="register-password"><b>Password</b></label>
                    <input type="password" id="register-password" placeholder="Enter Password" name="psw" required>

                    <label for="register-confirm"><b>Confirm Password</b></label>
                    <input type="password" id="register-confirm" placeholder="Confirm Password" name="confirm-psw" required>

                    <label for="register-email"><b>Email</b></label>
                    <input type="email" id="register-email" placeholder="Enter Email" name="eml" required>

                    <button type="submit">Create</button>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" onclick="document.getElementById('id-login-modal').style.display='none'" class="cancelbtn">Cancel</button>
                    <span class="message psw">Already registered? <a onclick="displayPage('login', 'block')" href="#">Sign In</a></span>
                </div>
            </form>
        </div>

        <div class="login-form">
            <form class="modal-content animate" name="loginForm">
                <div class="container">
                    <label for="login-email"><b>Email</b></label>
                    <input type="email" id="login-email" placeholder="Enter Email" name="eml" required>

                    <label for="login-password"><b>Password</b></label>
                    <input type="password" id="login-password" placeholder="Enter Password" name="psw" required>

                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" onclick="document.getElementById('id-login-modal').style.display='none'" class="cancelbtn">Cancel</button>
                    <span class="message psw">Not registered? <a onclick="displayPage('register', 'block')" href="#">Create an account</a></span>
                </div>
            </form>
        </div>
    </div>
  `;

    document.body.insertAdjacentHTML('beforeend', loginModal);
});