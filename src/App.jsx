import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShieldCheck } from "lucide-react";
import { questions, quizMeta, radarAxes, resultBands } from "./quizConfig";
import "./styles.css";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function polarPoint(center, radius, index, total, valuePercent = 100) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
  const length = radius * (valuePercent / 100);

  return {
    x: center + Math.cos(angle) * length,
    y: center + Math.sin(angle) * length
  };
}

function pointsToString(points) {
  return points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function buildScores(answers) {
  const rawScores = Object.fromEntries(radarAxes.map((axis) => [axis.id, 0]));
  const maxScores = Object.fromEntries(radarAxes.map((axis) => [axis.id, 0]));

  questions.forEach((question) => {
    const perAxisMax = {};

    question.options.forEach((option) => {
      Object.entries(option.scores).forEach(([axisId, score]) => {
        perAxisMax[axisId] = Math.max(perAxisMax[axisId] || 0, score);
      });
    });

    Object.entries(perAxisMax).forEach(([axisId, score]) => {
      maxScores[axisId] += score;
    });
  });

  Object.values(answers).forEach((option) => {
    Object.entries(option.scores).forEach(([axisId, score]) => {
      rawScores[axisId] += score;
    });
  });

  return radarAxes.map((axis) => {
    const max = maxScores[axis.id] || 1;
    const value = clamp(Math.round((rawScores[axis.id] / max) * 100), 0, 100);

    return {
      ...axis,
      value,
      raw: rawScores[axis.id],
      band: resultBands.find((band) => value >= band.min)
    };
  });
}

function App() {
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selected = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const scores = useMemo(() => buildScores(answers), [answers]);
  const topScores = [...scores].sort((a, b) => b.value - a.value).slice(0, 3);

  function chooseOption(option) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: option
    }));

    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }

    window.setTimeout(() => {
      setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
    }, 180);
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goNext() {
    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }

  function restart() {
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
  }

  return (
    <main className="appShell">
      <section className="workspace">
        <aside className="introPanel" aria-label="测试说明">
          <div className="brandMark">
            <ShieldCheck size={20} aria-hidden="true" />
          </div>
          <p className="eyebrow">{quizMeta.subtitle}</p>
          <h1>{quizMeta.name}</h1>
          <p className="introText">{quizMeta.description}</p>

          <div className="noticeBox">
            <Check size={18} aria-hidden="true" />
            <span>{quizMeta.notice}</span>
          </div>

          <div className="axisList">
            {radarAxes.map((axis) => (
              <span key={axis.id}>{axis.label}</span>
            ))}
          </div>
        </aside>

        <section className="quizPanel" aria-live="polite">
          {!isAdultConfirmed ? (
            <AgeGate onConfirm={() => setIsAdultConfirmed(true)} />
          ) : !showResult ? (
            <QuizView
              currentIndex={currentIndex}
              currentQuestion={currentQuestion}
              progress={progress}
              selected={selected}
              chooseOption={chooseOption}
              goBack={goBack}
              goNext={goNext}
            />
          ) : (
            <ResultView scores={scores} topScores={topScores} restart={restart} />
          )}
        </section>
      </section>
    </main>
  );
}

function AgeGate({ onConfirm }) {
  return (
    <div className="ageGate">
      <p className="eyebrow">进入前确认</p>
      <h2>该测试只面向成年人</h2>
      <p>
        页面内容围绕成年人的亲密偏好和边界沟通展开。继续前，请确认你已达到所在地法定成年年龄。
      </p>
      <button className="textButton" type="button" onClick={onConfirm}>
        我已成年，开始测试
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

function QuizView({
  currentIndex,
  currentQuestion,
  progress,
  selected,
  chooseOption,
  goBack,
  goNext
}) {
  return (
    <>
      <div className="quizTopline">
        <span>
          第 {currentIndex + 1} 题 / 共 {questions.length} 题
        </span>
        <strong>{progress}%</strong>
      </div>
      <div className="progressTrack" aria-label={`已完成 ${progress}%`}>
        <div className="progressFill" style={{ width: `${progress}%` }} />
      </div>

      <div className="questionBlock">
        <p className="questionIndex">Q{currentQuestion.id}</p>
        <h2>{currentQuestion.text}</h2>
      </div>

      <div className="optionGrid">
        {currentQuestion.options.map((option) => {
          const isSelected = selected?.label === option.label;
          return (
            <button
              className={`optionButton ${isSelected ? "selected" : ""}`}
              key={option.label}
              type="button"
              onClick={() => chooseOption(option)}
            >
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="quizActions">
        <button
          className="iconButton"
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
          aria-label="上一题"
          title="上一题"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button className="textButton" type="button" onClick={goNext} disabled={!selected}>
          {currentIndex === questions.length - 1 ? "查看结果" : "下一题"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

function ResultView({ scores, topScores, restart }) {
  return (
    <div className="resultView">
      <div className="resultHeader">
        <div>
          <p className="eyebrow">你的雷达图</p>
          <h2>偏好分布结果</h2>
        </div>
        <button className="iconButton" type="button" onClick={restart} aria-label="重新测试" title="重新测试">
          <RotateCcw size={19} aria-hidden="true" />
        </button>
      </div>

      <RadarChart scores={scores} />

      <div className="legend">
        <span>
          <i className="scoreDot" />
          得分
        </span>
        <span>
          <i className="standardDot" />
          标准分
        </span>
      </div>

      <div className="summaryPanel">
        <strong>最突出的维度</strong>
        <div className="topScoreGrid">
          {topScores.map((score) => (
            <div className="topScoreCard" key={score.id}>
              <span>{score.label}</span>
              <strong>{score.value}</strong>
              <p>{score.band.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadarChart({ scores }) {
  const center = 240;
  const radius = 150;
  const rings = [20, 40, 60, 80, 100];
  const standardPoints = radarAxes.map((_, index) =>
    polarPoint(center, radius, index, radarAxes.length, quizMeta.scoreRange.standard)
  );
  const scorePoints = scores.map((score, index) =>
    polarPoint(center, radius, index, scores.length, score.value)
  );

  return (
    <div className="radarWrap">
      <svg className="radarChart" viewBox="0 0 480 480" role="img" aria-label="测试结果雷达图">
        {rings.map((ring) => {
          const points = radarAxes.map((_, index) =>
            polarPoint(center, radius, index, radarAxes.length, ring)
          );
          return (
            <polygon
              className="radarRing"
              key={ring}
              points={pointsToString(points)}
            />
          );
        })}

        {radarAxes.map((axis, index) => {
          const end = polarPoint(center, radius, index, radarAxes.length);
          const label = polarPoint(center, radius + 42, index, radarAxes.length);
          return (
            <g key={axis.id}>
              <line className="radarAxis" x1={center} y1={center} x2={end.x} y2={end.y} />
              <text
                className="radarLabel"
                x={label.x}
                y={label.y}
                textAnchor={label.x < center - 8 ? "end" : label.x > center + 8 ? "start" : "middle"}
                dominantBaseline="middle"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        <polygon className="standardShape" points={pointsToString(standardPoints)} />
        <polygon className="scoreShape" points={pointsToString(scorePoints)} />
        <polyline className="scoreLine" points={`${pointsToString(scorePoints)} ${scorePoints[0].x.toFixed(2)},${scorePoints[0].y.toFixed(2)}`} />

        {scorePoints.map((point, index) => (
          <circle className="scorePoint" key={scores[index].id} cx={point.x} cy={point.y} r="5" />
        ))}
        <circle className="centerPoint" cx={center} cy={center} r="6" />
      </svg>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
