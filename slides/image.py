# Expose Image fields to the API

from wagtail.wagtailimages.models import get_image_model

model = get_image_model()
model.api_fields = model.admin_form_fields
