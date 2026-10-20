// Curated, deterministic frontend fixtures. They do not represent parsed uploads.
export const topics = {
  arithmetic: {
    id: 'arithmetic', grade: 1, subject: 'Matematika', title: "Qo‘shish va ayirish",
    intro: 'Sonlarni qo‘shish va ayirishni olma rasmlari bilan o‘rganamiz.',
    lessons: [
      { title: 'Qo‘shish (+) nima?', body: 'Qo‘shish — narsalarni birlashtirib, jami nechta bo‘lganini topish.', left: 3, right: 2, result: 5, symbol: '+', tip: 'Qo‘shayotganda birinchi sondan boshlab oldinga sanang.' },
      { title: 'Ayirish (−) nima?', body: 'Ayirish — bir guruhdan bir qismini olib, qancha qolganini topish.', left: 5, right: 2, result: 3, symbol: '−', tip: 'Ayirganda birinchi sondan boshlab orqaga sanang.' }
    ],
    examples: [
      { id: 'example-a', a: 2, b: 2, symbol: '+', answer: 4, steps: ['2 ta olmani ko‘ramiz.', 'Yana 2 ta olmani yoniga qo‘yamiz.', 'Hammasini sanab, 4 ta olma ekanini ko‘ramiz.'], other: 'Son chizig‘ida 2 dan boshlab ikki qadam oldinga yuring: 3, 4.' },
      { id: 'example-b', a: 5, b: 1, symbol: '−', answer: 4, steps: ['5 ta olmani ko‘ramiz.', 'Ulardan 1 tasini olib qo‘yamiz.', 'Qolganlarini sanab, 4 ta olma ekanini ko‘ramiz.'], other: 'Son chizig‘ida 5 dan bir qadam orqaga yuring: 4.' }
    ],
    exercises: [
      { id: 'a1', a: 2, b: 3, symbol: '+', answer: 5, hint: '2 dan boshlab 3 marta oldinga sanang.', steps: ['2 dan boshlang.', 'Uchta qadamni bittadan sanang: 3, 4, keyingi son.', 'Chiqqan sonni javob maydoniga yozing.'], explanation: '2 ta olma va 3 ta olma birgalikda 5 ta olma bo‘ladi.' },
      { id: 'a2', a: 4, b: 2, symbol: '+', answer: 6, hint: '4 dan keyingi ikkita sonni sanang.', steps: ['4 dan boshlang.', 'Ikki qadam oldinga yuring.', 'Qaysi songa kelganingizni yozing.'], explanation: '4 ta olma va 2 ta olma birgalikda 6 ta olma bo‘ladi.' },
      { id: 'a3', a: 5, b: 2, symbol: '−', answer: 3, hint: '5 dan ikki marta orqaga sanang.', steps: ['5 dan boshlang.', 'Ikki qadam orqaga yuring.', 'Qolgan sonni yozing.'], explanation: '5 ta olmadan 2 tasini olsak, 3 ta olma qoladi.' },
      { id: 'a4', a: 3, b: 4, symbol: '+', answer: 7, hint: '3 dan keyin to‘rtta sonni sanang.', steps: ['3 dan boshlang.', 'To‘rt qadam oldinga yuring.', 'Yetib kelgan soningizni yozing.'], explanation: '3 ta olma va 4 ta olma birgalikda 7 ta olma bo‘ladi.' }
    ]
  },
  counting: {
    id: 'counting', grade: 1, subject: 'Matematika', title: 'Sonlarni sanash',
    intro: 'Narsalarni bittadan sanab, jami miqdorni topishni mashq qilamiz.',
    lessons: [
      { title: 'Bittadan sanaymiz', body: 'Har bir olmani bir marta sanang. Oxirgi aytilgan son jami miqdordir.', left: 2, right: 1, result: 3, symbol: '+', tip: 'Sanagan har bir olmani barmog‘ingiz bilan belgilang.' },
      { title: 'Guruhlarni birlashtiramiz', body: 'Ikki guruhdagi narsalarni ketma-ket sanab, jami sonni topamiz.', left: 3, right: 2, result: 5, symbol: '+', tip: 'Hech bir narsani ikki marta sanamang.' }
    ],
    examples: [
      { id: 'example-c', a: 1, b: 2, symbol: '+', answer: 3, steps: ['Birinchi guruhda 1 ta olma bor.', 'Ikkinchi guruhda 2 ta olma bor.', 'Barchasini bittadan sanaymiz: 1, 2, 3.'], other: 'Bitta olmani yodda tuting va yana ikkita sanang: 2, 3.' },
      { id: 'example-d', a: 2, b: 2, symbol: '+', answer: 4, steps: ['Birinchi guruhda 2 ta olma bor.', 'Yana 2 ta olma qo‘shamiz.', 'Barchasini sanaymiz: 1, 2, 3, 4.'], other: '2 dan boshlang va yana ikki qadam oldinga sanang.' }
    ],
    exercises: [
      { id: 'c1', a: 2, b: 3, symbol: '+', answer: 5, hint: 'Ikkala guruhdagi olmalarni bittadan sanang.', steps: ['Birinchi guruhdagi 2 ta olmani sanang.', 'Ikkinchi guruhdagi 3 ta olmani davom ettirib sanang.', 'Oxirgi aytilgan sonni yozing.'], explanation: '2 ta va 3 ta olmani sanasak, jami 5 ta bo‘ladi.' },
      { id: 'c2', a: 1, b: 4, symbol: '+', answer: 5, hint: '1 dan boshlab yana to‘rtta sanang.', steps: ['Birinchi olmani 1 deb sanang.', 'Qolgan to‘rttasini davom ettirib sanang.', 'Oxirgi sonni yozing.'], explanation: '1 ta va 4 ta olma jami 5 ta bo‘ladi.' },
      { id: 'c3', a: 3, b: 3, symbol: '+', answer: 6, hint: 'Ikkala uchlikni birga sanang.', steps: ['Uchta olmani sanang.', 'Yana uchta olmani davom ettirib sanang.', 'Jami sonni yozing.'], explanation: '3 ta va 3 ta olma jami 6 ta bo‘ladi.' }
    ]
  }
};

export const phaseLabels = { upload: 'Yuklash', analysis: 'Tahlil', lesson: 'Mini dars', guided: 'Yechish', practice: 'Yechish', result: 'Yechish', topics: 'Mini dars' };

export function newSession(topicId = 'arithmetic', scenario = 'success') {
  const topic = topics[topicId];
  return {
    id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    topicId, scenario, file: null, fileStatus: 'selected', analysisStatus: 'idle',
    analysis: { subject: topic.subject, grade: topic.grade, topic: topic.title, confidence: scenario === 'low' ? 48 : 96 },
    lessonTab: 0, exampleIndex: 0, alternate: false, currentTaskId: topic.exercises[0].id,
    tasks: Object.fromEntries(topic.exercises.map(task => [task.id, { draft: '', status: 'not_started', attempts: 0, hint: false, steps: false, feedback: null }])),
    chat: [], createdAt: Date.now()
  };
}

export function getCompletedCount(session) {
  return Object.values(session?.tasks || {}).filter(task => task.status === 'correct').length;
}

export function getProgress(session) {
  if (!session) return { completed: 0, total: 0, percent: 0 };
  const total = topics[session.topicId].exercises.length;
  const completed = getCompletedCount(session);
  return { completed, total, percent: Math.round(completed / total * 100) };
}

// Prototype-only feedback rule. These values do not touch any LMS/account balance.
export function getDemoReward(session) {
  const completed = getCompletedCount(session);
  return { coins: completed * 10, xp: completed * 5 };
}
