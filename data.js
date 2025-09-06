const DEFAULT_TRAINING_TIME = 40; // Default training time in second
const DEFAULT_REST_TIME = 60; // Default rest time in second
const DEFAULT_SETS = 3; // Default number of sets

const workoutDataLegacy = {
    exercises: [
        { name: "Jump Rope", description: "", tags: ["cardio"], bodyParts: [] },
        { name: "DB Row", description: "", tags: ["strength", "upper body"], bodyParts: ["back", "arms"] },
        { name: "Push-ups", description: "", tags: ["strength", "upper body", "bodyweight"], bodyParts: ["chest", "triceps", "shoulders"] },
        { name: "High Knees", description: "", tags: ["cardio"], bodyParts: ["legs", "core"] },
        { name: "Goblet Squat", description: "", tags: ["strength", "lower body"], bodyParts: ["quads", "glutes"] },
        { name: "Glute Bridge (elastic)", description: "", tags: ["strength", "glutes"], bodyParts: ["glutes", "hamstrings"] },
        { name: "Mountain Climbers", description: "", tags: ["cardio", "core"], bodyParts: ["abs", "shoulders"] },
        { name: "Russian Twist", description: "", tags: ["core"], bodyParts: ["abs", "obliques"] },
        { name: "Burpees", description: "", tags: ["cardio", "full body"], bodyParts: ["full body"] },
        { name: "Jump Squats", description: "", tags: ["strength", "explosive", "legs"], bodyParts: ["quads", "glutes"] },
        { name: "Reverse Lunge", description: "", tags: ["strength", "legs"], bodyParts: ["quads", "hamstrings", "glutes"] },
        { name: "Sumo Deadlift", description: "", tags: ["strength", "legs"], bodyParts: ["hamstrings", "glutes", "back"] },
        { name: "Skater Jumps", description: "", tags: ["cardio", "explosive"], bodyParts: ["legs", "glutes"] },
        { name: "Bulgarian Split Squat", description: "", tags: ["strength", "legs"], bodyParts: ["quads", "glutes"] },
        { name: "Glute Bridge Hold", description: "", tags: ["core", "glutes"], bodyParts: ["glutes", "hamstrings"] },
        { name: "Jumping Jacks", description: "", tags: ["cardio"], bodyParts: ["full body"] },
        { name: "Plank Row", description: "", tags: ["strength", "core", "upper body"], bodyParts: ["core", "back", "arms"] },
        { name: "Side Plank", description: "", tags: ["core", "stability"], bodyParts: ["obliques", "core"] },
        { name: "Chest Press", description: "", tags: ["strength", "upper body"], bodyParts: ["chest", "arms"] },
        { name: "Overhead Press", description: "", tags: ["strength", "shoulders"], bodyParts: ["shoulders", "arms"] },
        { name: "Biceps Curl", description: "", tags: ["strength", "arms"], bodyParts: ["biceps"] },
        { name: "Triceps Extension", description: "", tags: ["strength", "arms"], bodyParts: ["triceps"] },
        { name: "Hammer Curl", description: "", tags: ["strength", "arms"], bodyParts: ["biceps"] },
        { name: "Hip Thrust", description: "", tags: ["strength", "glutes"], bodyParts: ["glutes", "hamstrings"] },
        { name: "Glute Kickback (elastic)", description: "", tags: ["strength", "glutes"], bodyParts: ["glutes"] },
        { name: "Side Lunge", description: "", tags: ["strength", "legs"], bodyParts: ["quads", "glutes"] },
        { name: "Side Plank with Leg Raise", description: "", tags: ["core", "stability"], bodyParts: ["obliques", "glutes"] },
        { name: "Leg Raises", description: "", tags: ["core"], bodyParts: ["lower abs"] },
        { name: "Deadlift", description: "", tags: ["strength", "full body"], bodyParts: ["hamstrings", "glutes", "back"] },
        { name: "Squat Press", description: "", tags: ["strength", "full body"], bodyParts: ["legs", "shoulders"] },
        { name: "Renegade Row", description: "", tags: ["strength", "core"], bodyParts: ["core", "back", "arms"] },
        { name: "DB Swing", description: "", tags: ["explosive", "conditioning"], bodyParts: ["hips", "glutes", "shoulders"] },
        { name: "Plank Hold", description: "", tags: ["core", "stability"], bodyParts: ["abs", "back"] }
    ],
    plans: [
        {
            name: "5-Day Circuit Training Plan",
            description: "A structured 5-day cardio and strength plan with mixed focus areas.",
            days: [
                {
                    name: "Day 1 - Upper / Lower Focus",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "DB Row", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Push-ups", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "High Knees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Goblet Squat", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Glute Bridge (elastic)", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 3",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Mountain Climbers", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Russian Twist", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Burpees", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 2 - Legs + Core Focus",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Squats", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Reverse Lunge", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Sumo Deadlift", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Skater Jumps", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Bulgarian Split Squat", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Glute Bridge Hold", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 3",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jumping Jacks", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank Row", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Side Plank", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 3 - Push / Pull Focus",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Chest Press", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "DB Row", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "High Knees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Overhead Press", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Biceps Curl", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 3",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Mountain Climbers", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Triceps Extension", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Hammer Curl", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 4 - Glutes / Core Focus",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Skater Jumps", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Hip Thrust", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Glute Kickback (elastic)", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jumping Jacks", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Side Lunge", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Side Plank with Leg Raise", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 3",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Russian Twist", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Leg Raises", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 5 - Full Body Conditioning",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Burpees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Deadlift", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Push-ups", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "High Knees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Squat Press", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Renegade Row", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 3",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Squats", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "DB Swing", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank Hold", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Cardio Crusher 5-Day Plan",
            description: "A high-energy, cardio-focused 5-day workout plan designed to boost endurance, burn fat, and improve cardiovascular health.",
            days: [
                {
                    name: "Day 1 - Explosive Start",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 45,
                            exercises: [
                                { name: "Jumping Jacks", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Jump Squats", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank Jacks", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Skater Jumps", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Mountain Climbers", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Burpees", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 2 - Core Fire",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 45,
                            exercises: [
                                { name: "High Knees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Side Plank with Leg Raise", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Russian Twist", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank to Push-up", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Leg Raises", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 3 - Plyo Sweat",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 45,
                            exercises: [
                                { name: "Jump Lunges", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Burpees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Mountain Climbers", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Squat Jumps", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank Jacks", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Skater Jumps", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 4 - Speed & Stability",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 45,
                            exercises: [
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Side Plank", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Reverse Lunge to Knee Drive", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "High Knees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Bear Crawl", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Leg Raises", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                },
                {
                    name: "Day 5 - Total Body Burnout",
                    blocks: [
                        {
                            name: "Block 1",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Burpees", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Squat to Jump", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Plank Shoulder Taps", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        },
                        {
                            name: "Block 2",
                            sets: 3,
                            rest: 60,
                            exercises: [
                                { name: "Mountain Climbers", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Jump Rope", trainingTime: DEFAULT_TRAINING_TIME },
                                { name: "Push-up to Knee Drive", trainingTime: DEFAULT_TRAINING_TIME }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const WORKOUT_KEY = "workoutData";
const loadData = () => {
    let workoutData;
    try {
        workoutData = JSON.parse(localStorage.getItem(WORKOUT_KEY));
        const exits = workoutData.plans[0] != undefined;
    } catch {
        localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutDataLegacy));
        workoutData = workoutDataLegacy;
    }
    return workoutData;
}
let workoutData = loadData();

const resetPlans = () => {
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutDataLegacy));
    workoutData = workoutDataLegacy;
}

const downloadData = (name, data) => {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${name}-${new Date().toISOString()}.json`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
}

const exportWorkoutData = () => {
    const data = JSON.stringify(workoutData, null, 2);
    downloadData("workout-data", data);
}

const exportPlan = (planName) => {
    const plan = workoutData.plans.find(
        p => p.name === planName
    );

    if (!plan) {
        return "Plan not found";
    }

    const exerciseNames = {};
    plan.days.forEach(day => {
        day.blocks.forEach(block => {
            block.exercises.forEach(exercise => {
                exerciseNames[exercise.name] = exercise.name;
            });
        });
    });

    const filteredExercises = workoutData.exercises.filter(exercise => exerciseNames[exercise.name]);
    const filteredData = {
        exercises: filteredExercises,
        plans: [plan],
    }

    const data = JSON.stringify(filteredData, null, 2);
    downloadData(planName, data);
    return true;
}

const importPlan = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("No file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const contents = e.target.result;
                const data = JSON.parse(contents);

                if (!Array.isArray(data.exercises) || !Array.isArray(data.plans)) {
                    alert("Invalid file.");
                    return;
                }

                data.exercises.forEach(newEx => {
                    if (!workoutData.exercises.some(ex => ex.name === newEx.name)) {
                        workoutData.exercises.push(newEx);
                    }
                });

                data.plans.forEach(newPlan => {
                    if (!workoutData.plans.some(plan => plan.name === newPlan.name)) {
                        workoutData.plans.push(newPlan);
                    }
                });

                localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
                alert("Plan imported successfully!")
            } catch (err) {
                alert("Error parsing JSON file: " + err.message);
            }
        };

        reader.onerror = function () {
            alert("Error reading the file.");
        };

        reader.readAsText(file);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    fileInput.remove();
};


const createPlan = (name, description) => {
    if (!name) {
        return "Plan name is required";
    }

    const planExists = workoutData.plans.some(plan => plan.name === name);
    if (planExists) {
        return `Plan ${name} already exists`;
    }

    workoutData.plans.push({
        name,
        description,
        days: []
    });
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
}

const deleteBlock = (planName, dayName, blockName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const blockIndex = day.blocks.findIndex(block => block.name === blockName);
    if (blockIndex === -1) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    day.blocks.splice(blockIndex, 1);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
}

const deletePlan = (name) => {
    const planIndex = workoutData.plans.findIndex(plan => plan.name === name);
    if (planIndex === -1) {
        return `Plan ${name} not found`;
    }

    workoutData.plans.splice(planIndex, 1);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
}

const createExercise = (name, description, tags, bodyParts) => {
    if (!name) {
        return "Exercise name is required";
    }

    const exerciseExists = workoutData.exercises.some(exercise => exercise.name === name);
    if (exerciseExists) {
        return `Exercise ${name} already exists`;
    }

    workoutData.exercises.push({
        name,
        description,
        tags,
        bodyParts
    });
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
}

const modifyExercise = (name, newDescription, newTags, newBodyParts) => {
    const exercise = workoutData.exercises.find(exercise => exercise.name === name);
    if (!exercise) {
        return `Exercise ${name} not found`;
    }

    exercise.description = newDescription;
    exercise.tags = newTags;
    exercise.bodyParts = newBodyParts;

    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const modifyExerciseTimer = (planName, dayName, blockName, exerciseName, newTrainingTime) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const block = day.blocks.find(block => block.name === blockName);
    if (!block) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    const exercise = block.exercises.find(exercise => exercise.name === exerciseName);
    if (!exercise) {
        return `Exercise ${exerciseName} not found in block ${blockName}`;
    }

    exercise.trainingTime = newTrainingTime;
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}


const addExerciseToPlan = (planName, dayName, blockName, exerciseName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const block = day.blocks.find(block => block.name === blockName);
    if (!block) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    block.exercises.push({ name: exerciseName, trainingTime: DEFAULT_TRAINING_TIME });
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const createBlock = (planName, dayName, blockName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const blockExists = day.blocks.some(block => block.name === blockName);
    if (blockExists) {
        return `Block ${blockName} already exists in day ${dayName}`;
    }

    day.blocks.push({
        name: blockName,
        sets: DEFAULT_SETS,
        rest: DEFAULT_REST_TIME,
        exercises: []
    });

    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const modifyBlockRepetitions = (planName, dayName, blockName, newSets) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const block = day.blocks.find(block => block.name === blockName);
    if (!block) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    block.sets = newSets;
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const createDay = (planName, dayName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const dayExists = plan.days.some(day => day.name === dayName);
    if (dayExists) {
        return `Day ${dayName} already exists in plan ${planName}`;
    }

    plan.days.push({
        name: dayName,
        blocks: []
    });

    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}
const deleteDay = (planName, dayName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const dayIndex = plan.days.findIndex(day => day.name === dayName);
    if (dayIndex === -1) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    plan.days.splice(dayIndex, 1);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const removeBlock = (planName, dayName, blockName) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const blockIndex = day.blocks.findIndex(block => block.name === blockName);
    if (blockIndex === -1) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    day.blocks.splice(blockIndex, 1);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

const removeExerciseFromBlock = (planName, dayName, blockName, exerciseIndex) => {
    const plan = workoutData.plans.find(plan => plan.name === planName);
    if (!plan) {
        return `Plan ${planName} not found`;
    }

    const day = plan.days.find(day => day.name === dayName);
    if (!day) {
        return `Day ${dayName} not found in plan ${planName}`;
    }

    const block = day.blocks.find(block => block.name === blockName);
    if (!block) {
        return `Block ${blockName} not found in day ${dayName}`;
    }

    const exercise = block.exercises[exerciseIndex];
    if (!exercise) {
        return `Exercise at index ${index} not found in block ${blockName}`;
    }

    block.exercises.splice(exerciseIndex, 1);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workoutData));
    return;
}

// Settings: 

const THEME = "theme";
const AUTO = "auto";

const getTheme = () => {
    const theme = localStorage.getItem(THEME) || "light";
    return theme;
}

const setTheme = (isDark) => {
    let theme = "light";
    if (isDark) {
        theme = "dark";
    }
    localStorage.setItem(THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
}

const useTheme = () => {
    const theme = localStorage.getItem(THEME) || "light";
    document.documentElement.setAttribute("data-theme", theme);
}

const getAuto = () => {
    const auto = localStorage.getItem(AUTO) || "";
    return auto;
}

const setAuto = (isAuto) => {
    let auto = "";
    if (isAuto) {
        auto = "auto";
    }
    localStorage.setItem(AUTO, auto);
}

const getAudioData = (type) => {
    const sound = localStorage.getItem(type) || DEFAULT_SOUND;
    const time = localStorage.getItem(`${type}_time`) || DEFAULT_SOUND_TIME;
    return { sound, time };
}

const saveAudioData = (type, values) => {
    localStorage.setItem(type, values.sound);
    localStorage.setItem(`${type}_time`, values.time);
}