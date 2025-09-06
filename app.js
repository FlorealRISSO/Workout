const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    marginTop: '3rem'
  },
};

function addRippleAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function addViewportMeta() {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
  document.head.appendChild(meta);
}

class HomeContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "WORKOUT PLANS" });
    text.mount(wrapper);

    workoutData.plans.forEach(plan => {
      const planBtn = new TouchButton({
        text: plan.name,
        onClick: () => this.props.navigator.push("plan", { plan: plan })
      });
      planBtn.mount(wrapper);
    });

    const editText = new Text({ text: "EDIT" });
    editText.mount(wrapper);

    const addBtn = new TouchButton({
      variant: "success",
      text: "CREATE PLAN",
      onClick: () => {
        this.props.navigator.push("addPlan");
      }
    });
    addBtn.mount(wrapper);

    return wrapper;
  }
}

class SettingsContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const operatingText = new Text({ text: "OPERATING" });
    operatingText.mount(wrapper);

    const theme = getTheme();
    const themeBox = new Checkbox({
      checked: (theme != 'light'),
      label: "Dark theme",
      onChange: (val) => {
        setTheme(val)
      },
    });
    themeBox.mount(wrapper);

    const auto = getAuto();
    const autoBox = new Checkbox({
      checked: auto == "auto",
      label: "Auto switch",
      onChange: (val) => {
        setAuto(val)
      },
    });
    autoBox.mount(wrapper);

    const audioOptions = Object.values(WaveType).map(v => {
      return { value: v, label: v };
    });

    const switchAudioText = new Text({ text: "SWITCHING AUDIO" });
    switchAudioText.mount(wrapper);

    let switchAudioValues = getAudioData(SWITCHING_SOUND_KEY);
    const switchingAudioSelect = new SelectInput({
      variant: "secondary",
      value: switchAudioValues.sound,
      options: audioOptions,
      onChange: (val) => {
        switchAudioValues.sound = val;
      }
    });
    switchingAudioSelect.mount(wrapper);

    const switchAudioTime = new CounterInput({
      value: switchAudioValues.time,
      variant: "secondary"
    });
    switchAudioTime.mount(wrapper);

    const testSwitchingAudio = new TouchButton({
      variant: "primary",
      text: "TEST AUDIO",
      onClick: () => {
        switchAudioValues.time = switchAudioTime.getValue();
        playSound(switchAudioValues.time, switchAudioValues.sound);
      }
    });
    testSwitchingAudio.mount(wrapper);

    const saveSwitching = new TouchButton({
      variant: "success",
      text: "SAVE AUDIO",
      onClick: () => {
        switchAudioValues.time = switchAudioTime.getValue();
        saveAudioData(SWITCHING_SOUND_KEY, switchAudioValues);
      }
    });
    saveSwitching.mount(wrapper);

    const workoutAudioText = new Text({ text: "WORKOUT AUDIO" });
    workoutAudioText.mount(wrapper);

    let workoutAudioValues = getAudioData(WORKOUT_SOUND_KEY);
    const workoutAudioSelect = new SelectInput({
      variant: "secondary",
      value: workoutAudioValues.sound,
      options: audioOptions,
      onChange: (val) => {
        workoutAudioValues.sound = val;
      }
    });
    workoutAudioSelect.mount(wrapper);

    const workoutAudioTime = new CounterInput({
      value: workoutAudioValues.time,
      variant: "secondary"
    });
    workoutAudioTime.mount(wrapper);

    const testWorkoutAudio = new TouchButton({
      variant: "primary",
      text: "TEST AUDIO",
      onClick: () => {
        workoutAudioValues.time = workoutAudioTime.getValue();
        playSound(workoutAudioValues.time, workoutAudioValues.sound);
      }
    });
    testWorkoutAudio.mount(wrapper);

    const workoutSwitching = new TouchButton({
      variant: "success",
      text: "SAVE AUDIO",
      onClick: () => {
        workoutAudioValues.time = workoutAudioTime.getValue();
        saveAudioData(WORKOUT_SOUND_KEY, workoutAudioValues);
      }
    });
    workoutSwitching.mount(wrapper);

    const exportText = new Text({ text: "EXPORT" });
    exportText.mount(wrapper);

    const defaultValue = "SELECT A PLAN";
    let planName = defaultValue;
    const options = [
      { label: defaultValue, value: defaultValue }
    ];
    workoutData.plans.forEach((plan, i) => {
      options.push({label: plan.name, value: plan.name});
    });

    const exportString = "EXPORT PLAN";
    const exportPlanButton = new TouchButton({
      variant: "success",
      text: exportString,
      disabled: true,
      display: false,
      onClick: () => {
        if (planName !== defaultValue) {
          exportPlan(planName)
        }
      }
    });

    const selectInput = new SelectInput({
      variant: "secondary",
      value: defaultValue,
      options : options,
      onChange: (val) => {
        if (val === defaultValue) {
          exportPlanButton.setText(exportString);
          exportPlanButton.disable();
          exportPlanButton.hide();
          return;
        }
          exportPlanButton.setText(`EXPORT ${val}`)
          exportPlanButton.enable();
          exportPlanButton.show();
          planName = val;
      }
    })
    selectInput.mount(wrapper);
    exportPlanButton.mount(wrapper);

    const exportWorkoutDataBtn = new TouchButton({
      variant: "success",
      text: "EXPORT ALL",
      onClick: () => {
        exportWorkoutData();
      }
    });
    exportWorkoutDataBtn.mount(wrapper);

    const ImportText = new Text({ text: "IMPORT" });
    ImportText.mount(wrapper)

    const importPlanBtn = new TouchButton({
      variant: "success",
      text: "IMPORT PLAN",
      onClick: () => {
        importPlan();
      }
    });
    importPlanBtn.mount(wrapper); 

    const dataText = new Text({ text: "DATA MANAGEMENT" });
    dataText.mount(wrapper);

    const resetBtn = new TouchButton ({
      variant: "error",
      text: "RESET PLANS",
      onClick: () => {
        if (confirm("Are you sure you want to reset all plans to their default settings?")) {
          const error = resetPlans();
          if (error) {
            alert(error);
          } 
        }
      }
    });
    resetBtn.mount(wrapper);

    return wrapper;
  }
}

