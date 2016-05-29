# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-29 03:52
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('slides', '0006_auto_20160514_0437'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='contents',
            field=wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='heading', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('embed', wagtail.wagtailcore.blocks.RawHTMLBlock(icon='site', label='Raw HTML')), ('code', wagtail.wagtailcore.blocks.RawHTMLBlock(icon='code', label='Highlighted Code')), ('flex_group', wagtail.wagtailcore.blocks.StreamBlock((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='heading', icon='title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock(icon='pilcrow')), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('embed', wagtail.wagtailcore.blocks.RawHTMLBlock(icon='site', label='Raw HTML')), ('code', wagtail.wagtailcore.blocks.RawHTMLBlock(icon='code', label='Highlighted Code'))), icon='doc-empty', label='Flex Group')))),
        ),
    ]
