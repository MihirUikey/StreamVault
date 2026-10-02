from rest_framework import serializers
from .models import Genre, Movie, TVShow, Watchlist


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    collections = serializers.StringRelatedField(many=True)

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "poster",
            "banner",
            "rating",
            "release_year",
            "language",
            "maturity_rating",
            "is_active",
            "genres",
            "collections",
            "created_at",
            "updated_at",
        ]


class TVShowSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    collections = serializers.StringRelatedField(many=True)

    class Meta:
        model = TVShow
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "poster",
            "banner",
            "rating",
            "release_year",
            "language",
            "maturity_rating",
            "is_active",
            "genres",
            "collections",
            "created_at",
            "updated_at",
        ]


class WatchlistSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    tv_show = TVShowSerializer(read_only=True)

    class Meta:
        model = Watchlist
        fields = [
            "id",
            "movie",
            "tv_show",
            "created_at",
        ]
