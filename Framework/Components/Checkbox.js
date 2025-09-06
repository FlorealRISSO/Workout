const materialCheckboxStyle = {
  container: {
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    margin: "8px 0",
    fontFamily: "Roboto, Arial, sans-serif",
    cursor: "pointer",
    width: "100%",
    backgroundColor: "var(--primary)",
  },
  input: {
    position: "absolute",
    opacity: "0",
    cursor: "pointer",
    height: "0",
    width: "0"
  },
  checkmark: {
    position: "relative",
    height: "2rem",
    width: "2rem",
    minWidth: "18px",
    borderRadius: "2px",
    border: "2px solid var(--on-surface-variant, #49454f)",
    backgroundColor: "var(--on-primary)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--on-primary)",
    margin: "10px",
  },
  // Ripple effect container
  ripple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    backgroundColor: "var(--primary-container, #eaddff)",
    opacity: "0.3",
    transformOrigin: "center",
    transition: "transform 0.3s ease-out, opacity 0.2s ease-out",
    zIndex: "-1"
  },
  // Active ripple
  rippleActive: {
    transform: "scale(2.5)",
    opacity: "0.2"
  },
  icon: {
    opacity: "0",
    transform: "scale(0)",
    color: "var(--primary)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  iconChecked: {
    opacity: "1",
    transform: "scale(2)",
    width: "2rem",
    height: "2rem",
  },
  label: {
    color: "var(--on-primary)",
    userSelect: "none",
    cursor: "pointer",
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "12px"
  },
  disabled: {
    opacity: "0.38",
    cursor: "not-allowed"
  }
};

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.checked = props.checked || false;
    this.disabled = props.disabled || false;
    this.label = props.label || "Checkbox";
    this.onChange = props.onChange || (() => {});
    
    // References to DOM elements
    this.inputRef = null;
    this.checkmarkRef = null;
    this.iconRef = null;
    this.rippleRef = null;
    this.containerRef = null;
  }

  // Toggle the checkbox state
  toggle = () => {
    if (this.disabled) return;
    
    this.checked = !this.checked;
    
    // Update visual state
    this.updateVisualState();
    
    // Call onChange handler with new state
    if (typeof this.onChange === 'function') {
      this.onChange(this.checked);
    }
  };

  // Update visual appearance based on checked state
  updateVisualState() {
    if (!this.checkmarkRef || !this.iconRef) return;
    
    if (this.checked) {
      // Apply checked styles
      Object.assign(this.iconRef.style, materialCheckboxStyle.iconChecked);
      this.inputRef.checked = true;
    } else {
      // Remove checked styles
      this.iconRef.style.opacity = "0";
      this.iconRef.style.transform = "scale(0)";
      this.inputRef.checked = false;
    }
  }

  // Show ripple effect on interaction
  showRipple = () => {
    if (this.disabled || !this.rippleRef) return;
    Object.assign(this.rippleRef.style, materialCheckboxStyle.rippleActive);
  };

  // Hide ripple effect
  hideRipple = () => {
    if (!this.rippleRef) return;
    this.rippleRef.style.transform = "scale(0)";
    this.rippleRef.style.opacity = "0.3";
  };

  build() {
    // Create container
    const container = document.createElement("label");
    Object.assign(container.style, materialCheckboxStyle.container);
    this.containerRef = container;
    
    // Create hidden input for accessibility
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = this.label;
    input.checked = this.checked;
    input.disabled = this.disabled;
    Object.assign(input.style, materialCheckboxStyle.input);
    this.inputRef = input;
    container.appendChild(input);
    
    // Create custom checkbox appearance
    const checkmark = document.createElement("div");
    Object.assign(checkmark.style, materialCheckboxStyle.checkmark);
    this.checkmarkRef = checkmark;
    
    // Create checkmark icon
    const icon = document.createElement("div");
    Object.assign(icon.style, materialCheckboxStyle.icon);
    icon.innerHTML = "✓"; // Simple checkmark
    this.iconRef = icon;
    checkmark.appendChild(icon);
    
    // Create ripple effect container
    const ripple = document.createElement("div");
    Object.assign(ripple.style, materialCheckboxStyle.ripple);
    this.rippleRef = ripple;
    checkmark.appendChild(ripple);
    
    container.appendChild(checkmark);
    
    // Create label text
    const labelText = document.createElement("span");
    labelText.textContent = this.label;
    Object.assign(labelText.style, materialCheckboxStyle.label);
    container.appendChild(labelText);
    
    // Apply initial visual state
    if (this.checked) {
      Object.assign(this.checkmarkRef.style, materialCheckboxStyle.checkmarkChecked);
      Object.assign(icon.style, materialCheckboxStyle.iconChecked);
    }
    
    // Apply disabled styling if needed
    if (this.disabled) {
      Object.assign(container.style, materialCheckboxStyle.disabled);
    }
    
    // Event listeners
    container.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default checkbox behavior
      this.toggle();
    });
    
    // Mouse interaction effects
    container.addEventListener("mousedown", this.showRipple);
    container.addEventListener("mouseup", this.hideRipple);
    container.addEventListener("mouseleave", this.hideRipple);
    
    // Keyboard accessibility
    input.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        this.toggle();
        this.showRipple();
        setTimeout(this.hideRipple, 300);
      }
    });
    
    return container;
  }

  setState(newState) {
    // Update state properties
    if (newState.checked !== undefined && newState.checked !== this.checked) {
      this.checked = newState.checked;
      this.updateVisualState();
    }
    
    if (newState.disabled !== undefined && newState.disabled !== this.disabled) {
      this.disabled = newState.disabled;
      
      if (this.containerRef && this.inputRef) {
        this.inputRef.disabled = this.disabled;
        
        if (this.disabled) {
          Object.assign(this.containerRef.style, materialCheckboxStyle.disabled);
        } else {
          this.containerRef.style.opacity = "1";
          this.containerRef.style.cursor = "pointer";
        }
      }
    }
    
    if (newState.label !== undefined && this.containerRef) {
      this.label = newState.label;
      // Find and update the label span
      const labelSpan = this.containerRef.querySelector("span:not([style*='position: absolute'])");
      if (labelSpan) {
        labelSpan.textContent = this.label;
      }
    }
  }

  isChecked() {
    return this.checked;
  }

  setChecked(checked) {
    this.setState({ checked });
  }
}