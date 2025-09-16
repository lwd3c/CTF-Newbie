const btn = document.getElementById("accept");

//DEV NOTE: chỉ hoạt động trên iphone thôi
btn.addEventListener("click", async () => {
  try {
    const res = await fetch(`/getflag?w=${screen.width}&h=${screen.height}&dpr=${window.devicePixelRatio}`);
    const data = await res.json();
    console.log("UA:", navigator.userAgent);
    console.log("width:", window.innerWidth, "height:", window.innerHeight, "screen:", screen.width, screen.height);
    console.log("dpr:", window.devicePixelRatio);
    showMessage("<code>" + data.flag + "</code>");
  } catch {
    showMessage("❌ Error fetching flag");
  }
});

function showMessage(msg) {
  document.body.innerHTML = `<div class="blocked">${msg}</div>`;
}

// ======== BUTTON DODGE MOUSE (chỉ desktop) =========
if (!/iPhone/.test(navigator.userAgent)) {
  document.addEventListener("mousemove", (e) => {
    const offset = 100;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.x + rect.width / 2);
    const dy = e.clientY - (rect.y + rect.height / 2);
    if (Math.abs(dx) < offset && Math.abs(dy) < offset) {
      btn.style.left = Math.random() * (window.innerWidth - rect.width) + "px";
      btn.style.top = Math.random() * (window.innerHeight - rect.height) + "px";
    }
  });
}

// ======== BLOCK DEVTOOLS =========
function blockDevTools() {
  if (window.outerWidth - window.innerWidth > 200 ||
      window.outerHeight - window.innerHeight > 200) {
    showMessage("🚫 NO CONSOLE ALLOWED");
  }
}
setInterval(blockDevTools, 500);

document.addEventListener("keydown", function(e) {
  // F12 hoặc Ctrl+Shift+I
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")) {
    e.preventDefault();
    showMessage("🚫 NO DEVTOOLS ALLOWED");
  }
});

// ======== BLOCK CTRL+U =========
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    showMessage("🚫 NO VIEW-SOURCE ALLOWED");
  }
});

// ======== BLOCK RIGHT-CLICK =========
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  showMessage("🚫 NO RIGHT-CLICK ALLOWED");
});
