// Intelligent Telugu-to-Roman Transliteration Engine
// Maps Telugu Unicode (U+0C00 - U+0C7F) to natural, readable Roman Telugu (English script)

const VOWELS: Record<string, string> = {
  'అ': 'a',
  'ఆ': 'aa',
  'ఇ': 'i',
  'ఈ': 'ee',
  'ఉ': 'u',
  'ఊ': 'oo',
  'ఋ': 'ru',
  'ౠ': 'roo',
  'ఌ': 'lu',
  'ౡ': 'loo',
  'ఎ': 'e',
  'ఏ': 'e',
  'ఐ': 'ai',
  'ఒ': 'o',
  'ఓ': 'o',
  'ఔ': 'ou',
};

const VOWEL_SIGNS: Record<string, string> = {
  'ా': 'aa',
  'ి': 'i',
  'ీ': 'ee',
  'ు': 'u',
  'ూ': 'oo',
  'ృ': 'ru',
  'ౄ': 'roo',
  'ె': 'e',
  'ే': 'e',
  'ై': 'ai',
  'ొ': 'o',
  'ో': 'o',
  'ౌ': 'ou',
};

const CONSONANTS: Record<string, string> = {
  'క': 'k',
  'ఖ': 'kh',
  'గ': 'g',
  'ఘ': 'gh',
  'ఙ': 'ng',
  'చ': 'ch',
  'ఛ': 'chh',
  'జ': 'j',
  'ఝ': 'jh',
  'ఞ': 'ny',
  'ట': 't',
  'ఠ': 'th',
  'డ': 'd',
  'ఢ': 'dh',
  'ణ': 'n',
  'త': 'th',
  'థ': 'th',
  'ద': 'd',
  'ధ': 'dh',
  'న': 'n',
  'ప': 'p',
  'ఫ': 'ph',
  'బ': 'b',
  'భ': 'bh',
  'మ': 'm',
  'య': 'y',
  'ర': 'r',
  'ల': 'l',
  'వ': 'v',
  'శ': 'sh',
  'ష': 'sh',
  'స': 's',
  'హ': 'h',
  'ళ': 'l',
  'క్ష': 'ksh',
  'ఱ': 'r',
};

const VIRAMA = '్';
const ANUSVARA = 'ం';
const VISARGA = 'ః';

/**
 * Transliterates a single Telugu word or string to phonetic Roman script
 */
export function transliterateTeluguToRoman(text: string): string {
  if (!text) return '';

  const chars = Array.from(text);
  let result = '';
  let i = 0;

  while (i < chars.length) {
    const char = chars[i];

    // Check independent vowel
    if (VOWELS[char]) {
      let v = VOWELS[char];
      // Check if next is anusvara or visarga
      if (chars[i + 1] === ANUSVARA) {
        v += 'm';
        i++;
      } else if (chars[i + 1] === VISARGA) {
        v += 'h';
        i++;
      }
      result += v;
      i++;
      continue;
    }

    // Check consonant
    if (CONSONANTS[char]) {
      let consonant = CONSONANTS[char];
      let hasVirama = false;
      let vowelSign = '';

      // Look ahead for virama / conjuncts / vowel signs
      let j = i + 1;
      while (j < chars.length) {
        const next = chars[j];
        if (next === VIRAMA) {
          hasVirama = true;
          // Check if followed by another consonant (conjunct / vothu)
          if (j + 1 < chars.length && CONSONANTS[chars[j + 1]]) {
            const nextConsonant = CONSONANTS[chars[j + 1]];
            // Special cases like 'v' sounding like 'w' after consonants (e.g. Swami)
            const cSound = (nextConsonant === 'v') ? 'w' : nextConsonant;
            consonant += cSound;
            j += 2;
            hasVirama = false; // it continues into the next consonant
            continue;
          } else {
            j++;
            break;
          }
        } else if (VOWEL_SIGNS[next]) {
          vowelSign = VOWEL_SIGNS[next];
          j++;
          break;
        } else {
          break;
        }
      }

      let addition = consonant;
      if (hasVirama) {
        // consonant ending with halant, no inherent 'a'
      } else if (vowelSign) {
        addition += vowelSign;
      } else {
        // Inherent 'a' vowel unless followed by another consonant without virama or end of word in certain Telugu endings
        addition += 'a';
      }

      // Check anusvara or visarga after vowel
      if (j < chars.length && chars[j] === ANUSVARA) {
        addition += 'm';
        j++;
      } else if (j < chars.length && chars[j] === VISARGA) {
        addition += 'h';
        j++;
      }

      result += addition;
      i = j;
      continue;
    }

    // Anusvara alone
    if (char === ANUSVARA) {
      result += 'm';
      i++;
      continue;
    }

    // Visarga alone
    if (char === VISARGA) {
      result += 'h';
      i++;
      continue;
    }

    // Whitespace, punctuation, or non-Telugu characters
    result += char;
    i++;
  }

  // Post-processing cleanup for common natural romanization patterns:
  // e.g. "shree" instead of "shree" or "sree"
  return formatTransliteratedText(result);
}

function formatTransliteratedText(raw: string): string {
  // Normalize multi spaces while preserving line breaks
  const lines = raw.split('\n');
  const cleanedLines = lines.map((line) => {
    // Clean up verse lines
    let l = line.trim();
    if (!l) return '';

    // If line starts with a letter, capitalize the first letter of the line
    if (/^[a-z]/.test(l)) {
      l = l.charAt(0).toUpperCase() + l.slice(1);
    }
    return l;
  });

  return cleanedLines.join('\n');
}

/**
 * Transliterates song titles nicely with Title Case
 */
export function transliterateTitle(titleTelugu: string): string {
  const roman = transliterateTeluguToRoman(titleTelugu);
  return roman
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
