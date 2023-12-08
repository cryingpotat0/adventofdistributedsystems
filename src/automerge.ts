import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { Language, getTemplate } from "/Users/raghav/Documents/projects/cannon/frontend/lib/main";

export type WeekData = {
  completed: boolean;
  current: boolean;
  currentCode: Record<string, string>;
  currentOutput: string;
  flyUrl: string;
}

export type FullState = {
  currentWeek: 0 | 1 | 2 | 3 | 4;
  0: WeekData;
  1: WeekData;
  2: WeekData;
  3: WeekData;
  4: WeekData;
}

function getDefaultWeekData({
  flyUrl, completed, current
}: {
  flyUrl: string, completed: boolean, current?: boolean
}): WeekData {
  const { initialFiles, initialOutput } = getTemplate(Language.MaelstromGo);
  return {
    current: current || false,
    completed,
    currentCode: initialFiles,
    currentOutput: initialOutput || "",
    flyUrl,
  }
}


export const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
})
const rootDocUrl = `${document.location.hash.substr(1)}`

export let handle: DocHandle<FullState>;
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl)
} else {
  handle = repo.create<FullState>()
  handle.change(d => {
    d.currentWeek = 0;
    d[0] = getDefaultWeekData({ flyUrl: "https://fly.io/dist-sys/1/", completed: false });
    d[1] = getDefaultWeekData({ flyUrl: "https://fly.io/dist-sys/2/", completed: false });
    d[2] = getDefaultWeekData({ flyUrl: "https://fly.io/dist-sys/3/", completed: false });
    d[3] = getDefaultWeekData({ flyUrl: "https://fly.io/dist-sys/4/", completed: false });
    d[4] = getDefaultWeekData({ flyUrl: "https://fly.io/dist-sys/5/", completed: false });
  });
}
export const docUrl = document.location.hash = handle.url;

// @ts-ignore
window.handle = handle // we'll use this later for experimentation
