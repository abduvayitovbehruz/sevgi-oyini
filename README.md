# 💕 Sevgi O'yini

Telegram Web App orqali ochiluvchi, pushti yurakchali interaktiv sevgi o'yini.

## 📁 Fayl tuzilmasi

```
sevgi-oyini/
├── index.html   ← sahifa tuzilmasi
├── style.css    ← barcha dizayn va animatsiyalar
├── app.js       ← o'yin mantiqi
└── README.md
```

## 🚀 GitHub Pages orqali nashr etish

### 1. GitHub repo yaratish
1. [github.com](https://github.com) ga kiring
2. **New repository** bosing
3. Nom bering (masalan: `sevgi-oyini`)
4. **Public** tanlang
5. **Create repository** bosing

### 2. Fayllarni yuklash
```bash
git init
git add .
git commit -m "Sevgi o'yini"
git branch -M main
git remote add origin https://github.com/SIZNING/sevgi-oyini.git
git push -u origin main
```

### 3. GitHub Pages yoqish
1. Repo sahifasida **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / `/ (root)`
4. **Save** bosing
5. Bir necha daqiqadan so'ng:
   `https://SIZNING.github.io/sevgi-oyini/`

## 📱 Telegram Web App ulash

Telegram botga ulash uchun [@BotFather](https://t.me/BotFather) orqali:

```
/mybots → botingizni tanlang
Bot Settings → Menu Button → Edit Menu Button URL
→ https://SIZNING.github.io/sevgi-oyini/
```

Yoki do'stingizga oddiy havola sifatida yuboring — Telegram ichida ochiladi.

## 🎬 Yig'lagan video qo'shish

`app.js` faylining 3-qatorida:
```js
const CRY_VIDEO = 'https://youtube.com/shorts/...' // o'z video linkingizni yozing
```

YouTube, TikTok, yoki boshqa istalgan URL ishlaydi.

## ✨ O'yin qanday ishlaydi

1. **Asosiy ekran** — "Meni sevasanmi?" savoli + 2 tugma
2. **"Yo'q"** tugmasi sichqoncha yaqinlashganda qochib ketadi
3. **"Albatta sevaman"** → tasdiqlash ekrani
4. **"Ha, hayotim!"** → konfetti + tabrik 🎊
5. **"Yo'q"** → yig'lagan video ochiladi 😢
