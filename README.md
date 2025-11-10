# Nhật Vũ Nguyễn - 3D Solar System Portfolio

An interactive 3D solar system portfolio built with React Three Fiber, showcasing software engineering skills through an immersive space exploration experience.

## 🚀 Features

- **Interactive 3D Solar System**: Each planet represents a different portfolio section
- **Space Shuttle Navigation**: Animated shuttle with "Nhat-Vu Nguyen" label that travels between planets
- **Smooth Animations**: Powered by React Spring for fluid transitions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **PWA Support**: Installable as a desktop/mobile app
- **Performance Optimized**: LOD systems, texture caching, and memory management
- **Accessible**: Full keyboard navigation and screen reader support
- **SEO Friendly**: Optimized meta tags and structured data

## 🌍 Portfolio Sections

1. **About Planet** - Personal introduction and background
2. **Skills Planet** - Technical skills with proficiency levels
3. **Tools Planet** - Development tools and technologies
4. **Projects Planet** - Featured projects with live links
5. **Experience Planet** - Career timeline and journey
6. **Contact Planet** - Contact information and social links

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Animations**: React Spring, Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-threejs
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/
│   ├── 3d/                    # 3D components
│   │   ├── scene/            # Scene setup and lighting
│   │   ├── planets/          # Planet components
│   │   ├── shuttle/          # Space shuttle components
│   │   └── SolarSystem.tsx   # Main solar system
│   └── ui/                   # UI components
│       ├── ContentModal.tsx  # Planet content modals
│       ├── LoadingScreen.tsx # Loading screen
│       └── NavigationUI.tsx  # Navigation interface
├── data/
│   └── planetData.ts         # Portfolio content data
├── store/
│   └── portfolioStore.ts     # Zustand state management
├── types/                    # TypeScript definitions
├── utils/                    # Utility functions
│   ├── accessibility.ts      # Accessibility helpers
│   ├── performance.ts        # Performance optimization
│   └── seo.ts               # SEO utilities
└── App.tsx                   # Main application component
```

## 🎮 Controls

### Mouse/Touch
- **Click planets** to navigate and view content
- **Drag** to rotate the camera view
- **Scroll** to zoom in/out
- **Hover** over planets for labels

### Keyboard
- **Tab** to navigate between interactive elements
- **Enter/Space** to select focused planet
- **Escape** to close modals
- **Arrow Keys** for alternative navigation

## ⚡ Performance Features

### LOD (Level of Detail)
- Automatic geometry simplification based on camera distance
- Reduces polygon count for distant objects
- Maintains smooth 60fps performance

### Texture Management
- Efficient texture caching and loading
- Automatic memory cleanup
- Support for texture preloading

### Memory Optimization
- Geometry reuse system
- Automatic disposal of unused resources
- Memory usage monitoring

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
VITE_GA_ID=your-google-analytics-id
VITE_SITE_URL=https://your-domain.com
```

### Customization

#### Adding New Planets
1. Update `src/data/planetData.ts` with new planet information
2. Add corresponding content sections
3. Adjust orbital parameters and visual styling

#### Modifying Colors
Update the color palette in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'space-blue': '#0f172a',
      'tech-cyan': '#06b6d4',
      // ... other colors
    }
  }
}
```

#### Performance Tuning
Adjust performance settings in `src/utils/performance.ts`:

```js
// LOD distance thresholds
private distanceThresholds = [10, 30, 60, 100]

// Target FPS
const targetFPS = 60
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

#### Vercel/Netlify
1. Run `npm run build`
2. Deploy the `dist` folder
3. Configure redirect rules for SPA

#### Custom Server
1. Build the project: `npm run build`
2. Serve the `dist` folder with a web server
3. Configure SPA routing to redirect all routes to `index.html`

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: ARIA labels and live regions for dynamic content
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Supports high contrast mode
- **Focus Management**: Proper focus trapping in modals

## 📊 SEO Features

- **Meta Tags**: Dynamic meta tag updates
- **Structured Data**: JSON-LD for search engines
- **Open Graph**: Social media sharing optimization
- **Analytics**: Google Analytics integration
- **Semantic HTML**: Proper HTML5 semantic structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

- **Email**: nhatvu.nguyen@example.com
- **GitHub**: https://github.com/nhatvu148
- **LinkedIn**: https://linkedin.com/in/nhatvu-nguyen

## 🙏 Acknowledgments

- React Three Fiber team for the amazing 3D React library
- Three.js community for excellent 3D graphics tools
- Tailwind CSS for the utility-first CSS framework
- All open source contributors who made this project possible