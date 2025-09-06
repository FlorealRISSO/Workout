const materialSuggestInputStyle = {
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
    pointerEvents: "none",
    zIndex: "1"
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
    backgroundColor: "var(--surface-variant)",
    color: "var(--on-surface)",
    border: "none",
    borderRadius: "4px",
    boxSizing: "border-box",
    outline: "none",
    transition: "background-color 0.3s, box-shadow 0.3s"
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
  },
  suggestionsContainer: {
    position: "absolute",
    top: "58px", // Position below input with small gap
    left: "0",
    right: "0",
    zIndex: "100",
    maxHeight: "240px",
    overflowY: "auto",
    backgroundColor: "var(--surface)",
    borderRadius: "4px",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.14)",
    opacity: "0",
    transform: "translateY(-8px)",
    visibility: "hidden",
    transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0s 0.2s"
  },
  suggestionsVisible: {
    opacity: "1",
    transform: "translateY(0)",
    visibility: "visible",
    transition: "opacity 0.2s ease, transform 0.2s ease"
  },
  suggestionItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "1rem",
    display: "block",
    width: "100%",
    textAlign: "left",
    backgroundColor: "transparent",
    color: "var(--on-surface)",
    border: "none",
    borderRadius: "0",
    transition: "background-color 0.2s ease"
  },
  suggestionItemHover: {
    backgroundColor: "var(--surface-variant)"
  },
  assistiveText: {
    marginTop: "4px",
    marginLeft: "12px",
    fontSize: "0.75rem",
    color: "var(--on-surface-variant)"
  }
};

class SuggestInput {
  constructor(options = {}) {
    this.options = options;
    this.value = options.value || "";
    this.isFocused = false;
    this.isHovering = false;

    // DOM elements
    this.containerRef = null;
    this.labelRef = null;
    this.inputRef = null;
    this.activeLineRef = null;
    this.suggestionsRef = null;
    
    this.element = this.build();
  }

  // Direct DOM manipulation methods to avoid event conflicts
  handleFocus = () => {
    this.isFocused = true;
    
    if (this.labelRef) {
      Object.assign(this.labelRef.style, materialSuggestInputStyle.labelFocused);
    }
    
    if (this.activeLineRef) {
      Object.assign(this.activeLineRef.style, materialSuggestInputStyle.activeLineFocused);
    }
    
    this.updateSuggestions();
  };

  handleBlur = () => {
    this.isFocused = false;
    
    // Don't hide suggestions if user is hovering over them
    if (!this.isHovering) {
      setTimeout(() => {
        if (this.suggestionsRef) {
          // Remove the visible style
          this.suggestionsRef.style.opacity = "0";
          this.suggestionsRef.style.transform = "translateY(-8px)";
          this.suggestionsRef.style.visibility = "hidden";
        }
      }, 150);
    }
    
    // Update label position only if input is empty
    if (!this.value && this.labelRef) {
      Object.assign(this.labelRef.style, materialSuggestInputStyle.labelUnfocused);
    }
    
    if (this.activeLineRef) {
      this.activeLineRef.style.transform = "scaleX(0)";
    }
  };

  handleInput = (e) => {
    this.value = e.target.value;
    
    // Move label up if there's text
    if (this.labelRef && !materialSuggestInputStyle.labelFocused.transform) {
      Object.assign(this.labelRef.style, materialSuggestInputStyle.labelFocused);
    }
    
    // Fire onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(this.value);
    }
    
