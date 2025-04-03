const routes = {
    home: "<h2>Welcome to Home</h2><p>This is the home page.</p>",
    about: "<h2>About Us</h2><p>Learn more about us here.</p>",
    contact: "<h2>Contact</h2><p>Get in touch with us.</p>"
};

function loadContent() {
    const hash=window.location.hash.substring(1) || "home";
    console.log(hash);
    document.getElementById("content").innerHTML = routes[hash] || "<h2>404 Not Found</h2>";
}

window.addEventListener("hashchange", loadContent);


window.addEventListener("load", loadContent);  //To load the content when the page is first loaded