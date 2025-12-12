# React Router Advanced Demo

This project demonstrates advanced routing techniques in React applications using React Router v6.

## Features Implemented

### 1. **Nested Routes**
- Profile section with nested navigation
- `/profile/details` - User details view
- `/profile/settings` - Settings management
- `/profile/posts` - User's blog posts
- Shared layout with nested outlet

### 2. **Protected Routes**
- Authentication system with Context API
- Dashboard and Profile pages require login
- Role-based access control (extensible)
- Automatic redirect to login for unauthenticated users
- State preservation during redirects

### 3. **Dynamic Routing**
- Blog posts with variable URLs (`/blog/:id`)
- Parameter extraction using `useParams()`
- 404 handling for non-existent posts
- Related posts section using dynamic data

### 4. **Additional Features**
- Programmatic navigation
- Route guards
- Authentication state persistence
- Responsive design
- Loading states
- Error handling

## Project Structure

```pgsql
src/
├── components/
│ ├── ProtectedRoute.jsx # Route protection wrapper
│ ├── Navigation.jsx # Main navigation
│ ├── Dashboard.jsx # Protected dashboard
│ ├── Profile/ # Nested routes example
│ ├── Blog/ # Dynamic routes example
│ ├── Auth/ # Authentication forms
│ └── Layout/ # Layout components
├── context/
│ └── AuthContext.jsx # Authentication state
└── App.jsx # Main router configuration
```


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-router-advanced
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser.

---

### Usage

#### Authentication

- Demo credentials:

    - Email: `demo@example.com`

    - Password: `password`

- Or register a new account

#### Testing Routes

**Public Routes:**

- `/` - Home page

- `/blog` - Blog post list

- `/blog/:id` - Individual blog post

- `/login` - Login page

- `/register` - Registration page

**Protected Routes (Require Login):**

- `/dashboard` - User dashboard

- `/profile` - Profile overview

- `/profile/details` - Profile details

- `/profile/settings` - Profile settings

- `/profile/posts` - User's posts

**Error Routes:**

- `/unauthorized` - Access denied

- `/*` - 404 page


#### Key Concepts Demonstrated

1. **Route Protection**
```jsx
<ProtectedRoute roles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

2. **Nested Routes**
```jsx
<Route path="profile" element={<Profile />}>
  <Route path="details" element={<ProfileDetails />} />
  <Route path="settings" element={<ProfileSettings />} />
</Route>
```

3. **Dynamic Parameters**
```jsx
const { id } = useParams();
```

4. **Programmatic Navigation**
```jsx
const navigate = useNavigate();
navigate('/dashboard', { replace: true });
```

5. **Authentication Context**
```jsx
const { user, login, logout } = useAuth();
```

#### Testing

1. **Navigation:** Test all navigation links

2. **Authentication:** Try accessing protected routes without login

3. **Nested Routes:** Navigate through profile sub-sections

4. **Dynamic Routes:** Visit different blog post IDs

5. **Error Handling:** Test 404 and unauthorized pages

---

### Extending the Project

#### Adding New Protected Routes

```jsx
<Route path="admin" element={
  <ProtectedRoute roles={['admin']}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

#### Adding More Nested Routes

```jsx
<Route path="settings" element={<SettingsLayout />}>
  <Route path="account" element={<AccountSettings />} />
  <Route path="privacy" element={<PrivacySettings />} />
</Route>
```

#### Dependencies

- `react-router-dom`: ^6.20.0

- `react`: ^18.2.0

- `react-dom`: ^18.2.0

---

### License

MIT

```txt

## Step 11: Testing Instructions

Create a testing file to verify all features:

**src/test-routes.md**
```markdown
# Testing Checklist

## ✅ Test 1: Basic Navigation
- [ ] Home page loads successfully
- [ ] Navigation menu displays correctly
- [ ] All navigation links are clickable

## ✅ Test 2: Authentication Flow
- [ ] Access protected route without login → Redirect to login
- [ ] Login with demo credentials → Redirect to dashboard
- [ ] Logout functionality works
- [ ] Register new account → Auto-login and redirect

## ✅ Test 3: Nested Routes (Profile)
- [ ] Navigate to /profile → Shows nested navigation
- [ ] Click "Details" → Loads ProfileDetails
- [ ] Click "Settings" → Loads ProfileSettings
- [ ] Click "My Posts" → Loads Posts component
- [ ] Nested navigation highlights active route

## ✅ Test 4: Dynamic Routing (Blog)
- [ ] Visit /blog → Shows list of posts
- [ ] Click any post → Loads specific blog post
- [ ] URL changes to /blog/:id
- [ ] "Back to all posts" link works
- [ ] Try non-existent ID (e.g., /blog/999) → Shows 404

## ✅ Test 5: Protected Routes
- [ ] Without login:
  - [ ] /dashboard → Redirects to login
  - [ ] /profile → Redirects to login
- [ ] After login:
  - [ ] /dashboard → Loads successfully
  - [ ] /profile → Loads successfully

## ✅ Test 6: Error Handling
- [ ] Visit non-existent route → Shows 404 page
- [ ] Try accessing /unauthorized directly
- [ ] "Go Back" button works on error pages

## ✅ Test 7: State Persistence
- [ ] Login, refresh page → Still logged in
- [ ] Navigate between routes → State preserved
- [ ] Protected routes remember redirect location

## ✅ Test 8: Responsive Design
- [ ] Test on mobile viewport
- [ ] Navigation adapts to screen size
- [ ] All components are readable on small screens

## ✅ Test 9: Performance
- [ ] Routes load quickly
- [ ] No unnecessary re-renders
- [ ] Smooth transitions between routes

## ✅ Test 10: Edge Cases
- [ ] Direct URL access to nested routes
- [ ] Browser back/forward navigation
- [ ] Multiple tabs with different auth states
```

---

### Additional Files

.gitignore
```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
