import { Cannon, Language, ayuLight, noctisLilac } from "/Users/raghav/Documents/projects/cannon/frontend/lib/main";
import "./App.css";
import { AutomergeUrl } from '@automerge/automerge-repo'
import { useDocument } from '@automerge/automerge-repo-react-hooks'
import { FullState, WeekData } from "./automerge";

function WeekTooltips({
  completedWeeks = [0],
  currentWeek = 2,
  onWeekChange,
  disabledWeeks = [3, 4]
}: {
  completedWeeks?: number[];
  currentWeek?: number;
  disabledWeeks?: number[];
  onWeekChange?: (week: number) => void;
}) {
  const weeks: Array<0 | 1 | 2 | 3 | 4> = [0, 1, 2, 3, 4];
  const weekTooltips = [
    "Week 0",
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4"
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4 text-center ">
      {weeks.map((week) => {
        const isCompleted = completedWeeks.includes(week);
        const isCurrent = currentWeek === week;
        const isDisabled = disabledWeeks.includes(week);

        // If it's disabled, its red. If it's the current week, it's blue. 
        // If it's completed, it's green. Colors are all christmassy. 
        // ho ho ho.

        let cssForTooltip;
        if (isDisabled) {
          cssForTooltip = "bg-[#A9A9A9] ";
        } else if (isCurrent) {
          cssForTooltip = "bg-[#FFA500] ";
        } else if (isCompleted) {
          cssForTooltip = "bg-[#45B649] cursor-pointer";
        } else {
          cssForTooltip = "bg-[#FFD700] cursor-pointer";
        }

        return (
          <button
            key={week}
            className={`${cssForTooltip} py-2 px-4 rounded-full`}
            onClick={() => onWeekChange?.(week)}
            disabled={isDisabled}
          >
            {weekTooltips[week]}
          </button>
        );
      })}
    </div>
  );
}

function FlyUrl({
  flyUrl
}: {
  flyUrl: string;
}) {
  return (
    <div className="flex flex-wrap justify-center items-center text-center">
      <a href={flyUrl} target="_blank" rel="noreferrer">
        <span className="bg-[#FFD700] cursor-pointer py-2 px-4 rounded-full">
          View Challenge
        </span>
      </a>
    </div>
  );
}



export default function App({
  docUrl,
  initialFiles,
  initialOutput
}: {
  docUrl: AutomergeUrl;
  initialFiles: Record<string, string>;
  initialOutput: string;
}) {

  const [doc, changeDoc] = useDocument<FullState>(docUrl);
  if (!doc) {
    return <div>Loading...</div>
  }

  const currentWeek = doc.currentWeek;
  const currentWeekData = doc[doc.currentWeek];
  const allWeeks = [doc[0], doc[1], doc[2], doc[3], doc[4]];
  const completedWeeks = allWeeks.map((week, index): [WeekData, number] => [week, index]).filter(([week, _]) => {
    return week.completed;
  }).map(([_, index]) => index);

  // Poor-man's deep copy since we don't want to keep re-rendering Cannon.
  const disabledWeeks = [3, 4];

  return (
    <div
      className="bg-[] bg-cover bg-center w-screen h-screen"
    >
      <div >
        <div className="text-center">
          <h1 className="text-white text-5xl border-white text-extrabold p-4 "
            style={{
              fontFamily: 'Fira Code',
              background: 'linear-gradient(to right, #9ED0E6, #B796AC)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '-2px', /* Adjust the gap size */
            }}
          >
            Advent of Distributed Systems
          </h1>
        </div>
        <WeekTooltips
          completedWeeks={completedWeeks}
          currentWeek={currentWeek}
          onWeekChange={(week) => {
            changeDoc((d) => {
              // @ts-ignore
              d.currentWeek = week;
            })
          }}
          disabledWeeks={disabledWeeks}
        />
        <FlyUrl flyUrl={currentWeekData.flyUrl} />
        <div className="p-5 w-screen items-center justify-center">
          <div className="w-full h-[50vh]">
            <Cannon
              languageProps={{
                language: Language.MaelstromGo
              }}
              initialFiles={initialFiles}
              initialOutput={initialOutput}
              editorTheme={noctisLilac}
              viewerTheme={ayuLight}
              onEditorUpdate={({ currentTab, update }) => {
                changeDoc((d) => {
                  const copyOfCurrentWeekData: WeekData = JSON.parse(JSON.stringify(currentWeekData));
                  copyOfCurrentWeekData.currentCode[currentTab] = update.view.state.doc.toString();
                  console.log(copyOfCurrentWeekData);
                  d[currentWeek] = copyOfCurrentWeekData;
                })
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center text-center text-black">
          Built with <a className="ml-1 inline items-center text-blue-50 gap-3" href="https://cannon.cryingpotato.com" target="_blank"> Cannon </a>
        </div>
      </div>
    </div >
  )
}
