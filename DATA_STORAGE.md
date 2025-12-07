# 📊 DIGITIHA Data Storage Documentation

## 🗄️ Where is the Data Stored?

The DIGITIHA application uses **browser localStorage** to store all drawing data. This is a client-side storage solution that keeps data persistent in the user's browser.

### Storage Location

- **Location**: Browser localStorage (client-side only)
- **Scope**: Per domain/origin
- **Persistence**: Data remains until manually cleared or browser data is wiped
- **Capacity**: Typically 5-10MB per domain (varies by browser)

### Important Notes

⚠️ **Current Limitations:**
1. Data is stored **locally in each user's browser** - not synced across devices or users
2. If a user clears browser data, their drawings are lost
3. Different browsers/devices will have separate data stores
4. Data is **not sent to any server** by default

## 📋 Data Structure

### 1. Drawings Storage

**Key**: `mnist_drawings`

**Structure**:
```json
[
  {
    "id": "1733577600000-0.123456",
    "username": "Alice",
    "digit": 7,
    "imageData": [0, 0, 0, 255, 255, ...], // 784 values (28x28 pixels)
    "timestamp": "2025-12-07T12:34:56.789Z"
  },
  {
    "id": "1733577601000-0.789012",
    "username": "Bob",
    "digit": 3,
    "imageData": [0, 0, 0, 128, 255, ...],
    "timestamp": "2025-12-07T12:35:01.234Z"
  }
]
```

**Fields**:
- `id`: Unique identifier (timestamp + random)
- `username`: Name of the contributor
- `digit`: The digit that was drawn (0-9)
- `imageData`: Array of 784 grayscale values (28×28 = 784 pixels), each value 0-255
- `timestamp`: ISO 8601 formatted date/time

### 2. Users Storage

**Key**: `mnist_users`

**Structure**:
```json
{
  "Alice": {
    "count": 25,
    "joinedAt": "2025-12-07T10:00:00.000Z"
  },
  "Bob": {
    "count": 15,
    "joinedAt": "2025-12-07T11:30:00.000Z"
  }
}
```

**Fields**:
- Key: Username
- `count`: Total number of drawings by this user
- `joinedAt`: When the user first started drawing

## 🔧 Accessing the Data

### In Browser Console

You can access the data directly in the browser console:

```javascript
// Get all drawings
const drawings = JSON.parse(localStorage.getItem('mnist_drawings'));
console.log(drawings);

// Get all users
const users = JSON.parse(localStorage.getItem('mnist_users'));
console.log(users);

// Count total drawings
const drawings = JSON.parse(localStorage.getItem('mnist_drawings'));
console.log(`Total drawings: ${drawings.length}`);

// Get drawings for a specific user
const userDrawings = drawings.filter(d => d.username === 'Alice');
console.log(`Alice's drawings:`, userDrawings);
```

### Through Admin Dashboard

The admin dashboard (login required) provides:
- **Export functionality**: Download all data as JSON and CSV files
- **Metrics**: Total drawings, users, averages, digit distribution
- **Filtering**: Search drawings by username
- **Full table view**: See all entries with timestamps

## 📥 Exporting Data

### Method 1: Admin Dashboard
1. Login to admin dashboard
2. Click "Export Data" button
3. Receives two files:
   - `mnist-data-export-[timestamp].json` - Complete data
   - `mnist-data-export-[timestamp].csv` - Spreadsheet format

### Method 2: Browser Console
```javascript
// Export as JSON
const drawings = localStorage.getItem('mnist_drawings');
const blob = new Blob([drawings], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'drawings.json';
a.click();
```

## 🔄 Migrating to Backend Storage

To make data persistent across devices and users, you'll need to implement backend storage:

### Recommended Solutions:

#### Option 1: Vercel + PostgreSQL (Recommended)
```typescript
// Use Vercel Postgres
import { sql } from '@vercel/postgres';

export async function saveDrawing(drawing) {
  await sql`
    INSERT INTO drawings (username, digit, image_data, timestamp)
    VALUES (${drawing.username}, ${drawing.digit}, ${drawing.imageData}, ${drawing.timestamp})
  `;
}
```

#### Option 2: Supabase
- Free tier includes database and storage
- Easy authentication
- Real-time updates

#### Option 3: Firebase
- Firestore for document storage
- Real-time synchronization
- Free tier available

### Migration Steps:

1. **Set up database** (choose option above)
2. **Create API routes** in `app/api/`
3. **Update storage.ts** to use API calls instead of localStorage
4. **Add authentication** for users (optional but recommended)
5. **Migrate existing data** using export/import

## 🔒 Privacy & Security

### Current Implementation:
- ✅ Data stored locally (private to each user's browser)
- ✅ No data sent to external servers
- ✅ Admin credentials secured in code
- ⚠️ No encryption (localStorage is plain text)

### Recommendations for Production:
1. **Backend storage**: Move to secure database
2. **Environment variables**: Store credentials in `.env` files
3. **Authentication**: Implement proper user auth (JWT, OAuth)
4. **HTTPS**: Ensure all connections are encrypted
5. **Rate limiting**: Prevent spam/abuse
6. **Data validation**: Sanitize inputs
7. **Backup system**: Regular automated backups

## 📊 Using the Data for ML Training

The exported data is in MNIST-compatible format:

### Image Data Format:
- **Size**: 28×28 pixels = 784 values
- **Values**: 0 (white) to 255 (black) grayscale
- **Type**: Flattened 1D array

### Converting to NumPy Array:
```python
import json
import numpy as np

# Load JSON export
with open('mnist-data-export.json', 'r') as f:
    data = json.load(f)

# Extract images and labels
images = []
labels = []

for drawing in data['drawings']:
    # Convert to 28x28 numpy array
    img = np.array(drawing['imageData']).reshape(28, 28)
    images.append(img)
    labels.append(drawing['digit'])

images = np.array(images)
labels = np.array(labels)

print(f"Dataset shape: {images.shape}")
print(f"Labels shape: {labels.shape}")

# Normalize to 0-1 range
images = images.astype('float32') / 255.0

# Ready for training!
```

### Using with TensorFlow/Keras:
```python
import tensorflow as tf

# Create dataset
dataset = tf.data.Dataset.from_tensor_slices((images, labels))
dataset = dataset.shuffle(1000).batch(32)

# Train your model
model.fit(dataset, epochs=10)
```

## 🆘 Troubleshooting

### Data Not Saving?
- Check browser console for errors
- Verify localStorage is enabled (not in incognito without permission)
- Check available storage space

### Data Lost?
- Browser cache cleared
- Using different browser/device
- Incognito mode (data not persistent)

### Export Not Working?
- Check popup blocker settings
- Ensure JavaScript is enabled
- Try different browser

## 📞 Support

For questions about data storage:
- Check this documentation
- Review the code in `utils/storage.ts`
- Contact the FORSA team

---

**Last Updated**: December 7, 2025
