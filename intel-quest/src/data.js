export const PERSONAS = [
  { id: 'student', emoji: '📚', title: 'The Student', sub: 'Learn, research, present', needs: ['Summarise notes and build revision questions', 'Live captions for lectures', 'Long battery for a full campus day'] },
  { id: 'creator', emoji: '🎨', title: 'The Creator', sub: 'Design, edit, publish', needs: ['AI-assisted photo and video tools', 'Smooth previews while editing', 'Mic and webcam AI effects for content'] },
  { id: 'gamer', emoji: '🎮', title: 'The Gamer', sub: 'Play, stream, multitask', needs: ['High frame rates in your games', 'AI mic noise removal while streaming', 'Many apps open without slowdowns'] },
  { id: 'pro', emoji: '💼', title: 'The Professional', sub: 'Meet, plan, deliver', needs: ['Background blur and noise removal in calls', 'Smooth multitasking across apps', 'All-day battery and light carry'] },
];
export const BUDGETS = [
  { id: 'value', label: 'Under ₹60,000' },
  { id: 'mid', label: '₹60,000 – ₹1,00,000' },
  { id: 'prem', label: 'Above ₹1,00,000' },
];
export const PRIORITIES = [
  { id: 'battery', label: 'Battery and portability' },
  { id: 'perf', label: 'Raw performance' },
  { id: 'bal', label: 'A bit of everything' },
];
export const STUDY = [
  { t: 'Photosynthesis turns light energy into chemical energy stored in glucose.', key: true },
  { t: 'It happens mainly in the chloroplasts of leaf cells.', key: true },
  { t: 'The textbook author grew up in a small town and enjoys gardening.', key: false },
  { t: 'The inputs are carbon dioxide, water and light; the outputs are glucose and oxygen.', key: true },
  { t: 'This chapter has twelve pages and a blue cover.', key: false },
  { t: 'Many students find the diagrams colourful.', key: false },
];
export const SPECS = {
  creator: [
    ['Strong graphics for your editing apps', 1], ['Enough RAM (16 GB or more is a common starting point)', 1], ['A colour-accurate display', 1],
    ['Shiny lid colour', 0], ['Free bag and mouse bundle', 0], ['Lowest sticker price, nothing else', 0],
  ],
  gamer: [
    ['A graphics chip suited to your games', 1], ['Cooling that handles long sessions', 1], ['A high refresh-rate display', 1],
    ['RGB logo on the lid', 0], ['Free headset bundle', 0], ['Lowest sticker price, nothing else', 0],
  ],
};
export const ENGINE_TASKS = {
  student: [
    ['Opening a dozen browser tabs and typing notes', 'CPU', 'General, quick-response work is the CPU’s job.'],
    ['Live captions through a two-hour lecture', 'NPU', 'Long-running AI work is what an NPU is built to do efficiently, in apps that support it.'],
    ['Playing a 3D game in your break', 'GPU', 'Graphics-heavy, highly parallel work suits the GPU.'],
    ['Summarising notes with an on-device AI app', 'NPU', 'Supported on-device AI features can use the NPU. The app decides what runs where.'],
  ],
  creator: [
    ['Launching apps and managing project files', 'CPU', 'The CPU handles general tasks and quick responses.'],
    ['Previewing a colour-graded 4K timeline', 'GPU', 'Video effects and previews lean on the GPU.'],
    ['AI noise removal on your mic while recording', 'NPU', 'Sustained AI audio effects are a good fit for the NPU in supported apps.'],
    ['Webcam auto-framing for a live stream', 'NPU', 'Always-on AI video effects can run on the NPU, saving CPU and GPU for your creative work.'],
  ],
  gamer: [
    ['Rendering a game at a high frame rate', 'GPU', 'Gaming is a GPU job. An NPU does not replace a gaming GPU.'],
    ['Running game logic with Discord and a browser open', 'CPU', 'The CPU keeps general tasks and many apps responsive.'],
    ['AI noise removal on your streaming mic', 'NPU', 'Offloading sustained AI audio keeps the GPU free for the game, in supported apps.'],
    ['Drawing the game’s 3D scenes and effects', 'GPU', 'Graphics workloads run in parallel on the GPU.'],
  ],
  pro: [
    ['Working in spreadsheets and email', 'CPU', 'Everyday productivity is CPU territory.'],
    ['Background blur for a one-hour video call', 'NPU', 'A steady AI effect like this is a classic NPU task in supported apps.'],
    ['AI noise removal on a long call', 'NPU', 'Efficient sustained AI audio is where an NPU shines.'],
    ['Playing a 4K video on a large display', 'GPU', 'Video playback and display output rely on graphics hardware.'],
  ],
};
export const PRIVACY = [
  ['Summarise my private bank statement', 'local', 'Sensitive files are good candidates for on-device AI, if the app truly processes locally. Check its settings.'],
  ['Ask for today’s live cricket score', 'cloud', 'Live information must come from the internet, so cloud is expected here.'],
  ['Blur my background on a video call', 'local', 'Many such effects can run on-device on supported PCs and apps.'],
  ['Ask a huge online-only chatbot a tough question', 'cloud', 'Very large models usually run in the cloud, so check what you share.'],
];
export const COMPARE = [
  {
    id: 'old', tab: 'vs an older PC without an NPU',
    intel: ['Core Ultra puts CPU, GPU and NPU on one chip, so supported AI effects have a dedicated, efficient engine.', 'Integrated Intel Arc graphics for everyday creative and casual gaming work.'],
    check: ['Without an NPU, AI effects fall back to the CPU or GPU. That typically uses more power and can slow other tasks.', 'Benefits depend on apps that support the NPU.'],
  },
  {
    id: 'arm', tab: 'vs Arm-based AI PCs',
    intel: ['Intel PCs run on x86, the architecture most Windows apps, games and drivers were built for, so they run natively.', 'Core Ultra Series 3 has an NPU of up to 50 TOPS and qualifies for Copilot+ PCs.'],
    check: ['Arm-based Windows PCs run many apps natively and others through emulation. Compatibility can vary, so test your own apps.', 'Arm Copilot+ models also have strong NPUs. Compare the exact model.'],
  },
  {
    id: 'amd', tab: 'vs other x86 AI PCs (such as AMD Ryzen AI)',
    intel: ['A very wide range of laptop designs and price points carry Intel Core Ultra.', 'Intel states its platform is optimised for 900+ AI models and 500+ AI features, and supports tools like OpenVINO.'],
    check: ['AMD Ryzen AI 400 laptops are also Copilot+ class. Both are strong, so the right choice is model by model.', 'Compare NPU TOPS, graphics, battery life and price on the exact laptop, not the brand.'],
  },
];
export const QA = [
  ['Why do I need an NPU?', 'An NPU is a part of the chip designed for supported AI tasks like background blur, live captions and noise removal. It does them with less power than the CPU or GPU, which helps most when AI runs for long on battery. It only helps apps that support it.'],
  ['CPU vs GPU vs NPU?', 'CPU: general work and quick responses. GPU: graphics and many calculations at once. NPU: efficient, sustained AI work. They team up. They are not replacements for each other.'],
  ['Is on-device AI fully private?', 'Local processing can reduce how much data leaves your PC, but it does not guarantee privacy. Each app decides what it stores and sends, so check its settings.'],
  ['Is every Intel AI PC a Copilot+ PC?', 'No. Copilot+ is a Microsoft category with extra requirements, including an NPU of 40+ TOPS. Core Ultra Series 3 (up to 50 TOPS) and Core Ultra 200V (48 TOPS) meet the NPU bar. Earlier Core Ultra chips and some value-tier chips do not.'],
  ['Why not buy the cheapest, prettiest one?', 'Colour and freebies are what you notice in the store. RAM, graphics, cooling, battery and AI capability are what you live with for years. This game helps you look at the second list.'],
];
const TIERS = {
  value: { cat: 'Value-tier Intel AI PC', note: 'Check the label for the NPU rating. Some value-tier Intel chips have a smaller NPU and do not qualify as Copilot+ PCs. Ask the associate for the exact figure.' },
  mid: { cat: 'Mid-range Intel Core Ultra AI PC', note: 'For Copilot+ features, look for an NPU of 40+ TOPS, such as Core Ultra Series 3 (up to 50 TOPS).' },
  prem: { cat: 'Premium Intel Core Ultra AI PC', note: 'Look for a Core Ultra Series 3 or 200V model for a Copilot+ NPU, and match the graphics to your workload.' },
};
const FOCUS = {
  student: 'a light, long-lasting laptop that stays quick for notes, research and presentations',
  creator: 'strong graphics, enough memory and a good display, with an NPU for AI tools',
  gamer: 'a graphics chip suited to your games plus cooling, with the NPU handling AI extras',
  pro: 'smooth multitasking, great call quality and all-day battery',
};
const LOOK = {
  student: ['Battery life you can verify in reviews', 'Light and portable build', '16 GB RAM is a common starting point', 'NPU TOPS rating on the spec sheet'],
  creator: ['A graphics chip suited to your editing apps', '16 GB RAM or more', 'Colour-accurate display', 'NPU TOPS and software support for your tools'],
  gamer: ['A graphics chip suited to your games', 'Cooling and sustained performance', 'High refresh-rate display', 'NPU TOPS for AI extras like mic noise removal'],
  pro: ['Webcam and microphone quality', '16 GB RAM for heavy multitasking', 'Battery life and weight', 'NPU TOPS and Copilot+ status if you want them'],
};
export function recommend(p, b, pr) {
  const t = TIERS[b], per = PERSONAS.find((x) => x.id === p);
  const lean = { battery: 'You asked for battery and portability, so prefer efficient, lighter designs.', perf: 'You asked for raw performance, so prioritise the strongest CPU and graphics in your budget.', bal: 'You want balance, so avoid paying for extremes you will not use.' }[pr];
  return { cat: t.cat, note: t.note, why: [`As ${per.title.toLowerCase()}, you benefit most from ${FOCUS[p]}.`, lean, `Your budget band is ${BUDGETS.find((x) => x.id === b).label}, so compare configurations, not just the cheapest tag.`], look: LOOK[p], needs: per.needs };
}
