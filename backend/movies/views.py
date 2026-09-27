from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Movie, Genre, TVShow
from .serializers import MovieSerializer, GenreSerializer, TVShowSerializer


@api_view(["GET"])
def genre_list(request):
    genres = Genre.objects.all()

    serializer = GenreSerializer(genres, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def movie_list(request):
    movies = Movie.objects.filter(is_active=True)

    # Search
    search = request.GET.get("search")

    if search:
        movies = movies.filter(
            Q(title__icontains=search) | Q(description__icontains=search)
        )

    # Filter by genre
    genre = request.GET.get("genre")

    if genre:
        movies = movies.filter(genres__name__iexact=genre)

    # Filter by collection
    collection = request.GET.get("collection")

    if collection:
        movies = movies.filter(collections__name__iexact=collection)

    movies = movies.distinct()

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def movie_detail(request, slug):
    movie = get_object_or_404(Movie, slug=slug, is_active=True)

    serializer = MovieSerializer(movie)

    return Response(serializer.data)


@api_view(["GET"])
def tv_show_list(request):
    tv_shows = TVShow.objects.filter(is_active=True)

    # search
    search = request.GET.get("search")

    if search:
        tv_shows = tv_shows.filter(
            Q(title__icontains=search) | Q(description__icontains=search)
        )

    # filter by genre
    genre = request.GET.get("genre")

    if genre:
        tv_shows = tv_shows.filter(genres__name__iexact=genre)

    # filter by collection
    collection = request.GET.get("collection")

    if collection:
        tv_shows = tv_shows.filter(collections__name__iexact=collection)

    tv_shows = tv_shows.distinct()

    serializer = TVShowSerializer(tv_shows, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def tv_show_detail(request, slug):
    tv_show = get_object_or_404(TVShow, slug=slug, is_active=True)

    serializer = TVShowSerializer(tv_show)

    return Response(serializer.data)
