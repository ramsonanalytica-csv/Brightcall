
const openCallButton = document.querySelector("#open-call");
const demoPanel = document.querySelector("#demo");
const status = document.querySelector("#demo-status");

openCallButton.addEventListener("click", () => {
  demoPanel.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  status.textContent =
    "Use the voice widget in the phone display to start your call.";
});


const complaintForm = document.querySelector("#complaint-form");
const complaintStatus = document.querySelector("#complaint-status");
const complaintSubmit = complaintForm.querySelector('button[type="submit"]');

const complaintWebhookUrl =
  "https://ramson7011.app.n8n.cloud/webhook/brightcall-complaint";

complaintForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  complaintStatus.textContent = "Submitting your complaint...";
  complaintSubmit.disabled = true;

  try {
    const formData = new FormData(complaintForm);
    const params = new URLSearchParams(formData);

    const response = await fetch(complaintWebhookUrl, {
      method: "POST",
      body: params
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error("Complaint submission failed.");
    }

    complaintStatus.textContent =
      "Your complaint has been received successfully.";

    complaintForm.reset();

  } catch (error) {
    console.error("Complaint submission error:", error);

    complaintStatus.textContent =
      "We couldn't submit your complaint. Please try again.";

  } finally {
    complaintSubmit.disabled = false;
  }
});


const appointmentForm = document.querySelector("#appointment-form");
const appointmentStatus = document.querySelector("#appointment-status");
const appointmentSubmit = appointmentForm.querySelector('button[type="submit"]');

const appointmentWebhookUrl =
  "https://ramson7011.app.n8n.cloud/webhook/brightcall-appointment";

appointmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  appointmentStatus.textContent = "Submitting your appointment request...";
  appointmentSubmit.disabled = true;

  try {
    const formData = new FormData(appointmentForm);
    const params = new URLSearchParams(formData);

    const response = await fetch(appointmentWebhookUrl, {
      method: "POST",
      body: params
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error("Appointment submission failed.");
    }

    appointmentStatus.textContent =
      "Your appointment request has been received successfully.";

    appointmentForm.reset();

  } catch (error) {
    console.error("Appointment submission error:", error);

    appointmentStatus.textContent =
      "We couldn't submit your request. Please try again.";

  } finally {
    appointmentSubmit.disabled = false;
  }
});
