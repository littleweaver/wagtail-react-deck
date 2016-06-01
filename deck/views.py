from django.http import HttpResponse, JsonResponse


# Server holds the presentation.
template = '''
Clicks: {cur_count}.
<a href="/counter/{next_count}/">
    Increment to {next_count}
</a>
'''


def counter(request, cur_count="1"):
    # Server deals with application logic.
    next_count = int(cur_count) + 1

    # Server responds with everything the browser needs.
    response = template.format(
            cur_count=cur_count, next_count=next_count)

    return HttpResponse(response)


# Front-end deals with presentation separately.
def decoupled_counter(request, cur_count="1"):
    # Server deals with application logic.
    next_count = int(cur_count) + 1

    response = {
        'cur_count': int(cur_count),
        'next_count': next_count,
        'next_link': '/counter/{}/'.format(next_count),
    }

    # Server just responds with data.
    return JsonResponse(response)
