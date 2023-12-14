// import { Language, getTemplate } from "/Users/raghav/Documents/projects/cannon/frontend/lib/main";
import { Language, getTemplate } from "cannon-codeeditor";


type FullStateV1 = {
  version: 1,
  currentWeek: number;
  currentPart: number;
  weekData: {
    tooltip: string;
    parts: {
      completed: boolean;
      currentCode: Record<string, string>;
      currentOutput: string;
      flyUrl: string;
      command: string[];
    }[];
  }[];
}


// START V0 STATE
type WeekNumber = 0 | 1 | 2 | 3 | 4 | 5;
type WeekDataV0 = {
  completed: boolean;
  currentCode: Record<string, string>;
  currentOutput: string;
  flyUrl: string;
  command: string[];
}

type FullStateV0 = {
  currentWeek: WeekNumber;
  0: WeekDataV0;
  1: WeekDataV0;
  2: WeekDataV0;
  3: WeekDataV0;
  4: WeekDataV0;
  5: WeekDataV0;
}

// END V0 STATE

const { initialFiles, initialOutput } = getTemplate(Language.MaelstromGo);
const initialFilesWithoutCode = JSON.parse(JSON.stringify(initialFiles));
initialFilesWithoutCode["main.go"] = "";

export const defaultStateV1: FullState = {
  version: 1,
  currentWeek: 0,
  currentPart: 0,
  weekData: [{
    tooltip: "Week 0",
    parts: [
      {
        completed: false,
        currentCode: initialFiles,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/1/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w echo --bin ~/go/bin/main --node-count 1 --time-limit 10"
        ]
      }
    ]
  },
  {
    tooltip: "Week 1",
    parts: [
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/2/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w unique-ids --bin ~/go/bin/main --time-limit 10 --rate 1000 --node-count 3 --availability total --nemesis partition"
        ]
      }
    ]
  },
  {
    tooltip: "Week 2",
    parts: [
      {
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
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/3b/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w broadcast --bin ~/go/bin/main --node-count 5 --time-limit 20 --rate 10"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/3c/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w broadcast --bin ~/go/bin/main --node-count 5 --time-limit 20 --rate 10 --nemesis partition"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/3d/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w broadcast --bin ~/go/bin/main --node-count 25 --time-limit 20 --rate 100 --latency 100"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/3e/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w broadcast --bin ~/go/bin/main --node-count 25 --time-limit 20 --rate 100 --latency 100"
        ]
      }
    ]
  },
  {
    tooltip: "Week 3",
    parts: [
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/4/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w g-counter --bin ~/go/bin/main --node-count 3 --rate 100 --time-limit 20 --nemesis partition"
        ]
      }
    ]
  },
  {
    tooltip: "Week 4",
    parts: [
      {
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
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/5b/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w kafka --bin ~/go/bin/main --node-count 2 --concurrency 2n --time-limit 20 --rate 1000"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/5c/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w kafka --bin ~/go/bin/main --node-count 2 --concurrency 2n --time-limit 20 --rate 1000"
        ]
      }
    ]
  },
  {
    tooltip: "Week 5",
    parts: [
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/6a/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w txn-rw-register --bin ~/go/bin/main --node-count 1 --time-limit 20 --rate 1000 --concurrency 2n --consistency-models read-uncommitted --availability total"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/6b/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w txn-rw-register --bin ~/go/bin/main --node-count 2 --concurrency 2n --time-limit 20 --rate 1000 --consistency-models read-uncommitted --availability total --nemesis partition"
        ]
      },
      {
        completed: false,
        currentCode: initialFilesWithoutCode,
        currentOutput: initialOutput || "",
        flyUrl: "https://fly.io/dist-sys/6c/",
        command: [
          "go mod tidy",
          "go install",
          "/maelstrom/maelstrom test -w txn-rw-register --bin ~/go/bin/main --node-count 2 --concurrency 2n --time-limit 20 --rate 1000 --consistency-models read-committed --availability total –-nemesis partition"
        ]
      }
    ]
  }]
}

export function getInitialState(): FullState {
  const state = localStorage.getItem("state");
  if (state) {
    return migrate(JSON.parse(state));
  }
  return defaultState;
}

export function saveState(state: FullState) {
  localStorage.setItem("state", JSON.stringify(state));
}

const migrate = (state: FullStateV0 | FullStateV1): FullStateV1 => {
  // @ts-ignore
  if (!state['version']) {
    // First store the old state for safety.
    localStorage.setItem("state-v0", JSON.stringify(state));
    // We are in v0.
    return migrateV0ToV1(state as FullStateV0);
  }
  return state as FullStateV1;
}

const migrateV0ToV1 = (state: FullStateV0): FullStateV1 => {
  const newState: FullStateV1 = JSON.parse(JSON.stringify(defaultStateV1));
  // For each week, assign parts[0] to the old week data.
  for (let i = 0; i < 6; i++) {
    const currentState: WeekDataV0 = JSON.parse(JSON.stringify(state[i as WeekNumber]));
    newState.weekData[i].parts[0] = {
      ...currentState,
    }
  }
  newState.currentWeek = state.currentWeek;

  // the reference. oh my fucking god. why does the console log retain the reference. god.
  // console.log(newState.weekData[0].parts[0]);
  // console.log(newState.weekData[0].parts);
  // console.log(newState.weekData[0]);
  // console.log(newState.weekData[0].parts[0]);
  // console.log(newState);
  return newState;
}

export type FullState = FullStateV1;
export const defaultState: FullState = defaultStateV1;
