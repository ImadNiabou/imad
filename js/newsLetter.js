    // newslettter form
    function validateForm(event) {
        event.preventDefault();
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
    
        // Reset error messages
        nameError.textContent = "";
        emailError.textContent = "";
    
        // Validate name
        if (nameInput.value.trim() === "") {
          nameError.textContent = "Please enter your name";
          return;
        }
    
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailError.textContent = "Please enter a valid email address.";
          return;
        }
    
        // Submit the form if validation ok
        document.getElementById("successful").innerHTML =
          "Successful subscription"; /* Modificar el elemento dentro del html */
      }