    this.updateSuggestions();
  };

  handleSuggestionContainerMouseEnter = () => {
    this.isHovering = true;
  };

  handleSuggestionContainerMouseLeave = () => {
    this.isHovering = false;
    if (!this.isFocused && this.suggestionsRef) {
      // Hide suggestions
      this.suggestionsRef.style.opacity = "0";
      this.suggestionsRef.style.transform = "translateY(-8px)";
      this.suggestionsRef.style.visibility = "hidden";
    }
  };

  selectSuggestion = (suggestion) => {
    this.value = suggestion;
    
    if (this.inputRef) {
      this.inputRef.value = suggestion;
    }
    
    if (this.suggestionsRef) {
      // Hide suggestions
      this.suggestionsRef.style.opacity = "0";
      this.suggestionsRef.style.transform = "translateY(-8px)";
      this.suggestionsRef.style.visibility = "hidden";
    }
    
    // Fire onSelect callback if provided
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(suggestion);
    }
  };

  updateSuggestions = () => {
    if (!this.suggestionsRef) return;
    
    // Clear suggestions list
    while (this.suggestionsRef.firstChild) {
      this.suggestionsRef.removeChild(this.suggestionsRef.firstChild);
    }
    
    // If there's a value and suggestions exist
    if (this.value && this.options.suggestions && Array.isArray(this.options.suggestions)) {
      const filterValue = this.value.toLowerCase();
      const filteredSuggestions = this.options.suggestions
        .filter(suggestion => suggestion.toLowerCase().includes(filterValue))
        .slice(0, 10); // Limit to 10 suggestions
      
      if (filteredSuggestions.length > 0) {
        // Show suggestions container
        Object.assign(this.suggestionsRef.style, materialSuggestInputStyle.suggestionsVisible);
        
        // Create suggestion items
        filteredSuggestions.forEach(suggestion => {
          const item = document.createElement("button");
          item.type = "button";
          item.textContent = suggestion;
          Object.assign(item.style, materialSuggestInputStyle.suggestionItem);
          
          // Handle hover state
          item.addEventListener("mouseenter", () => {
            Object.assign(item.style, materialSuggestInputStyle.suggestionItemHover);
          });
          
          item.addEventListener("mouseleave", () => {
            item.style.backgroundColor = "transparent";
          });
          
          // Handle click
          item.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Prevent input from losing focus
            this.selectSuggestion(suggestion);
          });
          
          this.suggestionsRef.appendChild(item);
        });
      } else {
        // Hide suggestions if no matches
        this.suggestionsRef.style.opacity = "0";
        this.suggestionsRef.style.transform = "translateY(-8px)";
        this.suggestionsRef.style.visibility = "hidden";
      }
    } else {
      // Hide suggestions if no value
      this.suggestionsRef.style.opacity = "0";
      this.suggestionsRef.style.transform = "translateY(-8px)";
      this.suggestionsRef.style.visibility = "hidden";
    }
  };

  build() {
    // Create container
    const container = document.createElement("div");
    Object.assign(container.style, materialSuggestInputStyle.container);
    this.containerRef = container;
    
    // Create label
    const label = document.createElement("label");
    label.textContent = this.options.label || "Search";
    Object.assign(label.style, materialSuggestInputStyle.label);
    
    // Set initial label position based on value
    if (this.value) {
      Object.assign(label.style, materialSuggestInputStyle.labelFocused);
    } else {
      Object.assign(label.style, materialSuggestInputStyle.labelUnfocused);
    }
    
    this.labelRef = label;
    container.appendChild(label);
    
    // Create input field
    const input = document.createElement("input");
    input.type = "text";
    input.value = this.value;
    Object.assign(input.style, materialSuggestInputStyle.input);
    
    // Set up event listeners
    input.addEventListener("focus", this.handleFocus);
    input.addEventListener("blur", this.handleBlur);
    input.addEventListener("input", this.handleInput);
    
    this.inputRef = input;
    container.appendChild(input);
    
    // Create active indicator line
    const activeLine = document.createElement("div");
    Object.assign(activeLine.style, materialSuggestInputStyle.activeLine);
    this.activeLineRef = activeLine;
    container.appendChild(activeLine);
    
    // Create suggestions container
    const suggestionsContainer = document.createElement("div");
    Object.assign(suggestionsContainer.style, materialSuggestInputStyle.suggestionsContainer);
    suggestionsContainer.addEventListener("mouseenter", this.handleSuggestionContainerMouseEnter);
    suggestionsContainer.addEventListener("mouseleave", this.handleSuggestionContainerMouseLeave);
    this.suggestionsRef = suggestionsContainer;
    container.appendChild(suggestionsContainer);
    
    // Add helper text if provided
    if (this.options.helperText) {
      const helperText = document.createElement("div");
      helperText.textContent = this.options.helperText;
      Object.assign(helperText.style, materialSuggestInputStyle.assistiveText);
      container.appendChild(helperText);
    }
    
    return container;
  }

  getElement() {
    return this.element;
  }

  getValue() {
    return this.value;
  }

  setValue(newValue) {
    this.value = newValue;
    
    if (this.inputRef) {
      this.inputRef.value = newValue;
    }
    
    // Update label position
    if (this.labelRef) {
      if (newValue) {
        Object.assign(this.labelRef.style, materialSuggestInputStyle.labelFocused);
      } else if (!this.isFocused) {
        Object.assign(this.labelRef.style, materialSuggestInputStyle.labelUnfocused);
      }
    }
  }

  mount(container) {
    if (container instanceof HTMLElement) {
      container.appendChild(this.element);
    } else if (typeof container === 'string') {
      const element = document.querySelector(container);
      if (element) {
        element.appendChild(this.element);
      }
    }
    return this;
  }
}