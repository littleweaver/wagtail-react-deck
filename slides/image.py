# The Wagtail API won't provide an image_url, so we need to do some unfortunate
# monkey patching.
#
# See: https://github.com/torchbox/wagtail/issues/2087

from django.core.urlresolvers import reverse
from django.conf import settings

from wagtail.wagtailimages.models import get_image_model
from wagtail.wagtailimages.utils import generate_signature


def generate_image_url(image, filter_spec):
    signature = generate_signature(image.id, filter_spec)
    url = reverse('wagtailimages_serve', args=(signature, image.id, filter_spec))

    image_filename = image.file.name[len('original_images/'):1]

    return settings.WAGTAILAPI_BASE_URL + url + image_filename


def original_url(self):
    return generate_image_url(self, 'original')


model = get_image_model()
model.original_url = original_url
model.api_fields = ('original_url',)
