const materialInputFieldStyle = {
  container: {
    position: "relative",
    margin: "16px 0",
    width: "100%",
    fontFamily: "Roboto, Arial, sans-serif"
  },
  label: {
    position: "absolute",
    left: "12px",
    color: "var(--primary)",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "transform 0.2s ease-out, color 0.2s",
    transformOrigin: "left top",
    pointerEvents: "none"
  },
  labelFocused: {
    transform: "translateY(-24px) scale(0.85)",
    color: "var(--primary)"
  },
  labelUnfocused: {
    transform: "translateY(8px)",
    color: "var(--on-surface-variant)"
  },
  input: {
    width: "100%",
    height: "56px",
    padding: "24px 12px 8px",
    fontSize: "1rem",
    fontFamily: "inherit",
    backgroundColor: "var(--surface-variant, #e7e0ec)",
    color: "var(--on-surface, #1c1b1f)",
    border: "none",
    borderRadius: "4px",
    boxSizing: "border-box",
    outline: "none",
    transition: "background-color 0.3s, box-shadow 0.3s"
  },
  assistiveText: {
    marginTop: "4px",
    paddingLeft: "12px",
    fontSize: "0.75rem",
    color: "var(--on-surface-variant)"
  },
  activeLine: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: "var(--primary)",
    transform: "scaleX(0)",
    transition: "transform 0.2s ease-out"
  },
  activeLineFocused: {
    transform: "scaleX(1)"
  }
};

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      isFocused: false
    };
    this.inputRef = null;
    this.labelRef = null;
    this.activeLineRef = null;
    this.containerRef = null;
  }

  // Use direct DOM manipulation without triggering setState during events
  handleFocus = () => {
    this.state.isFocused = true; // Directly update state object
    
    // Update UI elements directly
    if (this.labelRef) {
      Object.assign(this.labelRef.style, materialInputFieldStyle.labelFocused);
    }
    if (this.activeLineRef) {
      Object.assign(this.activeLineRef.style, materialInputFieldStyle.activeLineFocused);
    }
  };

  handleBlur = () => {
    const isEmpty = !this.state.value;
    this.state.isFocused = false; // Directly update state object
    
    // Update UI elements directly based on state
    if (this.labelRef) {
      if (isEmpty) {
        Object.assign(this.labelRef.style, materialInputFieldStyle.labelUnfocused);
      } else {
        Object.assign(this.labelRef.style, materialInputFieldStyle.labelFocused);
      }
    }
    
    if (this.activeLineRef) {
      this.activeLineRef.style.transform = "scaleX(0)";
    }
  };

  handleInput = (e) => {
    const newVal = e.target.value;
    this.state.value = newVal; // Update state directly
    
    // Move label up if there's text
    if (this.labelRef) {
      if (newVal) {
        Object.assign(this.labelRef.style, materialInputFieldStyle.labelFocused);
      } else if (!this.state.isFocused) {
        Object.assign(this.labelRef.style, materialInputFieldStyle.labelUnfocused);
      }
    }
    
    // Call onChange callback if provided
    if (this.props.onChange) {
      this.props.onChange(newVal);
    }
  };

  build() {
    const container = document.createElement("div");
    Object.assign(container.style, materialInputFieldStyle.container);
    this.containerRef = container;

    // Create floating label
    const label = document.createElement("label");
    label.textContent = this.props.label || "Label";
    Object.assign(label.style, materialInputFieldStyle.label);
    
    // Initial label position depends on whether there's a value
    if (this.state.value) {
      Object.assign(label.style, materialInputFieldStyle.labelFocused);
    } else {
      Object.assign(label.style, materialInputFieldStyle.labelUnfocused);
    }
    
    this.labelRef = label;
    container.appendChild(label);

    // Create input field
    const input = document.createElement("input");
    input.type = this.props.type || "text";
    input.placeholder = "";  // Material design uses floating labels instead of placeholders
    input.id = this.props.id || "materialInputField";
    Object.assign(input.style, materialInputFieldStyle.input);
    
    // Add event handlers
    input.addEventListener("focus", this.handleFocus);
    input.addEventListener("blur", this.handleBlur);
    input.addEventListener("input", this.handleInput);

    input.value = this.state.value;
    this.inputRef = input;
    container.appendChild(input);

    // Create active indicator line
    const activeLine = document.createElement("div");
    Object.assign(activeLine.style, materialInputFieldStyle.activeLine);
    this.activeLineRef = activeLine;
    container.appendChild(activeLine);

    // Add helper/error text if provided
    if (this.props.helperText) {
      const assistiveText = document.createElement("div");
      assistiveText.textContent = this.props.helperText;
      Object.assign(assistiveText.style, materialInputFieldStyle.assistiveText);
      container.appendChild(assistiveText);
    }

    return container;
  }

  // Safe update method that properly updates DOM
  setState(newState) {
    // Update internal state object
    const oldState = {...this.state};
    Object.assign(this.state, newState);
    
    // Only update DOM elements if they exist
    if (this.inputRef && newState.value !== undefined && oldState.value !== newState.value) {
      this.inputRef.value = newState.value;
      
      // Update label position based on value
      if (this.labelRef) {
        if (newState.value) {
          Object.assign(this.labelRef.style, materialInputFieldStyle.labelFocused);
        } else if (!this.state.isFocused) {
          Object.assign(this.labelRef.style, materialInputFieldStyle.labelUnfocused);
        }
      }
    }
  }

  getValue() {
    return this.state.value;
  }
}