

// Declare jsPDF as a global variable
declare var jsPDF: any;

window.addEventListener("DOMContentLoaded", () => {
  const resumeData: ResumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");

  if (resumeData) {
    // Update the resume content dynamically
    (document.getElementById("resumeName") as HTMLElement).innerText = resumeData.name || "Your Name";
    (document.getElementById("resumeTitle") as HTMLElement).innerText = resumeData.title || "Your Job Title";
    (document.getElementById("resumeEmail") as HTMLElement).innerText = resumeData.email || "Your Email";
    (document.getElementById("resumePhone") as HTMLElement).innerText = resumeData.phone || "Your Phone";
    (document.getElementById("resumeLocation") as HTMLElement).innerText = resumeData.location || "Your Location";
    (document.getElementById("resumeEducation") as HTMLElement).innerText = resumeData.education || "Your Education";
    (document.getElementById("resumeExperience") as HTMLElement).innerText = resumeData.experience || "Your Experience";

    // Update skills section
    const skillsList = document.getElementById("resumeSkills") as HTMLElement;
    skillsList.innerHTML = resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('');

    // Update links section
    const linksContainer = document.getElementById("resumeLinks") as HTMLElement;
    linksContainer.innerHTML = resumeData.links.map((link: string) => `<a href="${link}" target="_blank">${link}</a>`).join('');

    // Update the image if present
    const imageElement = document.getElementById("resumeImage") as HTMLImageElement;
    if (resumeData.image) {
      imageElement.src = resumeData.image;
    }
  }

  // Edit resume functionality
  const editBtn = document.getElementById("editResumeBtn") as HTMLButtonElement;
  const editModal = document.getElementById("editModal") as HTMLElement;
  const closeBtn = document.querySelector(".close") as HTMLElement;
  const saveBtn = document.getElementById("saveResumeBtn") as HTMLButtonElement;

  // Populate modal fields with current data
  editBtn.onclick = () => {
    const resumeData: ResumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    (document.getElementById("editName") as HTMLInputElement).value = resumeData.name || "";
    (document.getElementById("editTitle") as HTMLInputElement).value = resumeData.title || "";
    (document.getElementById("editEmail") as HTMLInputElement).value = resumeData.email || "";
    (document.getElementById("editPhone") as HTMLInputElement).value = resumeData.phone || "";
    (document.getElementById("editLocation") as HTMLInputElement).value = resumeData.location || "";
    (document.getElementById("editEducation") as HTMLTextAreaElement).value = resumeData.education || "";
    (document.getElementById("editExperience") as HTMLTextAreaElement).value = resumeData.experience || "";
    (document.getElementById("editSkills") as HTMLInputElement).value = (resumeData.skills || []).join(", ");
    (document.getElementById("editLinks") as HTMLInputElement).value = (resumeData.links || []).join(", ");
    
    editModal.style.display = "flex";
  };

  closeBtn.onclick = () => {
    editModal.style.display = "none";
  };

  saveBtn.onclick = () => {
    const resumeData: ResumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    resumeData.name = (document.getElementById("editName") as HTMLInputElement).value;
    resumeData.title = (document.getElementById("editTitle") as HTMLInputElement).value;
    resumeData.email = (document.getElementById("editEmail") as HTMLInputElement).value;
    resumeData.phone = (document.getElementById("editPhone") as HTMLInputElement).value;
    resumeData.location = (document.getElementById("editLocation") as HTMLInputElement).value;
    resumeData.education = (document.getElementById("editEducation") as HTMLTextAreaElement).value;
    resumeData.experience = (document.getElementById("editExperience") as HTMLTextAreaElement).value;
    resumeData.skills = (document.getElementById("editSkills") as HTMLInputElement).value.split(",").map(skill => skill.trim());
    resumeData.links = (document.getElementById("editLinks") as HTMLInputElement).value.split(",").map(link => link.trim());

    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    updateResumeDisplay();
    editModal.style.display = "none";
  };

  function updateResumeDisplay() {
    const resumeData: ResumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");

    (document.getElementById("resumeName") as HTMLElement).innerText = resumeData.name || "Your Name";
    (document.getElementById("resumeTitle") as HTMLElement).innerText = resumeData.title || "Your Job Title";
    (document.getElementById("resumeEmail") as HTMLElement).innerText = resumeData.email || "Your Email";
    (document.getElementById("resumePhone") as HTMLElement).innerText = resumeData.phone || "Your Phone";
    (document.getElementById("resumeLocation") as HTMLElement).innerText = resumeData.location || "Your Location";
    (document.getElementById("resumeEducation") as HTMLElement).innerText = resumeData.education || "Your Education";
    (document.getElementById("resumeExperience") as HTMLElement).innerText = resumeData.experience || "Your Experience";
    const skillsList = document.getElementById("resumeSkills") as HTMLElement;
    skillsList.innerHTML = resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('');
    const linksContainer = document.getElementById("resumeLinks") as HTMLElement;
    linksContainer.innerHTML = resumeData.links.map((link: string) => `<a href="${link}" target="_blank">${link}</a>`).join('');
    const imageElement = document.getElementById("resumeImage") as HTMLImageElement;
    if (resumeData.image) {
      imageElement.src = resumeData.image;
    }
  }

  // Close modal if clicked outside
  window.onclick = (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    }
  };

  // Download resume functionality
  // Download resume functionality
document.getElementById("downloadResumeBtn")?.addEventListener("click", () => {
  const resumeData: ResumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");

  if (!resumeData) return; // If there's no data in localStorage, stop

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set font for the PDF
  doc.setFont("helvetica", "normal");

  // Add the resume content to the PDF
  doc.text(`Name: ${resumeData.name}`, 10, 10);
  doc.text(`Title: ${resumeData.title}`, 10, 20);
  doc.text(`Email: ${resumeData.email}`, 10, 30);
  doc.text(`Phone: ${resumeData.phone}`, 10, 40);
  doc.text(`Location: ${resumeData.location}`, 10, 50);
  doc.text(`Education: ${resumeData.education}`, 10, 60);
  doc.text(`Experience: ${resumeData.experience}`, 10, 70);

  // Adding skills to the PDF
  const skillsText = resumeData.skills.join(", ");
  doc.text(`Skills: ${skillsText}`, 10, 80);

  // Add Links to the PDF
  const linksText = resumeData.links.join(", ");
  doc.text(`Links: ${linksText}`, 10, 90);

  // If image exists, embed it into the PDF (optional)
  if (resumeData.image) {
    const imageData = resumeData.image;
    doc.addImage(imageData, "JPEG", 10, 100, 30, 30);  // Adds image at specified coordinates and size
  }

  // Save the PDF as a file
  doc.save(`${resumeData.name}_resume.pdf`);
});
});
