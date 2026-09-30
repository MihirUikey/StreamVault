# 🎬 StreamVault

StreamVault is a full-stack video streaming and discovery platform built with
React and Django REST Framework.

The application allows users to browse movies and TV shows, search and filter
content, view detailed information, and organize content through collections.

> StreamVault is a learning/portfolio project focused on building a
> production-style full-stack application.

---

## ✨ Features

### 🎥 Content Discovery
- Browse movies and TV shows
- View trending, popular, top-rated and newly released content
- Search movies and TV shows
- Filter movies by genre
- Filter content by collection

### 🎬 Movie & TV Show Details
- Dedicated detail pages
- Movie/show posters and banners
- Ratings
- Release year
- Language
- Maturity rating
- Genres
- Descriptions
- Trailer links

### 🖥️ Frontend
- Responsive React interface
- Reusable components
- React Router navigation
- Axios API integration
- Dynamic content loading
- Search results interface

### ⚙️ Backend
- Django REST Framework API
- Movie and TV show management
- Genre and collection relationships
- Search and filtering
- Slug-based detail endpoints
- Django Admin for content management

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- Vite
- React Router
- Axios
- CSS

### Backend
- Python
- Django
- Django REST Framework
- SQLite

### Development Tools
- Git
- GitHub
- VS Code
- Django Admin

---

## 🏗️ Project Architecture

```text
StreamVault/
│
├── backend/
│   ├── config/
│   ├── movies/
│   ├── users/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
