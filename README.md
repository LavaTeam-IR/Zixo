# 💈 Zixo - Smart Text Analyzer

<div dir="rtl">

## 🎯 درباره پروژه

**Zixo** یک تحلیل‌گر متن هوشمند است که بدون نیاز به سرور یا API خارجی، متن شما را تجزیه و تحلیل می‌کند. این ابزار می‌تواند احساسات، احساسات شناخته‌شده، آمار متن، زبان و کلمات پرتکرار را شناسایی کند.

### ✨ ویژگی‌های اصلی

- 🎭 **تحلیل احساسات** - تشخیص احساس مثبت/منفی/خنثی متن
- 😊 **تشخیص احساسات** - شناسایی 6 نوع احساس مختلف
- 📊 **آمار متن** - محاسبه تعداد کلمات، حروف، میانگین طول کلمه و جملات
- 🌍 **تشخیص زبان** - شناسایی خودکار زبان فارسی/انگلیسی/مختلط
- 🔤 **کلمات پرتکرار** - نمایش 10 کلمه پرتکرار‌تر در متن
- ⚡ **سریع و آفلاین** - بدون نیاز به اتصال اینترنت برای تحلیل
- 🎨 **رابط کاربری زیبا** - طراحی مدرن و پاسخ‌گو

### 💻 فناوری‌های استفاده‌شده

- **HTML5** - ساختار سایت
- **CSS3** - طراحی و استایل (با متغیرهای CSS)
- **JavaScript (Vanilla)** - منطق تحلیل و تعامل
- **TensorFlow.js** - برای پردازش‌های توسعه‌یافته (آماده برای توسعه‌های آینده)
- **GitHub Pages** - میزبانی رایگان

### 🚀 نحوه استفاده

1. متن خود را در جعبه ورودی بنویسید یا paste کنید
2. دکمه **\"تحلیل کن\"** را کلیک کنید
3. نتایج تحلیل را در زیر ببینید

### 📋 نتایج تحلیل

#### 1. احساسات
- نمایش احساس اصلی متن (مثبت/منفی/خنثی)
- نمایش درجه احساس (0-100%)
- نمایش emoji نشان‌دهنده

#### 2. آمار متن
- تعداد کلمات
- تعداد حروف
- میانگین طول کلمه
- تعداد جملات

#### 3. احساسات شناخته‌شده
نمایش درجه احساسات مختلف:
- 😊 شادی
- 😔 غم
- 😠 خشم
- 😨 ترس
- 😲 تعجب
- 🤝 اعتماد

#### 4. تشخیص زبان
- فارسی
- انگلیسی
- مختلط
- نامشخص

#### 5. کلمات پرتکرار
نمایش 10 کلمه پرتکرار‌تر با تعداد تکرار

### 📱 پاسخ‌گویی

سایت برای تمام ابعاد صفحه (موبایل، تبلت، دسکتاپ) بهینه‌سازی شده است.

### 🔧 نصب و اجرا

```bash
# 1. Repository را Clone کنید
git clone https://github.com/LavaTeam-IR/Zixo.git

# 2. به پوشه وارد شوید
cd Zixo

# 3. فایل index.html را در مرورگر باز کنید
# یا یک سرور محلی راه‌اندازی کنید:
python -m http.server 8000
# سپس به http://localhost:8000 بروید
```

### 📂 ساختار پروژه

```
Zixo/
├── index.html      # فایل HTML اصلی
├── style.css       # استایل و طراحی
├── script.js       # منطق تحلیل و تعامل
└── README.md       # این فایل
```

### 🎨 رنگ‌های استفاده‌شده

- **پیشینه**: `#0f172a` (آبی تیره)
- **کارت‌ها**: `#1e293b` (آبی خیلی تیره)
- **اصلی**: `#6366f1` (بنفش)
- **ثانویه**: `#8b5cf6` (بنفش روشن)
- **موفقیت**: `#10b981` (سبز)
- **هشدار**: `#f59e0b` (نارنجی)
- **خطر**: `#ef4444` (قرمز)

### 🔄 نسخه‌ها

#### نسخه 1.0.0 (فعلی)
- تحلیل احساسات پایه
- تشخیص احساسات
- آمار متن
- تشخیص زبان
- کلمات پرتکرار

### 📄 مجوز

این پروژه تحت مجوز **MIT** منتشر شده است.

