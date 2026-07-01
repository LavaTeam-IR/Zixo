// =============================================
// 💈 Zixo - Smart Text Analyzer
// =============================================

// DOM Elements
const textInput = document.getElementById('textInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const spinner = document.getElementById('spinner');

// Event Listeners
analyzeBtn.addEventListener('click', analyzeText);
clearBtn.addEventListener('click', clearText);
textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') analyzeText();
});

// =============================================
// Main Analysis Function
// =============================================
async function analyzeText() {
    const text = textInput.value.trim();

    if (!text) {
        alert('لطفاً متنی وارد کنید! | Please enter some text!');
        return;
    }

    showSpinner(true);
    analyzeBtn.disabled = true;

    try {
        // Calculate statistics
        const stats = calculateStatistics(text);
        
        // Detect sentiment
        const sentiment = detectSentiment(text);
        
        // Detect emotions
        const emotions = detectEmotions(text);
        
        // Detect language
        const language = detectLanguage(text);
        
        // Get top words
        const topWords = getTopWords(text);

        // Display results
        displayResults(sentiment, stats, emotions, language, topWords);
        resultsSection.style.display = 'block';

    } catch (error) {
        console.error('Error during analysis:', error);
        alert('خطا در تحلیل متن | Error analyzing text');
    } finally {
        showSpinner(false);
        analyzeBtn.disabled = false;
    }
}

// =============================================
// Text Statistics
// =============================================
function calculateStatistics(text) {
    // Character count
    const charCount = text.length;

    // Word count
    const words = text.match(/\b\w+\b/g) || [];
    const wordCount = words.length;

    // Average word length
    const avgWordLength = wordCount > 0 
        ? (words.reduce((sum, word) => sum + word.length, 0) / wordCount).toFixed(2)
        : 0;

    // Sentence count
    const sentences = text.match(/[.!?]+/g) || [];
    const sentenceCount = sentences.length > 0 ? sentences.length : 1;

    return {
        charCount,
        wordCount,
        avgWordLength,
        sentenceCount
    };
}

// =============================================
// Sentiment Analysis
// =============================================
function detectSentiment(text) {
    const lowerText = text.toLowerCase();

    // Positive keywords
    const positiveKeywords = [
        'خوب', 'بهترین', 'عالی', 'فوق‌العاده', 'دوست‌داشتنی', 'زیبا',
        'شاد', 'خوشحال', 'موفق', 'برتر', 'فرهنگ', 'دوست', 'عشق',
        'love', 'great', 'excellent', 'amazing', 'wonderful', 'beautiful',
        'good', 'happy', 'best', 'awesome', 'fantastic', 'perfect',
        'brilliant', 'lovely', 'terrific', 'superb', 'outstanding'
    ];

    // Negative keywords
    const negativeKeywords = [
        'بد', 'بدترین', 'فجیع', 'ناپذیر', 'شکست', 'غمگین',
        'ناراحت', 'ناامید', 'تنها', 'دلگیر', 'غصه', 'درد',
        'hate', 'terrible', 'awful', 'horrible', 'bad', 'worst',
        'ugly', 'sad', 'angry', 'disappointed', 'depressed', 'poor',
        'failed', 'sucks', 'disgusting', 'pathetic', 'atrocious'
    ];

    // Count keywords
    let positiveCount = 0;
    let negativeCount = 0;

    positiveKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex) || [];
        positiveCount += matches.length;
    });

    negativeKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex) || [];
        negativeCount += matches.length;
    });

    // Determine sentiment
    let sentiment = 'neutral';
    let emoji = '😐';
    let score = 0;

    if (positiveCount > negativeCount) {
        sentiment = 'مثبت | Positive';
        emoji = '😊';
        score = ((positiveCount - negativeCount) / (positiveCount + negativeCount || 1) * 100).toFixed(1);
    } else if (negativeCount > positiveCount) {
        sentiment = 'منفی | Negative';
        emoji = '😔';
        score = ((negativeCount - positiveCount) / (positiveCount + negativeCount || 1) * 100).toFixed(1);
    } else {
        sentiment = 'خنثی | Neutral';
        emoji = '😐';
        score = 0;
    }

    return {
        sentiment,
        emoji,
        score: Math.abs(parseFloat(score)),
        type: sentiment.includes('Positive') ? 'positive' : (sentiment.includes('Negative') ? 'negative' : 'neutral')
    };
}

