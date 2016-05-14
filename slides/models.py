from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField, RichTextField
from wagtail.wagtailcore import blocks
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock

from . import image

class Slide(Page):
    contents = StreamField([
        ('heading', blocks.CharBlock(icon='title', classname="heading")),
        ('paragraph', blocks.RichTextBlock(icon='pilcrow')),
        ('image', ImageChooserBlock(icon='image')),
        ('embed', blocks.RawHTMLBlock(icon='code')),
        ('code', blocks.RawHTMLBlock(icon='code')),
    ])

    speaker_notes = RichTextField(blank=True, null=True)

    ordering = models.IntegerField()
    display_weaver = models.BooleanField(default=False)
    display_title = models.BooleanField(default=False)
    centered_slide = models.BooleanField(default=False)

    content_panels = Page.content_panels + [
        FieldPanel('ordering'),
        FieldPanel('display_weaver'),
        FieldPanel('display_title'),
        FieldPanel('centered_slide'),
        FieldPanel('speaker_notes'),
        StreamFieldPanel('contents'),
    ]

    api_fields = ['speaker_notes', 'contents', 'display_weaver', 'display_title', 'centered_slide', 'ordering',]
