document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("overlay");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".favorite").forEach(item => {
        item.addEventListener("click", function () {
            const img = this.querySelector("img");

            popupImg.src = img.src;
            popupImg.alt = img.alt;
            popupTitle.innerText = img.getAttribute("title");
            popupDescription.innerText = img.getAttribute("description");

            overlay.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function() {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
});