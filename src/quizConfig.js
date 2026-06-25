export const quizMeta = {
  name: "性癖倾向问卷",
  subtitle: "成年人自愿参与",
  description:
    "这是一份面向成年人的性癖倾向自评问卷，用来观察你对不同成人向情境、互动方式和幻想主题的接受度。结果仅用于娱乐和自我了解。",
  notice:
    "请确认你已成年。问卷默认所有情境都发生在成年人、自愿、知情同意、尊重隐私的前提下。",
  scoreRange: {
    min: 0,
    max: 100,
    standard: 50
  }
};

export const radarAxes = [
  { id: "romance", label: "恋爱感" },
  { id: "dirtyTalk", label: "语言挑逗" },
  { id: "novelty", label: "新鲜探索" },
  { id: "visual", label: "视觉展示" },
  { id: "roleplay", label: "角色扮演" },
  { id: "dominance", label: "支配欲" },
  { id: "submission", label: "臣服欲" },
  { id: "impact", label: "强刺激" },
  { id: "bondage", label: "束缚感" },
  { id: "voyeur", label: "观看欲" },
  { id: "group", label: "多人幻想" },
  { id: "risk", label: "冒险感" }
];

export const questions = [
  {
    id: 1,
    text: "你对一方明显主导、另一方配合的性爱模式感兴趣吗？",
    options: [
      { label: "完全不感兴趣", scores: { romance: 10 } },
      { label: "比较保守，只能接受很轻微的主导感", scores: { dominance: 8, submission: 6 } },
      { label: "可以接受，适当的主导/被主导会增加感觉", scores: { dominance: 16, submission: 14 } },
      { label: "非常愿意，明确的权力感会让我更兴奋", scores: { dominance: 30, submission: 24, dirtyTalk: 10 } }
    ]
  },
  {
    id: 2,
    text: "你对露骨语言、命令式表达或直接挑逗感兴趣吗？",
    options: [
      { label: "完全不感兴趣，更喜欢含蓄表达", scores: { romance: 12 } },
      { label: "比较保守，偶尔可以接受一点", scores: { dirtyTalk: 8 } },
      { label: "可以接受，氛围合适时会加分", scores: { dirtyTalk: 18, visual: 6 } },
      { label: "非常愿意，语言刺激对我很重要", scores: { dirtyTalk: 32, visual: 12, dominance: 8 } }
    ]
  },
  {
    id: 3,
    text: "你对角色扮演、剧情设定或身份反差感兴趣吗？",
    options: [
      { label: "完全不感兴趣，真实自然最好", scores: { romance: 12 } },
      { label: "比较保守，只接受轻度设定", scores: { roleplay: 8, novelty: 6 } },
      { label: "可以接受，有剧情会更有代入感", scores: { roleplay: 18, novelty: 12 } },
      { label: "非常愿意，角色和剧情本身很吸引我", scores: { roleplay: 34, novelty: 18, dirtyTalk: 8 } }
    ]
  },
  {
    id: 4,
    text: "你对成人玩具、辅助道具或特殊用品感兴趣吗？",
    options: [
      { label: "完全不感兴趣", scores: { romance: 8 } },
      { label: "比较保守，需要慢慢尝试", scores: { novelty: 8 } },
      { label: "可以接受，觉得能增加变化", scores: { novelty: 18, visual: 6 } },
      { label: "非常愿意，道具会明显增加乐趣", scores: { novelty: 32, visual: 12, impact: 8 } }
    ]
  },
  {
    id: 5,
    text: "你对轻微疼痛、拍打、压迫感等强刺激感兴趣吗？",
    options: [
      { label: "完全不感兴趣，温柔舒适更重要", scores: { romance: 12 } },
      { label: "比较保守，只能接受很轻微的刺激", scores: { impact: 8 } },
      { label: "可以接受，适度强刺激会更投入", scores: { impact: 20, submission: 8 } },
      { label: "非常愿意，强刺激是很重要的兴奋点", scores: { impact: 36, submission: 12, dominance: 8 } }
    ]
  },
  {
    id: 6,
    text: "你对被限制行动、固定姿势或轻度束缚感兴趣吗？",
    options: [
      { label: "完全不感兴趣", scores: { romance: 8 } },
      { label: "比较保守，只能接受非常轻度的限制", scores: { bondage: 8 } },
      { label: "可以接受，受限感会带来一些刺激", scores: { bondage: 20, submission: 12 } },
      { label: "非常愿意，束缚或限制感本身很吸引我", scores: { bondage: 36, submission: 20, impact: 8 } }
    ]
  },
  {
    id: 7,
    text: "你对身体展示、私密影像或被欣赏身体感兴趣吗？",
    options: [
      { label: "完全不感兴趣", scores: { romance: 8 } },
      { label: "比较保守，只能接受很私密的展示", scores: { visual: 8 } },
      { label: "可以接受，被欣赏会带来吸引力", scores: { visual: 20, dirtyTalk: 8 } },
      { label: "非常愿意，视觉展示会明显增强兴奋感", scores: { visual: 36, dirtyTalk: 12, novelty: 8 } }
    ]
  },
  {
    id: 8,
    text: "你对观看成人内容、旁观视角或被观看幻想感兴趣吗？",
    options: [
      { label: "完全不感兴趣，更重视现实亲密", scores: { romance: 12 } },
      { label: "比较保守，只作为偶尔的氛围辅助", scores: { voyeur: 8, visual: 6 } },
      { label: "可以接受，观看或想象会增加欲望", scores: { voyeur: 20, visual: 14 } },
      { label: "非常愿意，观看感或被观看感很有吸引力", scores: { voyeur: 36, visual: 20, risk: 8 } }
    ]
  },
  {
    id: 9,
    text: "你对多人性幻想或非一对一场景感兴趣吗？",
    options: [
      { label: "完全不感兴趣，只偏好一对一", scores: { romance: 14 } },
      { label: "比较保守，只能停留在幻想层面", scores: { group: 8 } },
      { label: "可以接受，把它作为幻想或讨论对象", scores: { group: 20, novelty: 8 } },
      { label: "非常愿意，在合适条件下会想探索", scores: { group: 36, novelty: 14, risk: 12 } }
    ]
  },
  {
    id: 10,
    text: "如果遇到一个性契合度很高的人，你会愿意发生关系吗？",
    options: [
      { label: "完全不愿意，必须先有稳定关系", scores: { romance: 18 } },
      { label: "比较保守，需要足够了解和信任", scores: { romance: 10, risk: 4 } },
      { label: "可以接受，如果安全且彼此有吸引力", scores: { novelty: 18, risk: 10, dirtyTalk: 6 } },
      { label: "非常愿意，性契合本身对我吸引力很强", scores: { novelty: 32, risk: 18, dirtyTalk: 10 } }
    ]
  },
  {
    id: 11,
    text: "如果你已有伴侣，且关系规则允许，你对与他人发生性关系感兴趣吗？",
    options: [
      { label: "完全不感兴趣，我更偏好排他关系", scores: { romance: 18 } },
      { label: "比较保守，即使允许也会犹豫", scores: { group: 6, risk: 4 } },
      { label: "可以接受，但更看重规则和透明度", scores: { group: 18, risk: 10 } },
      { label: "非常愿意，开放式探索对我有吸引力", scores: { group: 34, novelty: 12, risk: 16 } }
    ]
  },
  {
    id: 12,
    text: "你对性爱姿势或互动方式的变化感兴趣吗？",
    options: [
      { label: "完全不感兴趣，稳定舒适最好", scores: { romance: 12 } },
      { label: "比较保守，只接受少量变化", scores: { novelty: 8 } },
      { label: "可以接受，变化会让体验更有趣", scores: { novelty: 20, visual: 8 } },
      { label: "非常愿意，变化多和节奏强很重要", scores: { novelty: 34, impact: 12, visual: 12 } }
    ]
  },
  {
    id: 13,
    text: "如果伴侣提出一个你没尝试过的性癖或玩法，你会感兴趣吗？",
    options: [
      { label: "完全不感兴趣，不太想尝试未知玩法", scores: { romance: 10 } },
      { label: "比较保守，需要很久才会考虑", scores: { novelty: 8 } },
      { label: "可以接受，愿意在舒服范围内试试", scores: { novelty: 20, risk: 8 } },
      { label: "非常愿意，新玩法会让我兴奋", scores: { novelty: 36, roleplay: 10, impact: 8, risk: 10 } }
    ]
  },
  {
    id: 14,
    text: "你对录制亲密视频或保存私密影像感兴趣吗？",
    options: [
      { label: "完全不感兴趣，隐私风险让我不舒服", scores: { romance: 8 } },
      { label: "比较保守，只能接受非常有限的私密记录", scores: { visual: 8 } },
      { label: "可以接受，如果只用于彼此之间", scores: { visual: 20, risk: 8 } },
      { label: "非常愿意，影像记录本身就很刺激", scores: { visual: 36, voyeur: 12, risk: 14 } }
    ]
  }
];

export const resultBands = [
  {
    min: 76,
    title: "高倾向",
    description: "这个维度在你的结果中很突出，通常代表它对你的幻想、吸引力或体验感影响较大。"
  },
  {
    min: 46,
    title: "中等倾向",
    description: "这个维度可能取决于对象、关系状态、信任程度和当下情境。"
  },
  {
    min: 0,
    title: "低倾向",
    description: "这个维度不是你的主要兴趣点，或者需要更强的安全感与信任条件。"
  }
];
