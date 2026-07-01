// Analysis Engine
class TextAnalyzer {
    constructor() {
        this.positiveWords = [
            'خوب', 'عالی', 'فوق‌العاده', 'بهترین', 'دوست', 'عشق', 'شاد', 'خوشحال',
            'موفق', 'بهتر', 'درخشان', 'زیبا', 'مانند', 'عظیم', 'جذاب', 'دلنشین',
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love',
            'happy', 'beautiful', 'brilliant', 'awesome', 'perfect', 'nice', 'brilliant',
            'outstanding', 'marvelous', 'superb', 'incredible'
        ];
        
        this.negativeWords = [
            'بد', 'بدتر', 'بدترین', 'نفرت', 'ناراحت', 'غمگین', 'خسته', 'ناامید',
            'مصیبت', 'فاجعه', 'عذاب', 'درد', 'اذیت', 'دلگیری', 'کاش', 'شرم',
            'bad', 'worse', 'worst', 'hate', 'terrible', 'awful', 'horrible',
            'sad', 'angry', 'disappointed', 'disgusted', 'afraid', 'ashamed', 'disaster'
        ];
        
        this.stopWords = [
            'و', 'یا', 'در', 'به', 'از', 'برای', 'با', 'نیست', 'است', 'هستند',
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'is', 'are', 'was', 'were', 'be', 'been', 'being'
        ];
    }

    // Basic Text Statistics
    getStats(text) {
        const words = this.getWords(text);
        const chars = text.length;
        const sentences = this.getSentences(text);
        
        return {
            wordCount: words.length,
            charCount: chars,
            avgLength: words.length > 0 ? (chars / words.length).toFixed(1) : 0,
            sentenceCount: sentences.length
        };
    }

    // Extract words
    getWords(text) {
        const words = text.match(/\b\w+\b/g) || [];
        return words;
    }

    // Extract sentences
    getSentences(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences;
    }

    // Sentiment Analysis
    analyzeSentiment(text) {
        const words = this.getWords(text).map(w => w.toLowerCase());
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (this.positiveWords.includes(word)) positiveCount++;
            if (this.negativeWords.includes(word)) negativeCount++;
        });
        
        let sentiment = 'neutral';
        let emoji = '😐';
        let score = 50;
        
        if (positiveCount > negativeCount) {
            sentiment = 'positive';
            emoji = '😊';
            score = Math.min(100, 50 + (positiveCount * 20));
        } else if (negativeCount > positiveCount) {
            sentiment = 'negative';
            emoji = '😔';
            score = Math.max(0, 50 - (negativeCount * 20));
        }
        
        return { sentiment, emoji, score };
    }

    // Emotion Detection
    detectEmotions(text) {
        const words = this.getWords(text).map(w => w.toLowerCase());
        
        const emotionKeywords = {
            joy: ['خوشحال', 'شاد', 'خوب', 'عالی', 'happy', 'joy', 'smile', 'laugh'],
            sadness: ['غمگین', 'ناراحت', 'محزون', 'sad', 'cry', 'sorrow', 'unhappy'],
            anger: ['خشم', 'عصبانی', 'خشمگین', 'angry', 'furious', 'mad', 'rage'],
            fear: ['ترس', 'ترسناک', 'بیم', 'afraid', 'scared', 'fear', 'terror'],
            surprise: ['تعجب', 'شگفت', 'حیرت', 'surprised', 'amazed', 'wow', 'shock'],
            trust: ['اعتماد', 'اطمینان', 'معتمد', 'trust', 'confident', 'faith', 'belief']
        };
        
        const emotions = {};
        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            const count = words.filter(w => keywords.includes(w)).length;
            emotions[emotion] = Math.min(100, count * 15);
        }
        
        return emotions;
    }

    // Language Detection
    detectLanguage(text) {
        const farsiChars = /[\u0600-\u06FF]/g;
        const englishChars = /[a-zA-Z]/g;
        
        const farsiMatches = text.match(farsiChars) || [];
        const englishMatches = text.match(englishChars) || [];
        
        const farsiCount = farsiMatches.length;
        const englishCount = englishMatches.length;
        
        let language = 'Unknown';
        let emoji = '❓';
        
        if (farsiCount === 0 && englishCount > 0) {
            language = 'English';
            emoji = '🇺🇸';
        } else if (englishCount === 0 && farsiCount > 0) {
            language = 'Persian';
            emoji = '🇮🇷';
        } else if (farsiCount > 0 && englishCount > 0) {
            language = 'Mixed';
            emoji = '🔀';
        }
        
        return { language, emoji };
    }

    // Frequent Words
    getFrequentWords(text, limit = 10) {
        const words = this.getWords(text)
            .map(w => w.toLowerCase())
            .filter(w => !this.stopWords.includes(w));
        
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        return Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([word, count]) => ({ word, count }));
    }

    // Main analyze function
    analyze(text) {
        return {
            stats: this.getStats(text),
            sentiment: this.analyzeSentiment(text),
            emotions: this.detectEmotions(text),
            language: this.detectLanguage(text),
            frequentWords: this.getFrequentWords(text)
        };
    }
}

