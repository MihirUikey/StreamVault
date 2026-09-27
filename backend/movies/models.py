from django.db import models


# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)

    description = models.TextField()

    poster = models.ImageField(upload_to="posters/")

    banner = models.ImageField(upload_to="banner/")

    trailer_url = models.URLField(blank=True)

    release_year = models.PositiveIntegerField()

    duration = models.PositiveIntegerField(help_text="Duration in minutes")

    rating = models.DecimalField(max_digits=3, decimal_places=1)

    language = models.CharField(max_length=50, default="English")

    maturity_rating = models.CharField(max_length=10, default="13+")
    genres = models.ManyToManyField(Genre, related_name="movies")

    collections = models.ManyToManyField(Collection, related_name="movies", blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class TVShow(models.Model):
    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)

    description = models.TextField()

    poster = models.ImageField(upload_to="tv_posters/")

    banner = models.ImageField(upload_to="tv_banners/")

    trailer_url = models.URLField(blank=True)

    release_year = models.PositiveIntegerField()

    rating = models.DecimalField(max_digits=3, decimal_places=1)

    language = models.CharField(max_length=50, default="English")

    maturity_rating = models.CharField(max_length=10, default="13+")

    genres = models.ManyToManyField(Genre, related_name="tv_shows")

    collections = models.ManyToManyField(
        Collection, related_name="tv_shows", blank=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
