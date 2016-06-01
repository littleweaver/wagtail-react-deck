from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtailimages import urls as wagtailimage_urls
from wagtail.contrib.wagtailapi import urls as wagtailapi_urls

from search import views as search_views
from .views import counter


urlpatterns = [
    url(r'^django-admin/', include(admin.site.urls)),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url(r'^api/', include(wagtailapi_urls)),
    url(r'^wagtail/', include(wagtail_urls)),
    url(r'^images/', include(wagtailimage_urls)),

    url(r'^counter/$', counter),
    url(r'^counter/(?P<cur_count>[0-9]+)/$', counter),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.views.generic import TemplateView

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [url('', TemplateView.as_view(template_name="app.html"))]