class PlanContaint extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "DAYS" });
    text.mount(wrapper);

    const plan = this.props.plan;
    plan.days.forEach(day => {
      const blockBtn = new TouchButton({
        text: day.name,
        onClick: () => this.props.navigator.push("day", { planName: plan.name, day: day })
      });
      blockBtn.mount(wrapper);
    });

    const editText = new Text({ text: "EDIT" });
    editText.mount(wrapper);

    const createBlock = new TouchButton({
      variant: "success",
      text: "CREATE DAY",
      onClick: () => {
        this.props.navigator.push("addDay", { planName: plan.name });
      }
    });
    createBlock.mount(wrapper);

    const deletePlanBtn = new TouchButton({
      variant: "error",
      text: "DELETE PLAN",
      onClick: () => {
        if (confirm("Are you sure you want to delete this plan?")) {
          const error = deletePlan(plan.name);
          if (error) {
            alert(error);
          } else {
            this.props.navigator.pop();
          }
        }
      }
    });
    deletePlanBtn.mount(wrapper);
    return wrapper;
  }
}

class DayContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const planName = this.props.planName;
    const day = this.props.day;
    const dayName = day.name;

    const blockText = new Text({ text: "BLOCKS" });
    blockText.mount(wrapper);

    day.blocks.forEach(block => {
      const blockBtn = new TouchButton({
        text: block.name,
        onClick: () => {
          this.props.navigator.push("block", { planName, dayName, block: block });
        }
      });
      blockBtn.mount(wrapper);
    });

    const editText = new Text({ text: "EDIT" });
    editText.mount(wrapper);

    const createBlockBtn = new TouchButton({
      variant: "success",
      text: "CREATE BLOCK",
      onClick: () => {
        this.props.navigator.push("addBlock", { planName, dayName });
      }
    });
    createBlockBtn.mount(wrapper);

    const deleteDayBtn = new TouchButton({
      variant: "error",
      text: "DELETE DAY",
      onClick: () => {
        if (confirm("Are you sure you want to delete this day?")) {
          const error = deleteDay(planName, dayName);
          if (error) {
            alert(error);
          } else {
            this.props.navigator.pop();
          }
        }
      }
    });
    deleteDayBtn.mount(wrapper);

    const playText = new Text({ text: "PLAY" });
    playText.mount(wrapper);

    const playBtn = new TouchButton({
      text: "PLAY",
      onClick: () => {
        this.props.navigator.push("starting", { day });
      }
    });
    playBtn.mount(wrapper);


    return wrapper;
  }
}

class BlockContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);


    const planName = this.props.planName;
    const dayName = this.props.dayName;
    const block = this.props.block;
    const blockName = block.name;

    const exerciseText = new Text({ text: "EXERCISES" });
    exerciseText.mount(wrapper);

    block.exercises.forEach((exercise, index) => {
      const exerciseBtn = new TouchButton({
        text: exercise.name,
        onClick: () => {
          this.props.navigator.push("exercise", { planName, dayName, blockName, exercise: exercise, index: index });
        }
      });
      exerciseBtn.mount(wrapper);
    });

    const addBtn = new TouchButton({
      text: "Add Exercise",
      onClick: () => {
        this.props.navigator.push("addExercise", { planName, dayName, blockName });
      }
    });
    addBtn.mount(wrapper);

    const text = new Text({ text: "REPEATS" });
    text.mount(wrapper);

    const counter = new CounterInput({
      value: block.sets,
    });
    counter.mount(wrapper);

    const saveBtn = new TouchButton({
      variant: "success",
      text: "SAVE REPEATS",
      onClick: () => {
        const repeats = counter.getValue();
        const error = modifyBlockRepetitions(planName, dayName, blockName, repeats);
        if (error) {
          alert(error);
        }
      }
    });
    saveBtn.mount(wrapper);

    const deleteBlockBtn = new TouchButton({
      variant: "error",
      text: "DELETE BLOCK",
      onClick: () => {
        if (confirm("Are you sure you want to delete this block?")) {
          const error = deleteBlock(planName, dayName, blockName);
          if (error) {
            alert(error);
          } else {
            this.props.navigator.pop();
          }
        }
      }
    });
    deleteBlockBtn.mount(wrapper);

    return wrapper;
  }
}

class ExerciseContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "TIMER" });
    text.mount(wrapper);

    const timer = this.props.exercise.trainingTime || 0;
    const counter = new CounterInput({
      value: timer,
    });
    counter.mount(wrapper);

    const saveBtn = new TouchButton({
      variant: "success",
      text: "SAVE TIMER",
      onClick: () => {
        const timer = counter.getValue();
        const error = modifyExerciseTimer(this.props.planName, this.props.dayName, this.props.blockName, this.props.exercise.name, timer);
        if (error) {
          alert(error);
        }
      }
    });
    saveBtn.mount(wrapper);

    const removeExerciseBtn = new TouchButton({
      variant: "error",
      text: "REMOVE EXERCISE",
      onClick: () => {
        if (confirm("Are you sure you want to remove this exercise?")) {
          const error = removeExerciseFromBlock(this.props.planName, this.props.dayName, this.props.blockName, this.props.index);
          if (error) {
            alert(error);
          } else {
            this.props.navigator.pop();
          }
        }
      }
    });
    removeExerciseBtn.mount(wrapper);

    return wrapper;
  }
}

class AddExerciseContent extends Component {
  exercises = workoutData.exercises;


  modes = {
    create: "create",
    modify: "modify",
    use: "use"
  }

  exercise = null;
  buttonMode = this.modes.create

