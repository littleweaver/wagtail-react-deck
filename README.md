# A slide deck with React and Wagtail

This is a proof-of-concept library demonstrating how to
build a slide presentation CMS using React and Wagtail.

## Getting Started

```
$ mkvirtualenv --python=python3 wagtail-react-deck
$ git clone https://github.com/littleweaver/wagtail-react-deck.git
$ cd wagtail-react-deck
$ pip install -r requirements.txt
$ ./manage.py migrate
$ ./manage.py runserver
```

## Running webpack

`django-webpack-loader` and `webpack-stats` are used for the marriage of
Django and webpack. `webpack-stats` outputs a JSON file each time a webpack
bundle is built. `django-webpack-loader` polls this file to determine which
bundle to serve to visitors.

Make sure you are running node `5.x` or `6.x`. (We recommend
managing your node versions with nvm.)

### Development

```
$ cd deck/react
$ npm install
$ npm run start
```

### Production

```
$ cd deck/react
$ npm install
$ NODE_ENV=production npm run build
```

## Presentation

Use the left and right arrow keys to change your slides.
Use the `o` key to open a deck with speaker notes in a new tab. Slide
transitions will sync between the presentation and speaker copy (i.e., hitting
the left arrow in the speaker deck with do the same in the presentation deck).

## Slide/Content Management

You’ll need to create a superuser,

```
$ ./manage.py createsuperuser
```

Wagtail's admin lives at `/admin/` (that trailing slash is important).

All requests not matched by Django will fall through to the client-side router.

## FAQ

### Isn’t this totally unnecessary?

Yes.
