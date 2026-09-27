from django.urls import path
from .views import (
    movie_list,
    movie_detail,
    genre_list,
    tv_show_list,
    tv_show_detail,
)

urlpatterns = [
    path("", movie_list, name="movie-list"),
    path("genres/", genre_list, name="genre-list"),
    path("tv-shows/", tv_show_list, name="tv-show-list"),
    path("tv-shows/<slug:slug>/", tv_show_detail, name="tv-show-detail"),
    path("<slug:slug>/", movie_detail, name="movie-detail"),
]
