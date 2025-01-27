// view/indexView.js
export function loadIndexView() {
    return `
        <header id="title-bar">
            <div class="head-bar">
                <nav>
                    <a href="index.html">Home</a>
                    <a href="dashboard.html">Dashboard</a>
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
            <!-- Modal content similar to dashboardView.js -->
        </div>
        <div class="container">
            <h1>Welcome to the Home Page</h1>
            <!-- Additional content for the home page -->
        </div>
    `;
}