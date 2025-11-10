document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu button");
  const sections = document.querySelectorAll(".section");
  const clubs = document.querySelectorAll(".club");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const cards = document.querySelectorAll(".club-card");

  let carouselIndex = 0;
  let carouselInterval = null;

  function moveCarousel() {
    const cardWidth = cards[0]?.offsetWidth || 0;
    track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
  }

  function startCarousel() {
    if (!track || !cards.length) return;
    stopCarousel();
    carouselInterval = setInterval(() => {
      carouselIndex = (carouselIndex + 1) % cards.length;
      moveCarousel();
    }, 5000);
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  function showSection(id) {
    sections.forEach(section => {
      section.classList.toggle("active", section.id === id);
    });

    buttons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.page === id)
    );

    window.scrollTo({ top: 0, behavior: "smooth" });

    // enable carousel only on home
    if (id === "home") startCarousel();
    else stopCarousel();
  }

  // navigation buttons
  buttons.forEach(btn =>
    btn.addEventListener("click", () => showSection(btn.dataset.page))
  );

  // club tiles
  clubs.forEach(club =>
    club.addEventListener("click", () => showSection(club.dataset.page))
  );

  // search
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      const found = Array.from(sections).find(sec =>
        sec.id.toLowerCase().includes(query)
      );
      if (found) showSection(found.id);
      searchInput.value = "";
    });
  }

  // back buttons
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("back-btn")) {
      e.preventDefault();
      showSection("clubs");
    }
  });

  // carousel controls (only respond on home)
  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (!document.getElementById("home").classList.contains("active")) return;
      carouselIndex = (carouselIndex - 1 + cards.length) % cards.length;
      moveCarousel();
    });

    nextBtn.addEventListener("click", () => {
      if (!document.getElementById("home").classList.contains("active")) return;
      carouselIndex = (carouselIndex + 1) % cards.length;
      moveCarousel();
    });

    window.addEventListener("resize", moveCarousel);
  }

  // FAQ toggle
  document.querySelectorAll(".question").forEach(q => {
    q.addEventListener("click", () => {
      q.classList.toggle("active");
      q.nextElementSibling.classList.toggle("open");
    });
  });

  // initial view
  showSection("home");
});
