from django.utils import timezone
from datetime import datetime


def calculate_time_difference_for_comments(created_at: datetime) -> str:
    now = timezone.now()
    time_difference = now - created_at

    weeks, days = divmod(time_difference.days, 7)
    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, _ = divmod(remainder, 60)

    if weeks > 0:
        return f"{weeks}w"
    elif days > 0:
        return f"{days}d"
    elif hours > 0:
        return f"{hours}h"
    else:
        return f"{minutes}m"


def calculate_time_difference_for_posts(created_at: datetime) -> str:
    now = timezone.now()
    time_difference = now - created_at

    weeks, days = divmod(time_difference.days, 7)
    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    if weeks > 0:
        return created_at.strftime("%B %d")

    elif days > 0:
        if days == 1:
            return f"{days} day ago"
        return f"{days} days ago"

    elif hours > 0:
        if hours == 1:
            return f"{hours} hour ago"
        return f"{hours} hours ago"

    else:
        return f"{minutes} minutes ago"
