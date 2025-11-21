# alx-fe-reactjs

# GitHub User Search 🔍

A modern, responsive React application for searching GitHub users with advanced filtering capabilities. Built with React, Tailwind CSS, and the GitHub API.

![GitHub User Search](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🚀 Live Demo

[**View Live Application**](https://alx-fe-reactjs-nine-iota.vercel.app) *(Replace with your actual Vercel URL)*

## ✨ Features

### 🔍 Advanced Search
- **Quick Search**: Instant username lookup
- **Advanced Filters**: 
  - Location-based search
  - Minimum repository count
  - Programming language filter
  - Minimum follower count
  - Combined search criteria

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Tailwind CSS**: Beautiful, modern styling with smooth animations
- **Real-time Feedback**: Loading states and error handling
- **Pagination**: Load more results seamlessly

### 📊 Rich User Profiles
- User avatars and basic information
- Repository and follower counts
- Location and bio details
- Direct links to GitHub profiles

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: GitHub REST API
- **Deployment**: Vercel
- **Icons**: Heroicons

## 📦 Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/alx-fe-reactjs.git
   cd alx-fe-reactjs/github-user-search
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


#### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

### 🎯 How to Use

#### Quick Search

1. Enter a GitHub username in the quick search field

2. Click "Search" to instantly find the user

3. View profile information and statistics

#### Advanced Search

1. Fill in any combination of search criteria:

    - Username: Search by specific username

    - Location: Find users in specific locations

    - Min Repositories: Filter by repository count

    - Language: Search by programming language

    - Min Followers: Filter by follower count

2. Click "Advanced Search" to execute the query

3. Use "Load More" to paginate through results

#### 🔧 API Integration

The application uses the GitHub REST API:

- User Search: `GET /search/users?q={query}`

- User Details: `GET /users/{username}`

- Rate Limiting: 60 requests per hour (unauthenticated)

#### Search Query Examples
- octocat in:login - Search by username

- location:"San Francisco" - Search by location

- repos:>=10 - Users with 10+ repositories

- language:javascript - Users who code in JavaScript

- followers:>=100 - Users with 100+ followers

---

### 🚀 Deployment

#### Deploy to Vercel

1. Push to GitHub
    ```bash

    git add .
    git commit -m "Deploy ready"
    git push origin main
    ```

2. Deploy via Vercel

    - Go to vercel.com

    - Import your GitHub repository

    - Select the github-user-search directory

    - Deploy automatically on git push

#### Environment Variables

No environment variables required - uses public GitHub API endpoints.

---

### 📁 Project Structure

```pgsql
github-user-search/
├── src/
│   ├── components/
│   │   └── Search.jsx          # Main search component
│   ├── services/
│   │   └── githubService.js    # API integration
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Tailwind CSS imports
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── vercel.json                # Vercel deployment config

```

### 🎨 Customization

#### Styling

The application uses Tailwind CSS. Modify tailwind.config.js to customize:

   - Colors

    - Spacing

    - Fonts

    - Breakpoints

#### Search Filters

Add new search criteria in:

- src/components/Search.jsx (UI)

- src/services/githubService.js (API logic)

---

### 🤝 Contributing

1. Fork the repository

2. Create a feature branch `(git checkout -b feature/amazing-feature)`

3. Commit your changes `(git commit -m 'Add amazing feature')`

4. Push to the branch `(git push origin feature/amazing-feature)`

5. Open a Pull Request

### 📄 License

This project is part of the ALX Frontend React.js curriculum.

### 🙏 Acknowledgments

- GitHub REST API for providing user data

- Tailwind CSS for the utility-first CSS framework

- Vercel for seamless deployment

- React for the component-based architecture

### 📞 Support

If you have any questions or issues, please open an issue on GitHub.