  getExercise(exercise) {
    return this.exercises.find(e => e.name === exercise);
  }

  buttonUpdate(newState) {
    this.buttonMode = newState;
    if (this.buttonMode == this.modes.create) {
      this.button.setText("CREATE EXERCISE");
    } else if (this.buttonMode == this.modes.modify) {
      this.button.setText("MODIFY EXERCISE");
    } else if (this.buttonMode == this.modes.use) {
      this.button.setText("USE EXERCISE");
    }
  }

  onChangeSearch(val) {
    this.exercise = this.getExercise(val);
    let newState = this.buttonMode;

    if (this.exercise) {
      this.descriptionInput.setState({ value: this.exercise.description });
      this.tagsInput.setState({ value: this.exercise.tags });
      this.bodyPartsInput.setState({ value: this.exercise.bodyParts });
      newState = this.modes.use;
    } else if (newState != this.modes.create) {
      this.descriptionInput.setState({ value: "" });
      this.tagsInput.setState({ value: "" });
      this.bodyPartsInput.setState({ value: "" });
      if (val != "") {
        newState = this.modes.create;
      }
    }
    this.buttonUpdate(newState);
  }

  onChangeInput(field, val) {
    let newState;
    if (this.exercise) {
      const isChange = this.exercise[field] != val;
      if (isChange) {
        newState = this.modes.modify;
      }
      else {
        newState = this.modes.use;
      }
    } else {
      newState = this.modes.create;
    }
    this.buttonUpdate(newState);
  }

  build() {
    this.exercises = workoutData.exercises;
    const exerciseNames = this.exercises.map(exercise => exercise.name);

    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "EXERCISE DESCRIPTION" });

    this.descriptionInput = new InputField({
      label: "Description",
      helperText: "e.g. bodyweight",
      value: this.props.exerciseDescription || "",
      onChange: (val) => {
        this.onChangeInput("description", val);
      }
    });

    this.tagsInput = new InputField({
      label: "Tags",
      helperText: "strength,upper-body,bodyweight",
      value: this.props.tags || "",
      onChange: (val) => {
        this.onChangeInput("tags", val);
      }
    });

    this.bodyPartsInput = new InputField({
      label: "Body parts",
      helperText: "chest,triceps,shoulders",
      value: this.props.bodyParts || "",
      onChange: (val) => {
        this.onChangeInput("bodyParts", val);
      }
    });

    this.button = new TouchButton({
      variant: "success",
      text: "CREATE EXERCISE",
      onClick: () => {
        const name = this.suggest.getValue();
        const description = this.descriptionInput.getValue();
        const tags = this.tagsInput.getValue();
        const bodyParts = this.bodyPartsInput.getValue();
        let error = null;

        if (this.buttonMode == this.modes.create) {
          error = createExercise(name, description, tags, bodyParts);
          if (error == undefined) {
            this.buttonUpdate(this.modes.use);
            return;
          }
        } else if (this.buttonMode == this.modes.modify) {
          error = modifyExercise(name, description, tags, bodyParts);
          if (error == undefined) {
            this.buttonUpdate(this.modes.use);
            return;
          }
        } else if (this.buttonMode == this.modes.use) {
          error = addExerciseToPlan(this.props.planName, this.props.dayName, this.props.blockName, name);
          if (error == undefined) {
            this.props.navigator.pop();
            return;
          }
        }
        alert(error);
      }
    });

    this.suggest = new SuggestInput({
      label: "Exercise name",
      helperText: "e.g. push-ups",
      suggestions: exerciseNames,
      onSelect: (val) => {
        this.onChangeSearch(val);
      },
      onChange: (val) => {
        this.onChangeSearch(val);
      }
    });


    text.mount(wrapper);
    this.suggest.mount(wrapper);
    this.descriptionInput.mount(wrapper);
    this.tagsInput.mount(wrapper);
    this.bodyPartsInput.mount(wrapper);
    this.button.mount(wrapper);

    return wrapper;
  }
}

class AddPlanContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "PLAN DESCRIPTION" });
    text.mount(wrapper);

    const inputField = new InputField({
      label: "Plan name",
      helperText: "Plan name",
      value: this.props.planName || "",
      onChange: (val) => {}
    });
    inputField.mount(wrapper);

    const createPlanBtn = new TouchButton({
      variant: "success",
      text: "CREATE PLAN",
      onClick: () => {
        const planName = inputField.getValue();
        let error = "Please enter a plan name.";
        if (planName) {
          error = createPlan(planName);
          if (error == undefined) {
            this.props.navigator.pop();
            return;
          }
        }
        alert(error);
      }
    });
    createPlanBtn.mount(wrapper);

    return wrapper;
  }
}

class AddDayContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "DAY DESCRIPTION" });
    text.mount(wrapper);

    const inputField = new InputField({
      label: "Day name",
      helperText: "Day name",
    });
    inputField.mount(wrapper);

    const createDayBtn = new TouchButton({
      variant: "success",
      text: "CREATE DAY",
      onClick: () => {
        const dayName = inputField.getValue();
        let error = "Please enter a day name.";
        if (dayName) {
          error = createDay(this.props.planName, dayName);
          if (error == undefined) {
            this.props.navigator.pop();
            return;
          }
        }
        alert(error);
      }
    });
    createDayBtn.mount(wrapper);

    return wrapper;
  }
}

class AddBlockContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "BLOCK DESCRIPTION" });
    text.mount(wrapper);

    const inputField = new InputField({
      label: "Block name",
      helperText: "Block name",
      value: this.props.blockName || "",
      onChange: (val) => {}
    });
    inputField.mount(wrapper);

    const createBlockBtn = new TouchButton({
      variant: "success",
      text: "CREATE BLOCK",
      onClick: () => {
        const blockName = inputField.getValue();
        let error = "Please enter a block name.";
        if (blockName) {
          error = createBlock(this.props.planName, this.props.dayName, blockName);
          if (error == undefined) {
            this.props.navigator.pop();
            return;
          }
        }
        alert(error);
      }
    });
    createBlockBtn.mount(wrapper);

    return wrapper;
  }
}

class StartingContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const day = this.props.day;
    day.blocks.forEach(block => {
      const workoutBlock = new WorkoutBlock({
        data: block,
      });
      workoutBlock.mount(wrapper);
    })

    const startBtn = new TouchButton({
      text: "START WORKOUT",
      onClick: () => {
        if (day.blocks.length > 0) {
          this.props.navigator.replaceWith("switching", {
            day: day,
            blockIndex: 0,
            exerciseIndex: 0,
            setCount: 0,
          });
        } else {
          alert("No blocks available for this day.");
        }
      }
    });
    startBtn.mount(wrapper);

    return wrapper;
  }
}

class SwitchingContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    let day = this.props.day;
    let blockIndex = this.props.blockIndex;
    let exerciseIndex = this.props.exerciseIndex;
    let setCount = this.props.setCount;

    const auto = getAuto();


    const block = day?.blocks[blockIndex];
    const path = () => {
      if (blockIndex >= day.blocks.length) {
        setTimeout(() => {
          this.props.navigator.replaceWith("finished", {
            day: day,
            blockIndex: blockIndex,
            exerciseIndex: exerciseIndex,
            setCount: setCount,
          });
        }, 500);
        return;
      }

      if (setCount >= block.sets) {
        setTimeout(() => {
          this.props.navigator.replaceWith("switching", {
            day: day,
            blockIndex: blockIndex + 1,
            exerciseIndex: 0,
            setCount: 0,
          });
        }, 500);
        return;
      }

      if (exerciseIndex >= block.exercises.length) {
        let nextPage = "resting";
        exerciseIndex = 0;
        setCount += 1;
        if (setCount >= block.sets) {
          setCount = 0;
          blockIndex += 1;
          if (blockIndex >= day.blocks.length) {
            nextPage = "finished";
          }
        }
        setTimeout(() => {
          this.props.navigator.replaceWith(nextPage, {
            day: day,
            blockIndex: blockIndex,
            exerciseIndex: exerciseIndex,
            setCount: setCount,
          });
        }, 500);
        return;
      }

      // SWITCHING
      const blockWorkout = new WorkoutBlock({
        data: block,
        activeIndex: exerciseIndex,
        doneSets: setCount,
      });
      blockWorkout.mount(wrapper);

      const autoBox = new Checkbox({
        checked: auto == "auto",
        label: "Auto switch",
        onChange: (val) => {
          setAuto(val)
        },
      });
      autoBox.mount(wrapper);

      const countdown = new Countdown({
        isPaused: auto != "auto",
        time: 5,
        label: "Get ready...",
        onFinish: () => {
          playCustomSound(SWITCHING_SOUND_KEY);
          this.props.navigator.replaceWith("practicing", {
            day: day,
            blockIndex: blockIndex,
            exerciseIndex: exerciseIndex,
            setCount: setCount,
          });
        }
      });
      countdown.mount(wrapper);


      return;
    }

    path();



    return wrapper;
  }
}
class PracticingContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const day = this.props.day;
    const blockIndex = this.props.blockIndex;
    const exerciseIndex = this.props.exerciseIndex;
    const setCount = this.props.setCount;

    const block = day.blocks[blockIndex];
    const exercise = block.exercises[exerciseIndex];

    const blockWorkout = new WorkoutBlock({
      data: block,
      activeIndex: exerciseIndex,
      doneSets: setCount,
    });
    blockWorkout.mount(wrapper);

    const countdown = new Countdown({
      time: exercise.trainingTime,
      label: "Time to work!",
      onFinish: () => {
        playCustomSound(WORKOUT_SOUND_KEY);
        this.props.navigator.replaceWith("switching", {
          day: this.props.day,
          blockIndex: this.props.blockIndex,
          exerciseIndex: this.props.exerciseIndex + 1,
          setCount: this.props.setCount,
        });
      }
    });
    countdown.mount(wrapper);

    return wrapper;
  }
}

class RestingContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const day = this.props.day;
    const blockIndex = this.props.blockIndex;
    const block = day.blocks[blockIndex];
    const setCount = this.props.setCount;
    const restTime = block.restTime || DEFAULT_REST_TIME;

    const workoutBlock = new WorkoutBlock({
      data: block,
      activeIndex: -1,
      doneSets: setCount,
    });
    workoutBlock.mount(wrapper);

    const countdown = new Countdown({
      time: restTime,
      label: "Resting...",
      onFinish: () => {
        this.props.navigator.replaceWith("switching", {
          day: this.props.day,
          blockIndex: this.props.blockIndex,
          exerciseIndex: 0,
          setCount: this.props.setCount,
        });
      }
    });
    countdown.mount(wrapper);

    return wrapper;
  }
}
class FinishedContent extends Component {
  build() {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, styles.wrapper);

    const text = new Text({ text: "Workout finished!" });
    text.mount(wrapper);

    const restartBtn = new TouchButton({
      text: "Go to Home",
      onClick: () => {
        this.props.navigator.popToRoot();
      }
    });
    restartBtn.mount(wrapper);

    return wrapper;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.navigator = new Navigator(this);
  }

  build() {
    const root = document.createElement("div");
    root.style.height = "100%";
    root.style.width = "100%";
    this.navigator.buildCurrentPage().mount(root);
    return root;
  }
}

function main() {
  // Add required HTML elements and styles
  addViewportMeta();
  // addRippleAnimation();

  // Reset body styles
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
  document.body.style.overflowX = "hidden";
  document.body.style.position = "relative";

  // Reset html styles
  document.documentElement.style.height = "100%";
  document.documentElement.style.width = "100%";
  document.documentElement.style.overflow = "hidden";

  // use Theme
  useTheme();

  // Create and mount app
  const app = new App();
  app.mount(document.getElementById("app"));
}

main();