from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Movie, Genre, TVShow, Watchlist
from .serializers import (
    MovieSerializer,
    GenreSerializer,
    TVShowSerializer,
    WatchlistSerializer,
)


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


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def watchlist(request):
    if request.method == "GET":
        items = Watchlist.objects.filter(user=request.user).select_related(
            "movie", "tv_show"
        )

        serializer = WatchlistSerializer(items, many=True)
        return Response(serializer.data)

    movie_id = request.data.get("movie")
    tv_show_id = request.data.get("tv_show")

    if movie_id and tv_show_id:
        return Response(
            {"detail": "Provide either movie or tv_show, not both."},
            status=400,
        )

    if not movie_id and not tv_show_id:
        return Response(
            {"detail": "Provide either movie or tv_show."},
            status=400,
        )

    if movie_id:
        movie = get_object_or_404(
            Movie,
            id=movie_id,
            is_active=True,
        )

        if Watchlist.objects.filter(
            user=request.user,
            movie=movie,
        ).exists():
            return Response(
                {"detail": "Movie is already in My List."},
                status=400,
            )
        item = Watchlist.objects.create(
            user=request.user,
            movie=movie,
        )

    else:
        tv_show = get_object_or_404(
            TVShow,
            id=tv_show_id,
            is_active=True,
        )

        if Watchlist.objects.filter(
            user=request.user,
            tv_show=tv_show,
        ).exists():
            return Response(
                {"detail": "TV Show is already in My List."},
                status=400,
            )

        item = Watchlist.objects.create(
            user=request.user,
            tv_show=tv_show,
        )

    serializer = WatchlistSerializer(item)
    return Response(serializer.data, status=201)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def watchlist_delete(request, item_id):
    item = get_object_or_404(
        Watchlist,
        id=item_id,
        user=request.user,
    )

    item.delete()

    return Response(status=204)
