# Nutriloom AI 🍳✨

**Weaving Nutrition Into Every Meal**

An AI-powered recipe generation platform that creates personalized, nutritious recipes tailored to your ingredients, dietary preferences, and cooking skill level.

## 🌟 Features

### Core Features
- **AI Recipe Generation**: Create unlimited personalized recipes using advanced AI
- **Smart Ingredient Analysis**: Input your available ingredients and get creative recipe suggestions
- **Multi-Cuisine Support**: Generate recipes from 60+ international cuisines
- **Skill Level Adaptation**: Recipes tailored to Amateur, Professional, or Legendary cooking levels
- **Nutritional Analysis**: Complete macro and micronutrient breakdown for every recipe
- **Recipe Library**: Save and organize your favorite AI-generated recipes

### Premium Features (Pro Plan)
- **SYD - Scan Your Dish**: AI-powered image analysis for nutritional breakdown
- **Unlimited Generations**: No monthly limits on recipe creation
- **Legendary Recipes**: Restaurant-quality techniques and sophisticated culinary artistry
- **Advanced Nutritional Analysis**: Complete health scoring and dietary recommendations
- **Voice Assistant**: Text-to-speech for hands-free cooking
- **Priority Support**: Dedicated customer support

## 🚀 Live Demo

Visit the live application: [https://nutriloomai.com](https://nutriloomai.com)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom gradient utilities
- **Authentication**: Supabase Auth with email/password and OAuth
- **Database**: Supabase PostgreSQL with Row Level Security
- **AI Integration**: OpenAI GPT-4 for recipe generation and image analysis
- **Icons**: Lucide React
- **SEO**: React Helmet Async with local business schema
- **Deployment**: Bolt Hosting (Netlify)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutriloom-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Database Setup**
   - Connect to Supabase using the "Connect to Supabase" button
   - Run the migrations in `/supabase/migrations/`

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Tables

#### `user_profiles`
- User account information and subscription details
- Tracks monthly usage for free tier limits
- Links to Supabase Auth users table

#### `saved_recipes`
- Stores user's favorite recipes
- JSON storage for flexible recipe data structure
- User-specific with RLS policies

### Security
- Row Level Security (RLS) enabled on all tables
- Authenticated users can only access their own data
- Proper foreign key constraints and data validation

## 🎨 Design System

### Color Palette
- **Primary**: Indigo gradient (#6366f1 to #8b5cf6)
- **Secondary**: Purple to pink gradient (#8b5cf6 to #ec4899)
- **Background**: Dark slate with blue gradients
- **Text**: White primary, slate secondary with gradient utilities

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with proper line spacing

### Components
- Modular component architecture
- Responsive design with mobile-first approach
- Consistent spacing using 8px grid system
- Smooth transitions and micro-interactions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── SEO/            # SEO and schema markup components
│   ├── AuthPage.tsx    # Authentication interface
│   ├── HomePage.tsx    # Landing page
│   ├── RecipeGenerator.tsx
│   ├── RecipeList.tsx
│   ├── RecipeDetail.tsx
│   ├── VideoUploadPage.tsx  # SYD feature
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   └── useRecipes.ts   # Recipe management
├── services/           # External API integrations
│   ├── openai.ts       # AI recipe generation
│   └── imageAnalysis.ts # Image analysis for SYD
├── types/              # TypeScript type definitions
├── data/               # Static data and ingredient sets
└── lib/                # Utility libraries and configurations
```

## 🔐 Authentication

### Supported Methods
- Email/Password authentication
- Google OAuth (configured)
- Automatic account creation with user profiles

### User Management
- Automatic profile creation on signup
- Monthly usage tracking for free users
- Plan management (Free/Pro)

## 🤖 AI Integration

### Recipe Generation
- **Model**: GPT-4 for high-quality recipe creation
- **Input**: Ingredients, cuisine preferences, skill level
- **Output**: 12-15 unique recipes with complete details
- **Features**: Nutritional analysis, cooking instructions, ingredient lists

### Image Analysis (Pro Feature)
- **Model**: GPT-4 Vision for dish analysis
- **Capabilities**: Ingredient identification, nutritional breakdown, health scoring
- **Output**: Complete dish analysis with recommendations

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface elements
- Mobile-specific navigation patterns
- Optimized image loading and performance

## 🔍 SEO Features

### Local SEO
- Google Business Profile integration
- Local business schema markup
- San Francisco Bay Area targeting
- NAP (Name, Address, Phone) consistency

### Technical SEO
- Meta tags optimization
- Open Graph and Twitter Card support
- Structured data markup
- Canonical URLs

## 🚀 Deployment

The application is deployed on Bolt Hosting with:
- Automatic builds from main branch
- Custom domain: nutriloomai.com
- SSL certificate included
- Global CDN distribution

## 📊 Performance

### Optimizations
- Code splitting with manual chunks
- Lazy loading for images
- Optimized CSS with reduced animations
- Bundle size optimization

### Metrics
- Lighthouse score optimized
- Fast loading times
- Mobile-friendly design
- Accessibility compliant

## 🔒 Security

- Row Level Security on all database tables
- Secure API key management
- HTTPS enforcement
- Input validation and sanitization

## 📞 Contact

- **Website**: [nutriloomai.com](https://nutriloomai.com)
- **Email**: nutriloomai@gmail.com
- **Instagram**: [@nutriloomai](https://www.instagram.com/nutriloomai)
- **Twitter**: [@NutriloomAI](https://x.com/NutriloomAI)

## 📄 License

© 2025 Nutriloom AI. All rights reserved.

---

*Built with ❤️ for food lovers everywhere*