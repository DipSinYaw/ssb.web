// view/dashboardView.js
export function loadDashboardView() {
    return `
        <header id="title-bar">
            <div class="head-bar">
                <nav>
                    <a href="index.html">Home</a>
                    <a href="#">Dashboard</a>
                    <div class="avatar">
                        <a class="login" onclick="displayPage('login','block')" href="#login">Login</a>
                        <a class="avatar-img" onclick="displayPage('logout','block')">
                            <img id="avatar-img" src="" alt="Avatar">
                        </a>
                    </div>
                </nav>
            </div>
        </header>
        <div id="modal-container">
            <div class="modal" id="login-modal">
                <form class="modal-content" name="loginForm">
                    <div class="container">
                        <label>Email</label>
                        <input type="text" placeholder="Enter Email" id="login-email" required>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" id="login-password" required>
                        <button type="submit">Login</button>
                        <button type="button" onclick="closeLoginPop()" class="cancelbtn">Cancel</button>
                        <span class="message">Not registered? <a onclick="displayPage('create','block')" href="#">Create an account</a></span>
                    </div>
                </form>
            </div>
            <div class="modal" id="register-modal">
                <form class="modal-content" name="registerForm">
                    <div class="container">
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" id="register-username" required>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" id="register-password" required>
                        <input type="password" placeholder="Confirm Password" id="register-confirm" required>
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" id="register-email" required>
                        <button type="submit">Create</button>
                        <button type="button" onclick="closeLoginPop()" class="cancelbtn">Cancel</button>
                        <span class="message">Already registered? <a onclick="displayPage('login','block')" href="#">Sign In</a></span>
                    </div>
                </form>
            </div>
            <div class="modal" id="logout-modal">
                <form class="modal-content" name="logoutForm">
                    <div class="container">
                        <h4>Logout</h4>
                        <button type="submit">Logout</button>
                        <button type="button" onclick="closeLoginPop()" class="cancelbtn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="container">
            <div class="dashboard">
                <h1 class="page-title">Dashboard</h1>
                <div class="underline"></div>
                <section>
                    <h2>Update Password</h2>
                    <form id="update-password-form" name="updatePasswordForm">
                        <input type="password" placeholder="Old Password" id="old-password" required>
                        <input type="password" placeholder="New Password" id="new-password" required>
                        <input type="password" placeholder="Confirm New Password" id="confirm-new-password" required>
                        <button type="button" onclick="updatePassword()">Update Password</button>
                    </form>
                </section>
                <div class="underline"></div>
                <section>
                    <h2>Add Photo</h2>
                    <form id="add-product-form" name="addProductForm">
                        <label>Name</label>
                        <input type="text" id="product-name" placeholder="Name" required>
                        <label>Specification</label>
                        <input type="text" id="product-spec" placeholder="Specification">
                        <label>Price</label>
                        <input type="number" id="product-price" placeholder="Price">
                        <label>Category</label>
                        <input type="text" id="product-category" placeholder="Category">
                        <label>Image</label>
                        <input type="text" id="product-image" placeholder="Image link" required>
                        <button type="button" onclick="addProduct()">Add Photo</button>
                    </form>
                </section>
                <div class="underline"></div>
            </div>
        </div>
    `;
}