// Initialize
const analyzer = new TextAnalyzer();
const textInput = document.getElementById('textInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');

// Event Listeners
analyzeBtn.addEventListener('click', performAnalysis);
clearBtn.addEventListener('click', clearAnalysis);
textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') performAnalysis();
});

// Perform Analysis
function performAnalysis() {
    const text = textInput.value.trim();
    
    if (text.length === 0) {
        alert('Please enter some text to analyze! / لطفاً متنی را وارد کنید!');
        return;
    }
    
    if (text.length < 10) {
        alert('Please enter at least 10 characters! / لطفاً حداقل 10 کاراکتر وارد کنید!');
        return;
    }
    
    // Show loading
    loadingState.style.display = 'flex';
    resultsSection.style.display = 'none';
    analyzeBtn.disabled = true;
    
    // Simulate processing
    setTimeout(() => {
        const results = analyzer.analyze(text);
        displayResults(results);
        
        // Hide loading
        loadingState.style.display = 'none';
        resultsSection.style.display = 'grid';
        analyzeBtn.disabled = false;
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
}

// Display Results
function displayResults(results) {
    // Sentiment
    document.getElementById('sentimentEmoji').textContent = results.sentiment.emoji;
    document.getElementById('sentimentLabel').textContent = 
        results.sentiment.sentiment.charAt(0).toUpperCase() + results.sentiment.sentiment.slice(1);
    document.getElementById('sentimentScore').textContent = results.sentiment.score + '%';
    document.getElementById('sentimentProgress').style.setProperty('--progress', results.sentiment.score + '%');
    
    // Statistics
    document.getElementById('wordCount').textContent = results.stats.wordCount;
    document.getElementById('charCount').textContent = results.stats.charCount;
    document.getElementById('avgLength').textContent = results.stats.avgLength;
    document.getElementById('sentenceCount').textContent = results.stats.sentenceCount;
    
    // Emotions
    document.getElementById('joyProgress').style.setProperty('--progress', results.emotions.joy + '%');
    document.getElementById('joyValue').textContent = Math.round(results.emotions.joy) + '%';
    
    document.getElementById('sadnessProgress').style.setProperty('--progress', results.emotions.sadness + '%');
    document.getElementById('sadnessValue').textContent = Math.round(results.emotions.sadness) + '%';
    
    document.getElementById('angerProgress').style.setProperty('--progress', results.emotions.anger + '%');
    document.getElementById('angerValue').textContent = Math.round(results.emotions.anger) + '%';
    
    document.getElementById('fearProgress').style.setProperty('--progress', results.emotions.fear + '%');
    document.getElementById('fearValue').textContent = Math.round(results.emotions.fear) + '%';
    
    document.getElementById('surpriseProgress').style.setProperty('--progress', results.emotions.surprise + '%');
    document.getElementById('surpriseValue').textContent = Math.round(results.emotions.surprise) + '%';
    
    document.getElementById('trustProgress').style.setProperty('--progress', results.emotions.trust + '%');
    document.getElementById('trustValue').textContent = Math.round(results.emotions.trust) + '%';
    
    // Language
    document.getElementById('languageEmoji').textContent = results.language.emoji;
    document.getElementById('languageName').textContent = results.language.language;
    
    // Frequent Words
    const wordsList = document.getElementById('frequentWords');
    wordsList.innerHTML = '';
    results.frequentWords.forEach(item => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <span class="word-text">${item.word}</span>
            <span class="word-count">${item.count}x</span>
        `;
        wordsList.appendChild(wordItem);
    });
}

// Clear Analysis
function clearAnalysis() {
    textInput.value = '';
    resultsSection.style.display = 'none';
    textInput.focus();
}

// Auto-save to localStorage
textInput.addEventListener('input', () => {
    localStorage.setItem('zixoText', textInput.value);
});

// Load from localStorage on page load
window.addEventListener('load', () => {
    const savedText = localStorage.getItem('zixoText');
    if (savedText) {
        textInput.value = savedText;
    }
    textInput.focus();
});