// =============================================
// Emotion Detection
// =============================================
function detectEmotions(text) {
    const lowerText = text.toLowerCase();

    const emotionKeywords = {
        'Joy / شادی': ['خوشحال', 'شاد', 'سرور', 'joy', 'happy', 'glad', 'cheerful'],
        'Sadness / غم': ['غمگین', 'ناراحت', 'دلگیر', 'sad', 'unhappy', 'depressed', 'melancholy'],
        'Anger / خشم': ['عصبانی', 'خشمگین', 'عصبی', 'angry', 'furious', 'mad', 'annoyed'],
        'Fear / ترس': ['ترسناک', 'بیم', 'وحشت', 'fear', 'scared', 'afraid', 'terrified'],
        'Surprise / تعجب': ['شگفت‌زده', 'متعجب', 'غافل‌گیر', 'surprised', 'amazed', 'shocked', 'astonished'],
        'Trust / اعتماد': ['اعتماد', 'قابل‌اعتماد', 'معتمد', 'trust', 'confident', 'reliable', 'secure']
    };

    const emotions = {};

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
        let count = 0;
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const matches = text.match(regex) || [];
            count += matches.length;
        });
        emotions[emotion] = count;
    }

    return emotions;
}

// =============================================
// Language Detection
// =============================================
function detectLanguage(text) {
    const persianRegex = /[\u0600-\u06FF]/g;
    const englishRegex = /[a-zA-Z]/g;

    const persianCount = (text.match(persianRegex) || []).length;
    const englishCount = (text.match(englishRegex) || []).length;

    if (persianCount > englishCount) {
        return 'فارسی | Persian';
    } else if (englishCount > persianCount) {
        return 'انگلیسی | English';
    } else if (persianCount > 0 && englishCount > 0) {
        return 'مختلط | Mixed';
    } else {
        return 'نامشخص | Unknown';
    }
}

// =============================================
// Get Top Words
// =============================================
function getTopWords(text) {
    // Remove punctuation and split
    const words = text
        .toLowerCase()
        .match(/\b[\u0600-\u06FFa-zA-Z]+\b/g) || [];

    // Stop words to exclude
    const stopWords = [
        'و', 'یا', 'اما', 'برای', 'با', 'از', 'در', 'به', 'است', 'که',
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'of', 'is', 'are', 'be', 'for', 'with', 'by'
    ];

    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
        if (!stopWords.includes(word) && word.length > 2) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });

    // Sort and get top 10
    const topWords = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));

    return topWords;
}

// =============================================
// Display Results
// =============================================
function displayResults(sentiment, stats, emotions, language, topWords) {
    // Update Sentiment
    const sentimentGauge = document.getElementById('sentimentGauge');
    const sentimentLabel = document.getElementById('sentimentLabel');
    const sentimentScore = document.getElementById('sentimentScore');

    sentimentGauge.textContent = sentiment.emoji;
    sentimentGauge.className = `sentiment-gauge ${sentiment.type}`;
    sentimentLabel.textContent = sentiment.sentiment;
    sentimentScore.textContent = `Score: ${sentiment.score}%`;

    // Update Statistics
    document.getElementById('wordCount').textContent = stats.wordCount;
    document.getElementById('charCount').textContent = stats.charCount;
    document.getElementById('avgWordLength').textContent = stats.avgWordLength;
    document.getElementById('sentenceCount').textContent = stats.sentenceCount;

    // Update Emotions
    const emotionBars = document.getElementById('emotionBars');
    emotionBars.innerHTML = '';

    const maxEmotionCount = Math.max(...Object.values(emotions), 1);

    for (const [emotion, count] of Object.entries(emotions)) {
        const percentage = (count / maxEmotionCount) * 100;
        const emotionBar = document.createElement('div');
        emotionBar.className = 'emotion-bar';
        emotionBar.innerHTML = `
            <span class="emotion-name">${emotion}</span>
            <div class="emotion-progress">
                <div class="emotion-fill" style="width: ${percentage}%">
                    ${percentage > 10 ? (percentage.toFixed(0) + '%') : ''}
                </div>
            </div>
            <span class="emotion-value">${count}</span>
        `;
        emotionBars.appendChild(emotionBar);
    }

    // Update Language
    document.getElementById('languageResult').textContent = language;

    // Update Top Words
    const wordsList = document.getElementById('wordsList');
    wordsList.innerHTML = '';

    topWords.forEach(({ word, count }) => {
        const wordTag = document.createElement('div');
        wordTag.className = 'word-tag';
        wordTag.innerHTML = `
            <span>${word}</span>
            <span class="word-count">×${count}</span>
        `;
        wordsList.appendChild(wordTag);
    });
}

// =============================================
// Clear Function
// =============================================
function clearText() {
    textInput.value = '';
    resultsSection.style.display = 'none';
    textInput.focus();
}

// =============================================
// Helper Functions
// =============================================
function showSpinner(show) {
    spinner.style.display = show ? 'flex' : 'none';
}

// =============================================
// Initialize
// =============================================
window.addEventListener('load', () => {
    textInput.focus();
    console.log('🧠 Zixo Text Analyzer loaded successfully!');
});
