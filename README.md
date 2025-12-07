# DIGITIHA 🔥🚀 - Handwritten Digit Collection Platform

A stunning, galaxy-inspired web application for collecting handwritten digit data to test CNN model generalization on MNIST-style datasets.

> **GitHub Repository**: [https://github.com/HamzaAbdelazizDia/MNIST_Digits.git](https://github.com/HamzaAbdelazizDia/MNIST_Digits.git)

## ✨ Features

### 🎨 **Drawing Interface**
- Interactive 28×28 pixel canvas for digit drawing
- Touch and mouse support for all devices
- Real-time drawing with smooth rendering
- Clear and submit functionality
- Beautiful galaxy-themed background with animated stars

### 🎯 **Smart Digit Randomization**
- Each user gets digits 0-9 in random order per session
- Cycles through all 10 digits before reshuffling
- Prevents user boredom with variety

### 🏆 **Leaderboard**
- Real-time ranking of contributors
- Top 3 users highlighted with medals (🥇🥈🥉)
- Scrollable interface showing all participants
- Tracks total drawings per user

### 🔐 **Admin Dashboard**
- Secure login with private credentials
- Comprehensive metrics:
  - Total drawings count
  - Total users count
  - Average drawings per user
  - Digit distribution chart
- User filtering functionality
- Export data in JSON and CSV formats
- Complete entry table with timestamps

### 🌌 **Design**
- Galaxy-inspired background with orange and yellow nebula effects
- Animated stars and cosmic atmosphere
- DIGITIHA branding with fire effect 🔥
- Smooth gradient animations
- Glowing effects and transitions
- Fully mobile-optimized
- Touch-friendly interface

## 📊 Data Storage

**Important**: Data is currently stored in browser localStorage (client-side only).

For complete information about data storage, access, and export:
👉 **See [DATA_STORAGE.md](./DATA_STORAGE.md)**

Key points:
- Data stored locally in each user's browser
- Admin dashboard provides export functionality
- See documentation for backend migration options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/HamzaAbdelazizDia/MNIST_Digits.git
cd MNIST_Digits
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment on Vercel

### Method 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow the prompts:**
- Login to your Vercel account
- Select project settings
- Deploy!

### Method 2: Deploy via Vercel Dashboard

1. **Your code is already on GitHub:**
```
https://github.com/HamzaAbdelazizDia/MNIST_Digits.git
```

2. **Go to [vercel.com](https://vercel.com)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure project:**
- Framework Preset: **Next.js**
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`

6. **Click "Deploy"**

Your app will be live in minutes! 🎉

## 📊 Data Export Format

### JSON Export
```json
{
  "drawings": [
    {
      "id": "unique-id",
      "username": "John",
      "digit": 5,
      "imageData": [0, 0, 255, ...], // 784 values (28×28)
      "timestamp": "2025-12-07T..."
    }
  ],
  "users": {
    "John": {
      "count": 42,
      "joinedAt": "2025-12-07T..."
    }
  },
  "totalDrawings": 420,
  "totalUsers": 10
}
```

### CSV Export
Each row contains:
- ID
- Username
- Digit (0-9)
- Timestamp
- ImageData (784 semicolon-separated pixel values)

Perfect format for training your CNN models! 🤖

## 🛠 Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Storage:** LocalStorage (client-side)
- **Deployment:** Vercel

## 📱 Mobile Optimization

The app is fully responsive and optimized for:
- Touch drawing with fingers
- Mobile-first UI components
- Smooth animations on all devices
- Easy navigation on small screens

## 🔒 Admin Access

Admin credentials are secured in the codebase for privacy.

Use the admin dashboard to:
- Monitor data collection progress
- Export datasets for ML training
- View detailed analytics
- Filter entries by user

## 🎯 Use Cases

1. **CNN Model Testing:** Collect real handwritten data to test model generalization
2. **Dataset Augmentation:** Expand MNIST-style datasets with diverse handwriting
3. **Research:** Study handwriting patterns across different users
4. **Education:** Teach ML concepts with real data collection

## 📝 Project Structure

```
mnist-data/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx
│   ├── WelcomeCard.tsx
│   ├── DrawingCanvas.tsx
│   ├── Leaderboard.tsx
│   ├── AdminLoginModal.tsx
│   ├── AdminDashboard.tsx
│   └── SuccessAnimation.tsx
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── storage.ts       # Data management utilities
├── styles/
│   └── globals.css      # Custom styles
└── package.json
```

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

Free to use for research and educational purposes.

## 🎉 Credits

Created for CNN model testing and MNIST dataset research.

---

**Made with ❤️, 🚀, and 🔥**

Enjoy collecting handwritten digits! 🎨✨
