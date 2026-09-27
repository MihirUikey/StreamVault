from django.contrib import admin
from .models import Movie, Genre, Collection, TVShow


# Register your models here.
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "release_year",
        "rating",
        "language",
        "is_active",
    )
    list_filter = (
        "release_year",
        "language",
        "is_active",
        "genres",
        "collections",
    )
    search_fields = (
        "title",
        "description",
    )
    filter_horizontal = (
        "genres",
        "collections",
    )


@admin.register(TVShow)
class TVShowAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "release_year",
        "rating",
        "language",
        "is_active",
    )
    prepopulated_fields = {"slug": ("title",)}
