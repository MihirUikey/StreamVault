from django.urls import path

from .views import (
    movie_list,
    movie_detail,
    genre_list,
    tv_show_list,
    tv_show_detail,
    watchlist,
    watchlist_delete,
)

urlpatterns = [
    path("", movie_list, name="movie-list"),
    path("genres/", genre_list, name="genre-list"),
    path("tv-shows/", tv_show_list, name="tv-show-list"),
    path("tv-shows/<slug:slug>/", tv_show_detail, name="tv-show-detail"),
    # My List MUST come before <slug:slug>/
    path("my-list/", watchlist, name="watchlist"),
    path("my-list/<int:item_id>/", watchlist_delete, name="watchlist-delete"),
    # Keep this LAST
    path("<slug:slug>/", movie_detail, name="movie-detail"),
]
