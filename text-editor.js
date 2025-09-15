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