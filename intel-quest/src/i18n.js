import { createContext, useContext } from 'react';
export const LangCtx = createContext({ T: (k) => k, lang: 'en' });
export const useT = () => useContext(LangCtx);
export const speak = (t, lang) => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = { en: 'en-IN', hi: 'hi-IN', kn: 'kn-IN' }[lang] || 'en-IN'; speechSynthesis.speak(u); } catch { /* no speech */ } };
export const I18N = {
  en: {
    hero: 'You use AI every day. Is your PC ready for it?', lead: 'Play three quick challenges. Meet the three engines inside an AI PC. Walk away with the one that fits you.', start: 'Start your quest', small: 'About 2 minutes. No sign-up. No tech knowledge needed.',
    pickTitle: 'What kind of digital superstar are you?', budget: 'Your budget', matters: 'What matters most?', enter: 'Enter the arena', nick: 'Your nickname (optional)',
    preQ: 'Before we start: do you think you need an AI PC?', yes: 'Yes', maybe: 'Not sure', no: 'No',
    postQ: 'After playing: would you consider an Intel AI PC?', pyes: 'Definitely', pmaybe: 'Maybe', pno: 'Not yet', thanks: 'Thanks for your answer!',
    unlocked: 'Your digital personality is unlocked', recCat: 'Recommended category', why: 'Why it matches you', ai: 'AI you can use', specs: 'Specs to look for', tryIt: 'Try it in store', again: 'Play again', print: 'Save or print', share: 'Share on WhatsApp', card: 'Download quest card', read: 'Read aloud',
    home: 'Home', me: 'My dashboard', lab: 'Engine Lab', labSub: 'Switch tasks on and off and watch the three engines.', skip: 'Skip', cont: 'Continue', inStore: 'Available in this store', top: 'Top players on this device',
  },
  hi: {
    hero: 'आप रोज़ AI इस्तेमाल करते हैं। क्या आपका PC इसके लिए तैयार है?', lead: 'तीन छोटी चुनौतियाँ खेलें। AI PC के अंदर के तीन इंजन जानें। और अपने लिए सही PC चुनें।', start: 'अपना क्वेस्ट शुरू करें', small: 'लगभग 2 मिनट। साइन-अप नहीं। तकनीकी ज्ञान की ज़रूरत नहीं।',
    pickTitle: 'आप किस तरह के डिजिटल सुपरस्टार हैं?', budget: 'आपका बजट', matters: 'आपके लिए सबसे ज़रूरी क्या है?', enter: 'अखाड़े में उतरें', nick: 'आपका उपनाम (वैकल्पिक)',
    preQ: 'शुरू करने से पहले: क्या आपको लगता है कि आपको AI PC चाहिए?', yes: 'हाँ', maybe: 'पक्का नहीं', no: 'नहीं',
    postQ: 'खेलने के बाद: क्या आप Intel AI PC पर विचार करेंगे?', pyes: 'ज़रूर', pmaybe: 'शायद', pno: 'अभी नहीं', thanks: 'आपके जवाब के लिए धन्यवाद!',
    unlocked: 'आपकी डिजिटल पर्सनैलिटी अनलॉक हो गई', recCat: 'सुझाई गई श्रेणी', why: 'यह आपके लिए क्यों सही है', ai: 'आप कौन-से AI फ़ीचर इस्तेमाल करेंगे', specs: 'किन स्पेक्स पर ध्यान दें', tryIt: 'स्टोर में आज़माएँ', again: 'फिर खेलें', print: 'सेव या प्रिंट करें', share: 'WhatsApp पर शेयर करें', card: 'क्वेस्ट कार्ड डाउनलोड करें', read: 'सुनें',
    home: 'होम', me: 'मेरा डैशबोर्ड', lab: 'इंजन लैब', labSub: 'काम चालू-बंद करें और तीनों इंजन देखें।', skip: 'छोड़ें', cont: 'आगे बढ़ें', inStore: 'इस स्टोर में उपलब्ध', top: 'इस डिवाइस के टॉप खिलाड़ी',
  },
  kn: {
    hero: 'ನೀವು ಪ್ರತಿದಿನ AI ಬಳಸುತ್ತೀರಿ. ನಿಮ್ಮ PC ಅದಕ್ಕೆ ಸಿದ್ಧವಾಗಿದೆಯೇ?', lead: 'ಮೂರು ಸಣ್ಣ ಸವಾಲುಗಳನ್ನು ಆಡಿ. AI PC ಒಳಗಿನ ಮೂರು ಎಂಜಿನ್‌ಗಳನ್ನು ತಿಳಿಯಿರಿ. ನಿಮಗೆ ಸರಿಹೊಂದುವ PC ಆರಿಸಿ.', start: 'ನಿಮ್ಮ ಕ್ವೆಸ್ಟ್ ಆರಂಭಿಸಿ', small: 'ಸುಮಾರು 2 ನಿಮಿಷ. ಸೈನ್-ಅಪ್ ಬೇಡ. ತಾಂತ್ರಿಕ ಜ್ಞಾನ ಬೇಕಿಲ್ಲ.',
    pickTitle: 'ನೀವು ಯಾವ ರೀತಿಯ ಡಿಜಿಟಲ್ ಸೂಪರ್‌ಸ್ಟಾರ್?', budget: 'ನಿಮ್ಮ ಬಜೆಟ್', matters: 'ನಿಮಗೆ ಯಾವುದು ಮುಖ್ಯ?', enter: 'ಅರೆನಾ ಪ್ರವೇಶಿಸಿ', nick: 'ನಿಮ್ಮ ಅಡ್ಡಹೆಸರು (ಐಚ್ಛಿಕ)',
    preQ: 'ಆರಂಭಿಸುವ ಮುನ್ನ: ನಿಮಗೆ AI PC ಬೇಕು ಎಂದು ಅನಿಸುತ್ತದೆಯೇ?', yes: 'ಹೌದು', maybe: 'ಖಚಿತವಿಲ್ಲ', no: 'ಇಲ್ಲ',
    postQ: 'ಆಡಿದ ನಂತರ: ನೀವು Intel AI PC ಪರಿಗಣಿಸುತ್ತೀರಾ?', pyes: 'ಖಂಡಿತ', pmaybe: 'ಬಹುಶಃ', pno: 'ಈಗಲ್ಲ', thanks: 'ನಿಮ್ಮ ಉತ್ತರಕ್ಕೆ ಧನ್ಯವಾದ!',
    unlocked: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ವ್ಯಕ್ತಿತ್ವ ಅನ್‌ಲಾಕ್ ಆಯಿತು', recCat: 'ಶಿಫಾರಸು ಮಾಡಿದ ವರ್ಗ', why: 'ಇದು ನಿಮಗೆ ಏಕೆ ಹೊಂದುತ್ತದೆ', ai: 'ನೀವು ಬಳಸಬಹುದಾದ AI', specs: 'ಗಮನಿಸಬೇಕಾದ ಸ್ಪೆಕ್ಸ್', tryIt: 'ಅಂಗಡಿಯಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ', again: 'ಮತ್ತೆ ಆಡಿ', print: 'ಸೇವ್ ಅಥವಾ ಪ್ರಿಂಟ್', share: 'WhatsApp ನಲ್ಲಿ ಹಂಚಿ', card: 'ಕ್ವೆಸ್ಟ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್', read: 'ಓದಿ ಹೇಳಿ',
    home: 'ಮುಖಪುಟ', me: 'ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', lab: 'ಎಂಜಿನ್ ಲ್ಯಾಬ್', labSub: 'ಕೆಲಸಗಳನ್ನು ಆನ್/ಆಫ್ ಮಾಡಿ, ಮೂರು ಎಂಜಿನ್‌ಗಳನ್ನು ನೋಡಿ.', skip: 'ಬಿಟ್ಟುಬಿಡಿ', cont: 'ಮುಂದುವರಿಸಿ', inStore: 'ಈ ಅಂಗಡಿಯಲ್ಲಿ ಲಭ್ಯ', top: 'ಈ ಸಾಧನದ ಅಗ್ರ ಆಟಗಾರರು',
  },
};
