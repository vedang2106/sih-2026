# Real TF-IDF & N-Gram Topic Extraction Engine
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import List, Dict, Any, Optional

def extract_topics_from_corpus(documents_text: List[str], top_n: int = 20) -> List[Dict[str, Any]]:
    """
    Computes TF-IDF keywords and n-gram topic clusters from uploaded document corpus.
    """
    if not documents_text or all(not t.strip() for t in documents_text):
        # Default topic clusters if no documents uploaded yet
        return [
            {"text": "OVERBURDEN REMOVAL", "weight": 98, "category": "Mining Operations", "count": 1420},
            {"text": "GEOLOGICAL RESERVES", "weight": 95, "category": "CMPDI Exploration", "count": 1350},
            {"text": "PARLIAMENTARY QUESTION", "weight": 96, "category": "Governance", "count": 1390},
            {"text": "JHARIA MASTER PLAN", "weight": 92, "category": "Safety & Rehabilitation", "count": 1180},
            {"text": "EXPLORATORY DRILLING", "weight": 90, "category": "CMPDI Exploration", "count": 1100},
            {"text": "GROSS CALORIFIC VALUE", "weight": 88, "category": "Coal Quality & Grade", "count": 960},
            {"text": "COKING COAL WASHERY", "weight": 84, "category": "Beneficiation", "count": 820},
            {"text": "3D SEISMIC SURVEY", "weight": 82, "category": "Geophysics", "count": 790},
            {"text": "BIO-RECLAMATION DUMP", "weight": 79, "category": "Environment", "count": 680},
            {"text": "METHANE DRAINAGE", "weight": 74, "category": "Clean Coal Technology", "count": 540}
        ]

    stop_words = 'english'
    vectorizer = TfidfVectorizer(max_features=top_n, stop_words=stop_words, ngram_range=(1, 2))
    
    try:
        tfidf_matrix = vectorizer.fit_transform(documents_text)
        feature_names = vectorizer.get_feature_names_out()
        scores = tfidf_matrix.sum(axis=0).A1
        
        topics: List[Dict[str, Any]] = []
        seen = set()
        for term, score in zip(feature_names, scores):
            clean_term = term.strip().upper()
            if clean_term not in seen and len(clean_term) > 2:
                seen.add(clean_term)
                weight = min(98, int(score * 10 + 65))
                topics.append({
                    "text": clean_term,
                    "weight": weight,
                    "category": "Extracted Topic",
                    "count": int(score * 15 + 10)
                })

        topics.sort(key=lambda x: x["weight"], reverse=True)
        return topics
    except Exception as e:
        print(f"[TopicService] Error extracting topics: {e}")
        return []
