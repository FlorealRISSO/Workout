const workoutStyles = {
  container: {
    padding: "16px",
    margin: "16px",
    borderRadius: "8px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "var(--primary)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "var(--on-surface)",
  },
  title: {
    margin: "0",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
    color: "var(--on-primary)",
  },
  span: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "var(--on-primary)",
  },
  footer: {
    display: "flex",
    justifyContent: "end",

  },
  setCountText: {
    fontSize: "16px",
    fontWeight: "normal",
    textAlign: "end",
    justifyContent: "end",
    color: "var(--on-primary)",
    margin: '0'
  },
  rowExercise: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px"
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    marginRight: "10px",
    transition: "background-color 0.3s"
  },
  activeCircle: "green", // Active exercise circle color
  inactiveCircle: "var(--on-primary)", 
};

class WorkoutBlock extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.state = {
      activeIndex: props.activeIndex !== null ? props.activeIndex : -1,
      doneSets: props.doneSets || 0
    };
  }

  setActive(index) {
    if (index >= 0 && index < this.data.exercises.length) {
      this.setState({ activeIndex: index });
    }
  }

  incrementSet() {
    this.setState({ doneSets: Math.min(this.state.doneSets + 1, this.data.sets) });
  }

  build() {
    const container = document.createElement("div");
    Object.assign(container.style, workoutStyles.container);

    const title = document.createElement("h2");
    title.textContent = this.data.name;
    Object.assign(title.style, workoutStyles.title);
    container.appendChild(title);

    this.exerciseItems = [];

    this.data.exercises.forEach((exercise, index) => {
      const row = document.createElement("div");
      Object.assign(row.style, workoutStyles.rowExercise);

      const circle = document.createElement("div");
      Object.assign(circle.style, workoutStyles.circle);
      circle.style.backgroundColor = this.state.activeIndex === index ? workoutStyles.activeCircle : workoutStyles.inactiveCircle;

      const name = document.createElement("span");
      Object.assign(name.style, workoutStyles.span);
      name.textContent = exercise.name;

      row.appendChild(circle);
      row.appendChild(name);
      container.appendChild(row);

      this.exerciseItems.push({ circle });
    });

    const footer = document.createElement("div");
    Object.assign(footer.style, workoutStyles.footer);

    this.setCountText = document.createElement("span");
    this.setCountText.textContent = `${this.state.doneSets} / ${this.data.sets} sets`;
    Object.assign(this.setCountText.style, workoutStyles.setCountText);

    footer.appendChild(this.setCountText);

    container.appendChild(footer);
    return container;
  }

  setState(newState) {
    super.setState(newState);

    if (newState.activeIndex !== undefined && this.exerciseItems) {
      this.exerciseItems.forEach((item, index) => {
        item.circle.style.backgroundColor = index === newState.activeIndex ? workoutStyles.activeCircle : workoutStyles.inactiveCircle;
      });
    }

    if (newState.doneSets !== undefined && this.setCountText) {
      this.setCountText.textContent = `${this.state.doneSets} / ${this.data.sets} sets`;
    }
  }
}