// import { Cannon, Language, noctisLilac } from "/Users/raghav/Documents/projects/cannon/frontend/lib/main";
import { Cannon, Language, noctisLilac } from "cannon-codeeditor";
import "./App.css";
import BannerSvg from './assets/only-banner-transformed.svg';
import GreenDecoration from './assets/green-decoration.svg';
import RedDecoration from './assets/red-decoration.svg';
import GrayDecoration from './assets/gray-decoration.svg';
import BlueDecoration from './assets/blue-decoration.svg';
import Snowflake from './assets/snowflake.svg';
import CannonSvg from './assets/cannon.svg';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { FullState, saveState, defaultState } from "./state";
import { GithubCorner, Twitter } from "./Corners";

function WeekTooltips({
  state,
  onChange,
  disabledAfter,
}: {
  state: FullState;
  disabledAfter: number;
  onChange: (week: number, part: number) => void;
}) {
  const partNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap bg-[#e9e9ec] gap-8 p-4 text-center w-fit justify-center">
        {state.weekData.map((week, i) => {
          // If any part is incomplete, the week is incomplete.
          const isCompleted = !week.parts.some((part) => !part.completed);

          const isCurrent = i === state.currentWeek;
          const isDisabled = i > disabledAfter;

          // If it's disabled, its red. If it's the current week, it's blue. 
          // If it's completed, it's green. Colors are all christmassy. 
          // ho ho ho.
          // Start off as incomplete.
          let cssClass = "text-[#b54d3f]";
          let decoration = RedDecoration;
          if (isCurrent) {
            cssClass = "text-[#3f5b98]";
            decoration = BlueDecoration;
          } else if (isCompleted) {
            cssClass = "text-[#274331]";
            decoration = GreenDecoration;
          } else if (isDisabled) {
            // dark grey
            cssClass = "text-[#4a4a4a]";
            decoration = GrayDecoration;
          }


          return (
            <div
              className={`text-lg ${cssClass} flex flex-col items-center`}
              style={{
                fontFamily: 'Typewriter',
              }}
            >
              <button
                key={i}
                className="flex flex-col items-center"
                onClick={() => onChange(i, 0)}
                disabled={isDisabled}
              >
                <img src={decoration} className="w-10 h-10" />
                {week.tooltip}
              </button>
              {isCurrent && week.parts.length > 1 && <div className="flex flex-row gap-2">
                {week.parts.map((part, j) => {
                  const isCurrentPart = j === state.currentPart;
                  const isCompletedPart = part.completed;
                  let cssClass = "text-[#b54d3f]";
                  if (isCurrentPart) {
                    cssClass = "text-[#3f5b98]";
                  } else if (isCompletedPart) {
                    cssClass = "text-[#274331]";
                  }
                  return (
                    <button
                      className={`text-md ${cssClass}`}
                      key={j}
                      onClick={() => onChange(i, j)}
                      disabled={isDisabled}
                    >
                      {partNames[j]}
                    </button>
                  );
                }
                )}
              </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlyUrl({ flyUrl }: {
  flyUrl: string;
}) {
  return (
    <div className="flex flex-wrap justify-center items-center h-[70vh]">
      <iframe src={flyUrl} className="w-full h-[100%]"></iframe>
    </div>
  );
}

function ResetButton({
  onClick,
  flyUrl
}: {
  onClick: () => void;
  flyUrl?: string;
}) {
  // A button that resets the staet after asking for confirmation.
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (
    <div className="flex flex-wrap gap-5 justify-center align-middle text-center"
      style={{
        fontFamily: 'Typewriter',
      }}
    >
      {flyUrl && <div className="flex flex-col text-lg">
        <a href={flyUrl} target="_blank" rel="noreferrer">
          <img src={Snowflake} className="w-10 h-10 m-auto" />
          View Challenge
        </a>
      </div>
      }

      {!showConfirmation && <div className="flex flex-col text-lg">
        <button
          onClick={() => {
            if (showConfirmation) {
              onClick();
              setShowConfirmation(false);
            } else {
              setShowConfirmation(true);
            }
          }}
        >
          <img src={Snowflake} className="w-10 h-10 m-auto" />
          Reset
        </button>
      </div>
      }
      {showConfirmation && (
        <div className="flex flex-col">
          <img src={Snowflake} className="w-10 h-10 m-auto" />
          <p className="text-lg">
            Are you sure?
          </p>
          <div className="flex gap-3 flex-row justify-center items-center mt-1">
            <button
              className="text-[#b54d3f]"
              onClick={() => {
                setShowConfirmation(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-[#274331]"
              onClick={() => {
                onClick();
                setShowConfirmation(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>)

      }
    </div>
  );
}

const Banner = () => {
  return (
    <div className="bg-repeat-x h-[30vh] absolute top-0 w-full -z-10" style={{ backgroundImage: `url(${BannerSvg})` }} />
  );
};



export default function App({
  initialState,
}: {
  initialState: FullState;
}) {
  const [doc, setDoc] = useState<FullState>(initialState);
  const currentWeek = doc.currentWeek;
  const currentPart = doc.currentPart;
  const currentData = doc.weekData[currentWeek].parts[currentPart];

  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);

      }, 5000);
    }
  }, [showConfetti]);

  useEffect(() => {
    saveState(doc);
  }, [doc]);

  // Poor-man's deep copy since we don't want to keep re-rendering Cannon.
  const onReset = () => {
    setDoc(defaultState);
    // Reload page. This is a hack to get Cannon to reset.
    window.location.reload();
  }

  // const runnerUrl = 'https://cryingpotat0--cannon-runners-run-dev.modal.run';
  const runnerUrl = 'https://cryingpotat0--cannon-runners-run.modal.run';

  return (
    <div
    >
      <Banner />
      <div >
        <div className="text-center mt-10">
          <h1 className="text-5xl text-black p-4 "
            style={{
              fontFamily: 'Typewriter',
            }}
          >
            Advent of Distributed Systems
          </h1>
        </div>
        <WeekTooltips
          state={doc}
          onChange={(weekNum, partNum) => {
            setDoc((prevDoc: FullState) => {
              return {
                ...prevDoc,
                currentWeek: weekNum,
                currentPart: partNum,
              }
            })
          }}
          disabledAfter={7}
        />

        <GithubCorner />
        <Twitter />

        {showConfetti && <Confetti
          width={width}
          height={height}
          initialVelocityY={50}
          gravity={0.1}
          recycle={false}
          run={showConfetti}
          confettiSource={{ x: 0, y: 2 * height / 3, w: width, h: height / 2 }}
        />}
        <div className="p-5">
          <div className="flex flex-col md:flex-row md:gap-0 w-full">
            <div className="w-full md:w-1/2 h-[70vh] ">
              <Cannon
                // ... all your Cannon props
                languageProps={{
                  language: Language.MaelstromGo,
                  runnerUrl,
                  command: currentData.command.join(" && "),
                }}
                key={`${currentWeek}-${currentPart}`}
                initialFiles={currentData.currentCode}
                initialOutput={currentData.currentOutput}
                editorTheme={noctisLilac}
                viewerTheme={noctisLilac}
                onEditorUpdate={({ currentTab, update }) => {
                  setDoc(prevDoc => {
                    const copyOfDoc: FullState = { ...prevDoc };
                    copyOfDoc.weekData[currentWeek].parts[currentPart].currentCode[currentTab] = update.view.state.doc.toString();
                    return copyOfDoc;
                  });
                }}
                terminalConfig={{
                  onTerminalUpdate: ({ text }) => {
                    if (text.includes("Everything looks good!") && !currentData.completed) {
                      console.log("Completed week", currentWeek);

                      setDoc(prevDoc => {
                        const copyOfDoc: FullState = { ...prevDoc };
                        copyOfDoc.weekData[currentWeek].parts[currentPart].completed = true;
                        copyOfDoc.weekData[currentWeek].parts[currentPart].currentOutput = text;
                        return copyOfDoc;
                      });

                      setShowConfetti(true);
                    } else if (!text.includes("Everything looks good!") && currentData.completed) {
                      console.log("Not completed week", currentWeek);
                      setDoc(prevDoc => {
                        const copyOfDoc: FullState = { ...prevDoc };
                        copyOfDoc.weekData[currentWeek].parts[currentPart].completed = false;
                        copyOfDoc.weekData[currentWeek].parts[currentPart].currentOutput = text;
                        return copyOfDoc;
                      });
                    }
                  }
                }}
              />
            </div>

            <div className="block md:w-1/2">
              <FlyUrl flyUrl={currentData.flyUrl} />
            </div>
          </div>
        </div>

        <div >
          <ResetButton onClick={onReset} />
        </div>


        <div className="flex flex-wrap justify-center items-center text-center text-black m-5"
          style={{
            fontFamily: 'Typewriter',
          }}
        >
          Built with <img src={CannonSvg} className="w-10 h-10 m-0" /><a className="ml-1 inline items-center hover:text-[#b54d3f]" href="https://cannon.cryingpotato.com" target="_blank">Cannon </a>
        </div>
      </div>
    </div >
  )
}
