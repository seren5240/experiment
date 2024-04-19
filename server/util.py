import datetime


def time_until(target: datetime.time) -> float:
    """Calculate the number of seconds until the next occurrence of the target time."""
    now = datetime.datetime.now()
    next_time = datetime.datetime.combine(now.date(), target)
    if next_time < now:
        next_time += datetime.timedelta(days=1)
    return (next_time - now).total_seconds()
