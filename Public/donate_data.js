document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('school-container');
  const modal = document.getElementById('donate-modal');
  const closeModal = document.getElementById('close-modal');
  const modalSchoolName = document.getElementById('modal-school-name');
  const modalImage = document.getElementById('modal-image');

  // Example placeholder image, replace with your actual image path
  const placeholderImage = "./gpay.jpeg";

  // Iterate through the schools array and create HTML for each school
  schools.forEach(school => {
    const schoolDiv = document.createElement('div');
    schoolDiv.classList.add('school');
    
    schoolDiv.innerHTML = `
      <h2>${school.name}</h2>
      <p><strong>Address:</strong> ${school.address}</p>
      <p><strong>Number of Students:</strong> ${school.numberOfStudents}</p>
      <p><strong>Resources Lacking:</strong> ${school.resourcesLack.join(', ')}</p>
      <button class="donate-btn" data-school="${school.name}">Donate</button>
    `;
    
    container.appendChild(schoolDiv);
  });

  // Open the modal when a donate button is clicked
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('donate-btn')) {
      const schoolName = e.target.getAttribute('data-school');
      modalSchoolName.textContent = `Donating to: ${schoolName}`;
      modalImage.src = placeholderImage; // You can replace this with the real image
      modal.style.display = "block";
    }
  });

  // Close the modal when the close button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside of the modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
