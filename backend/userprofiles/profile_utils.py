import httpx

from typing import Any, List

from .serializers import UserProfileSerializer
from accounts.models import CustomUser


def make_api_request(client: httpx.Client, url: str, headers: dict = None) -> Any:
    response = client.get(f"http://localhost:8000/{url}", headers=headers)
    return response.json()


def fetch_user_profile_data(
    user: CustomUser, authenticated_user: str, header: dict
) -> List[dict]:
    is_following = False

    # TODO MAKE THIS ASYNC
    with httpx.Client() as client:
        if user.username != authenticated_user:
            is_following = make_api_request(
                client, f"/follow/check/{authenticated_user}/{user.username}", header
            )

        following = make_api_request(
            client,
            f"follow/following/count/{user.id}",
            header,
        )

        followers = make_api_request(
            client,
            f"follow/followers/count/{user.id}",
            header,
        )

        posts = make_api_request(
            client,
            f"posts/profile-page/{user.id}",
            header,
        )

        profile = user.profile.first()
        profile_details = UserProfileSerializer(profile)
        bio = {"bio": profile_details.data["bio"]}
        profile_pic = {"profile_pic": profile_details.data["profile_pic"]}

        is_following = {"is_following": is_following}

        return [posts, following, followers, bio, profile_pic, is_following]
