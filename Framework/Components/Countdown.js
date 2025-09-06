const stylesCountdown = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "var(--primary)",
        color: "var(--on-primary)",
        fontFamily: "Roboto, sans-serif",
        transition: "background-color 0.3s, color 0.3s",
        width: "100%",
        boxSizing: "border-box"
    },
    timeText: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        width: "100%",
        textAlign: "center"
    },
    btnColumn: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center"
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "var(--surface)",
        color: "var(--on-surface)",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        boxSizing: "border-box",
        transition: "background-color 0.3s, color 0.3s"
    }
};

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.initialTime = props.time || 60;
        this.isPaused = props.isPaused || false;
        this.onFinish = props.onFinish || (() => { });
        this.state = {
            timeLeft: this.initialTime,
            isPaused: this.isPaused,
        };
        this.interval = null;
        this.textLabel = props.label || "Time Resting";
    }

    build() {
        const container = document.createElement("div");
        Object.assign(container.style, stylesCountdown.container);

        this.label = document.createElement("h2");
        this.label.textContent = this.textLabel;
        Object.assign(this.label.style, stylesCountdown.label);

        this.timeText = document.createElement("div");
        this.timeText.textContent = this.formatTime(this.state.timeLeft);
        Object.assign(this.timeText.style, stylesCountdown.timeText);

        const btnColumn = document.createElement("div");
        Object.assign(btnColumn.style, stylesCountdown.btnColumn);

        this.pauseResumeBtn = this.makeButton(this.state.isPaused ? "Resume" : "Pause", () => this.togglePause());
        const restartBtn = this.makeButton("Restart", () => this.restart());
        const skipBtn = this.makeButton("Skip", () => this.finishEarly());

        btnColumn.appendChild(this.pauseResumeBtn);
        btnColumn.appendChild(restartBtn);
        btnColumn.appendChild(skipBtn);

        container.appendChild(this.label);
        container.appendChild(this.timeText);
        container.appendChild(btnColumn);

        if (!this.state.isPaused) {
            this.startTimer();
        }

        return container;
    }

    makeButton(text, onClick) {
        const btn = document.createElement("button");
        btn.textContent = text;
        Object.assign(btn.style, stylesCountdown.button);
        btn.onclick = onClick;
        return btn;
    }

    startTimer() {
        this.clearTimer();
        this.interval = setInterval(() => {
            if (!this.state.isPaused) {
                if (this.state.timeLeft > 0) {
                    this.setState({ timeLeft: this.state.timeLeft - 1 });
                } else {
                    this.clearTimer();
                    this.onFinish();
                }
            }
        }, 1000);
    }

    clearTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    togglePause() {
        const newPaused = !this.state.isPaused;
        this.setState({ isPaused: newPaused });
        this.pauseResumeBtn.textContent = newPaused ? "Resume" : "Pause";
    }

    restart() {
        this.setState({ timeLeft: this.initialTime, isPaused: false });
        this.pauseResumeBtn.textContent = "Pause";
    }

    finishEarly() {
        this.clearTimer();
        this.onFinish();
    }

    setState(newState) {
        super.setState(newState);
        if (newState.timeLeft !== undefined && this.timeText) {
            this.timeText.textContent = this.formatTime(newState.timeLeft);
        }
    }

    formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    }

    destroy() {
        this.clearTimer();
    }
}