### 👨‍💻 توسعه‌دهنده

- **LavaTeam-IR** - توسعه‌دهنده اصلی

### 🤝 مشارکت

اگر تمایل به مشارکت دارید:

1. Repository را Fork کنید
2. یک Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به Branch Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

### 🐛 گزارش مشکلات

اگر با مشکلی برخورد کردید، لطفاً یک **Issue** باز کنید.

### ✅ نقشه راه آینده

- [ ] افزودن API OpenAI برای تحلیل پیشرفته‌تر
- [ ] اضاف�� کردن تحلیل احساسات دقیق‌تر با مدل‌های ML
- [ ] صادر کردن نتایج به فرمت‌های مختلف (PDF, JSON, CSV)
- [ ] اضافه کردن درک مفهومی متن
- [ ] اضافه کردن ترجمه خودکار
- [ ] ذخیره‌سازی تاریخچه تحلیل‌ها
- [ ] پشتیبانی از زبان‌های بیشتر

---

</div>

---

## 🎯 About Project

**Zixo** is a smart text analyzer that analyzes your text without needing external servers or APIs. This tool can identify sentiments, emotions, text statistics, language, and frequently used words.

### ✨ Key Features

- 🎭 **Sentiment Analysis** - Detecting positive/negative/neutral sentiment in text
- 😊 **Emotion Detection** - Identifying 6 different types of emotions
- 📊 **Text Statistics** - Calculating word count, character count, average word length, and sentences
- 🌍 **Language Detection** - Automatic detection of Persian/English/Mixed languages
- 🔤 **Frequent Words** - Displaying the top 10 most repeated words in the text
- ⚡ **Fast & Offline** - No need for internet connection for analysis
- 🎨 **Beautiful UI** - Modern and responsive design

### 💻 Technologies Used

- **HTML5** - Website structure
- **CSS3** - Design and styling (with CSS variables)
- **JavaScript (Vanilla)** - Analysis logic and interaction
- **TensorFlow.js** - For advanced processing (ready for future development)
- **GitHub Pages** - Free hosting

### 🚀 How to Use

1. Write or paste your text in the input box
2. Click the **\"Analyze\"** button
3. View the analysis results below

### 📋 Analysis Results

#### 1. Sentiment
- Display main sentiment of text (positive/negative/neutral)
- Sentiment score (0-100%)
- Representative emoji

#### 2. Text Statistics
- Word count
- Character count
- Average word length
- Sentence count

#### 3. Detected Emotions
Display different emotion levels:
- 😊 Joy
- 😔 Sadness
- 😠 Anger
- 😨 Fear
- 😲 Surprise
- 🤝 Trust

#### 4. Language Detection
- Persian
- English
- Mixed
- Unknown

#### 5. Frequent Words
Display top 10 most repeated words with their counts

### 📱 Responsiveness

The website is optimized for all screen sizes (mobile, tablet, desktop).

### 🔧 Installation & Usage

```bash
# 1. Clone the repository
git clone https://github.com/LavaTeam-IR/Zixo.git

# 2. Navigate to the directory
cd Zixo

# 3. Open index.html in your browser
# Or run a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### 📂 Project Structure

```
Zixo/
├── index.html      # Main HTML file
├── style.css       # Styles and design
├── script.js       # Analysis logic and interaction
└── README.md       # This file
```

### 🎨 Colors Used

- **Background**: `#0f172a` (Dark Blue)
- **Cards**: `#1e293b` (Very Dark Blue)
- **Primary**: `#6366f1` (Purple)
- **Secondary**: `#8b5cf6` (Light Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)

### 🔄 Versions

#### Version 1.0.0 (Current)
- Basic sentiment analysis
- Emotion detection
- Text statistics
- Language detection
- Frequent words

### 📄 License

This project is released under the **MIT** license.

### 👨‍💻 Developer

- **LavaTeam-IR** - Main developer

### 🤝 Contributing

If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 🐛 Report Issues

If you encounter any issues, please open an **Issue**.

### ✅ Future Roadmap

- [ ] Add OpenAI API for advanced analysis
- [ ] Add more accurate sentiment analysis with ML models
- [ ] Export results to different formats (PDF, JSON, CSV)
- [ ] Add text comprehension
- [ ] Add automatic translation
- [ ] Save analysis history
- [ ] Support more languages

---

**Built with ❤️ by LavaTeam-IR**