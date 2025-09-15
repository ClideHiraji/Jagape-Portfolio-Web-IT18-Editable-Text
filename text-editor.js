document.querySelectorAll(".editable-text").forEach(el => {
    const savedText = localStorage.getItem(el.id);
    if (savedText) {
      el.innerHTML = savedText;
    }
  });

  // Handle edit buttons
  document.querySelectorAll(".edit-btn").forEach(btn => {
    const targetId = btn.getAttribute("data-target");
    const targetEl = document.getElementById(targetId);

    btn.addEventListener("click", () => {
      if (targetEl.isContentEditable) {
        targetEl.contentEditable = "false";
        localStorage.setItem(targetId, targetEl.innerHTML.trim());
        btn.classList.remove("saving");
      } else {
        targetEl.contentEditable = "true";
        targetEl.focus();
        btn.classList.add("saving");
      }
    });
  });
   
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Themes defined as CSS variables
const themes = {
  dark: {
    "--bg": "#000",
    "--text": "#e8e8e8",
    "--muted": "#b4b4b4",
    "--gold": "#cda349",
    "--border": "#fff",   // light border for dark background

    "--nav-text": "#eaeaea",
    "--nav-hover-bg": "rgba(205, 163, 73, 0.18)",
    "--nav-hover-shadow": "rgba(205, 163, 73, 0.25)",
    "--header-bg": "rgba(255,255,255,.04)",
    "--header-border": "rgba(255,255,255,.08)"
  },
  light: {
    "--bg": "#ffffff",
    "--text": "#222222",
    "--muted": "#555555",
    "--gold": "#c08a2d",
    "--border": "#000",   // dark border for light background

    "--nav-text": "#222",
    "--nav-hover-bg": "rgba(192,138,45,0.15)",
    "--nav-hover-shadow": "rgba(192,138,45,0.25)",
    "--header-bg": "rgba(0,0,0,.04)",
    "--header-border": "rgba(0,0,0,.08)"
  }
};

  // Load saved theme
  let currentTheme = localStorage.getItem("theme") || "dark";
  applyTheme(currentTheme);

  toggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
  });

  function applyTheme(theme) {
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }