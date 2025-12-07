# 🎨 MNIST Draw - Quick Reference

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌐 Access URLs

- **Development:** http://localhost:3000
- **Production:** https://your-app.vercel.app

## 🔑 Admin Access

Admin credentials are secured in the code.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page (home)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── WelcomeCard.tsx
│   ├── DrawingCanvas.tsx
│   ├── Leaderboard.tsx
│   ├── AdminLoginModal.tsx
│   ├── AdminDashboard.tsx
│   └── SuccessAnimation.tsx
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── styles/               # CSS files
└── public/               # Static assets (if needed)
```

## ✨ Key Features

### For Users:
1. Enter name to start
2. Draw digits 0-9 in random order
3. Submit drawings
4. View leaderboard ranking

### For Admin:
1. Login with credentials
2. View comprehensive stats
3. Filter entries by username
4. Export data (JSON + CSV)

## 🎨 Design Tokens

```css
/* Colors */
--fire-orange: #ff6b35
--fire-gold: #ffd700
--rocket-purple: #667eea
--dark-bg: #0a0e27
--card-bg: #14192f

/* Animations */
- float (3s)
- flicker (1.5s)
- pulse-glow (2s)
- bounce-in (0.5s)
```

## 📊 Data Format

Each drawing is stored as:
```typescript
{
  id: string;              // Unique identifier
  username: string;        // User who drew it
  digit: number;          // 0-9
  imageData: number[];    // 784 values (28×28 pixels)
  timestamp: string;      // ISO timestamp
}
```

## 🔧 Customization Ideas

### Change Admin Credentials
Edit `components/AdminLoginModal.tsx`:
```typescript
const ADMIN_USERNAME = 'your-username';
const ADMIN_PASSWORD = 'your-password';
```

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  fire: {
    orange: '#your-color',
    gold: '#your-color',
  }
}
```

### Add More Metrics
Edit `components/AdminDashboard.tsx` and add new metric cards

### Change Canvas Size
Edit `components/DrawingCanvas.tsx`:
```typescript
width={280}  // Display size
height={280}
// Downsample to 28x28 happens automatically
```

## 📱 Mobile Testing

Test on:
- Chrome DevTools (F12 → Toggle Device Toolbar)
- Real mobile device
- Different screen sizes

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails
```bash
npm run build
# Check error message and fix TypeScript/React issues
```

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Data not persisting
- Check browser's LocalStorage (DevTools → Application → LocalStorage)
- Data is per-domain and per-browser
- Clear browser cache may delete data

## 🚀 Performance Tips

1. **Optimize images** - Use Next.js Image component if adding images
2. **Code splitting** - Already handled by Next.js
3. **Lazy loading** - Use React.lazy() for heavy components
4. **Memoization** - Use React.memo() for expensive renders

## 📊 Analytics

Add Vercel Analytics:
```bash
npm install @vercel/analytics
```

Then in `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Add in body:
<Analytics />
```

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Share link with friends
3. ✅ Collect data
4. ✅ Export for ML training
5. ✅ Test CNN models!

## 📞 Support

- **Documentation:** README.md
- **Deployment:** DEPLOYMENT.md
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

---

**Happy coding! 🚀🔥**
