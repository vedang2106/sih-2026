// GeoMine AI - Topic Extraction & NLP Word Cloud Service
import { WORD_CLOUD_TOPICS, SAMPLE_DOCUMENTS } from '../data/mockData';

export function getFilteredWordCloudTopics(subsidiary = 'ALL', category = 'ALL', minWeight = 0) {
  return WORD_CLOUD_TOPICS.filter(item => {
    const subMatch = subsidiary === 'ALL' || item.category.includes(subsidiary) || subsidiary === 'CMPDI';
    const catMatch = category === 'ALL' || item.category === category;
    const weightMatch = item.weight >= minWeight;
    return subMatch && catMatch && weightMatch;
  });
}

export function extractTopicsFromText(text) {
  if (!text) return [];
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const stopWords = new Set(['this', 'that', 'with', 'from', 'have', 'were', 'been', 'which', 'their', 'about', 'under', 'into']);
  
  const counts = {};
  words.forEach(w => {
    if (!stopWords.has(w)) {
      counts[w] = (counts[w] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, count]) => ({
      text: word.toUpperCase(),
      weight: Math.min(100, count * 15 + 40),
      count
    }));
}
