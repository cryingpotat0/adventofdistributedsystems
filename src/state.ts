// import { Language, getTemplate } from "/Users/raghav/Documents/projects/cannon/frontend/lib/main";
import { Language, getTemplate } from "cannon-codeeditor";

export type WeekData = {
  completed: boolean;
  currentCode: Record<string, string>;
  currentOutput: string;
  flyUrl: string;
  command: string[];
}

export type WeekNumber = 0 | 1 | 2 | 3 | 4 | 5;

export type FullState = {
  currentWeek: WeekNumber;
  0: WeekData;
  1: WeekData;
  2: WeekData;
  3: WeekData;
  4: WeekData;
  5: WeekData;
}

const { initialFiles, initialOutput } = getTemplate(Language.MaelstromGo);
const initialFilesWithoutCode = JSON.parse(JSON.stringify(initialFiles));
initialFilesWithoutCode["main.go"] = "";

export const defaultState: FullState = {
  currentWeek: 0,
  0: {
    completed: false,
    currentCode: initialFiles,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/1/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w echo --bin ~/go/bin/main --node-count 1 --time-limit 10"
    ]
  },
  1: {
    completed: false,
    currentCode: initialFilesWithoutCode,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/2/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w unique-ids --bin ~/go/bin/main --time-limit 10 --rate 1000 --node-count 3 --availability total --nemesis partition"
    ]
  },
  2: {
    completed: false,
    currentCode: initialFilesWithoutCode,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/3a/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w broadcast --bin ~/go/bin/main  --node-count 1 --time-limit 20 --rate 10"
    ]
  },
  3: {
    completed: false,
    currentCode: initialFilesWithoutCode,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/4/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w g-counter --bin ~/go/bin/main --node-count 3 --rate 100 --time-limit 20 --nemesis partition"
    ]
  },
  4: {
    completed: false,
    currentCode: initialFilesWithoutCode,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/5a/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w kafka --bin ~/go/bin/main --node-count 1 --concurrency 2n --time-limit 20 --rate 1000"
    ]
  },
  5: {
    completed: false,
    currentCode: initialFilesWithoutCode,
    currentOutput: initialOutput || "",
    flyUrl: "https://fly.io/dist-sys/6a/",
    command: [
      "go mod tidy",
      "go install",
      "/maelstrom/maelstrom test -w txn-rw-register --bin ~/go/bin/main --node-count 1 --time-limit 20 --rate 1000 --concurrency 2n --consistency-models read-uncommitted --availability total"
    ]
  }
}

export function getInitialState(): FullState {
  const state = localStorage.getItem("state");
  if (state) {
    return JSON.parse(state);
  }
  return defaultState;
}

export function saveState(state: FullState) {
  localStorage.setItem("state", JSON.stringify(state));
}


