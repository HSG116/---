function updateCountdown() {
  const ramadanDate = new Date("2025-03-01T00:00:00+02:00").getTime();
  const now = new Date().getTime();
  const diff = ramadanDate - now;

  if (diff <= 0) {
    document.getElementById("timer").style.display = "none";
    document.getElementById("message").style.display = "block";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0"
  );
 // تحديث سنة حقوق النشر
document.getElementById("year").innerText = new Date().getFullYear(); document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0"
  );
}

setInterval(updateCountdown, 1000);
updateCountdown();
