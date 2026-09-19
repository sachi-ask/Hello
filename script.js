// The ten missions. Edit the text or add your own.
const MISSIONS = [
  {
    title: "Make your first edit",
    steps: [
      "Open index.html in your repo on github.com.",
      "Tap the pencil icon.",
      "Change the text in the footer to your real name.",
      "Tap Commit changes."
    ]
  },
  {
    title: "Write a clear commit message",
    steps: [
      "When you commit, describe what changed in a short sentence.",
      "Good: \"Add my name to the footer\". Not so good: \"update\".",
      "Try it on your next edit."
    ]
  },
  {
    title: "Add a journal entry",
    steps: [
      "Open entries.js and tap the pencil.",
      "Copy the example line and change the date and note.",
      "Commit, then reload your site to see it."
    ]
  },
  {
    title: "Turn on GitHub Pages",
    steps: [
      "Go to Settings, then Pages.",
      "Choose the main branch and the root folder, then Save.",
      "Open your live link after a minute or two."
    ]
  },
  {
    title: "Create a branch",
    steps: [
      "On the repo page, tap the branch button (it says main).",
      "Type a new name such as add-styles and create it.",
      "Edit a file on this branch. Your main branch stays safe."
    ]
  },
  {
    title: "Open a pull request",
    steps: [
      "After committing on your branch, tap Compare & pull request.",
      "Write a title that says what you changed.",
      "Tap Create pull request."
    ]
  },
  {
    title: "Merge the pull request",
    steps: [
      "Open your pull request and read the changes.",
      "Tap Merge pull request, then Confirm merge.",
      "Delete the branch when GitHub offers."
    ]
  },
  {
    title: "Create an issue",
    steps: [
      "Open the Issues tab and tap New issue.",
      "Write one idea to improve this site, such as \"Add a dark theme\".",
      "Later, close it when you finish the idea."
    ]
  },
  {
    title: "Fork someone else's repo",
    steps: [
      "Find any public project you like.",
      "Tap Fork to copy it to your account.",
      "Change one small thing in your copy."
    ]
  },
  {
    title: "Clone a repo to your computer",
    steps: [
      "Install Git on a computer.",
      "Run: git clone https://github.com/your-username/your-repo.git",
      "Edit, then run: git add . and git commit -m \"message\" and git push."
    ]
  }
];

const STORAGE_KEY = "github-learning-progress";

function loadDone() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveDone(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    // Progress just won't be remembered if storage is blocked.
  }
}

let done = loadDone();

function renderMissions() {
  const list = document.getElementById("missions");
  list.innerHTML = "";
  const nextIndex = MISSIONS.findIndex((_, i) => !done.includes(i));

  MISSIONS.forEach((mission, i) => {
    const isDone = done.includes(i);
    const li = document.createElement("li");
    li.className = "mission" + (isDone ? " done" : "") + (i === nextIndex ? " next" : "");

    const node = document.createElement("button");
    node.className = "node";
    node.type = "button";
    node.textContent = isDone ? "✓" : i + 1;
    node.setAttribute("aria-pressed", isDone);
    node.setAttribute("aria-label", "Mission " + (i + 1) + ": " + mission.title + (isDone ? ", done" : ", not done"));
    node.addEventListener("click", () => toggle(i));

    const details = document.createElement("details");
    if (i === nextIndex) details.open = true;
    const summary = document.createElement("summary");
    summary.textContent = mission.title;
    const steps = document.createElement("ol");
    mission.steps.forEach((s) => {
      const step = document.createElement("li");
      step.textContent = s;
      steps.appendChild(step);
    });
    details.append(summary, steps);

    li.append(node, details);
    list.appendChild(li);
  });

  updateProgress();
}

function toggle(i) {
  done = done.includes(i) ? done.filter((n) => n !== i) : [...done, i];
  saveDone(done);
  renderMissions();
}

function updateProgress() {
  const total = MISSIONS.length;
  const count = done.length;
  document.getElementById("progress-fill").style.width = (count / total) * 100 + "%";
  document.getElementById("progress").setAttribute("aria-valuenow", count);
  document.getElementById("progress-text").textContent =
    count === total ? "All " + total + " done. You know GitHub basics." : count + " of " + total + " done";
}

function renderEntries() {
  const list = document.getElementById("entries");
  if (typeof ENTRIES === "undefined" || ENTRIES.length === 0) {
    list.innerHTML = "<li><span></span><span>No entries yet. Add one in entries.js.</span></li>";
    return;
  }
  ENTRIES.forEach((entry) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = entry.date;
    time.setAttribute("datetime", entry.date);
    const note = document.createElement("span");
    note.textContent = entry.note;
    li.append(time, note);
    list.appendChild(li);
  });
}

renderMissions();
renderEntries();
    
