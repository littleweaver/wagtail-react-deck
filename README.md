# A slide deck with React and Wagtail

I decided to give a talk on [Wagtail CMS](https://wagtail.io/). I didn’t feel
like getting into a templating engine and all that, so I decided, hey, what’s
the next best thing? How about using the included Wagtail API and React? So I
made [some blog](https://github.com/emilyhorsman/wagtail-react-blog) thing.
Now I have to _give_ the talk though, with slides and such. It seemed wrong to
go use reveal.js or deck.js, etc. So now this thing exists. It’s a CMS for your
slides and a front-end to render them with React. You’re “welcome”.

## Getting Started

```
$ mkvirtualenv --python=python3 wagtail-react-deck
$ git clone https://github.com/littleweaver/wagtail-react-deck.git
$ cd wagtail-react-deck
$ pip install -r requirements.txt
$ ./manage.py migrate
$ ./manage.py runserver
```

### Specifying an IP address

The Wagtail API needs to serve absolute image URLs and therefore it needs to
know the address of the API. You can specify this with an environment variable.
Here’s how I happen to do that, you should change the IP address and port as
desired.

```
$ WAGTAILAPI_BASE_URL='http://192.168.1.19:8000' ./manage.py runserver 0.0.0.0:8000
```

## Running webpack

`django-webpack-loader` and `webpack-stats` are used for the marriage of
Django and webpack. `webpack-stats` outputs a JSON file each time a webpack
bundle is built. `django-webpack-loader` polls this file to determine which
bundle to serve to visitors.

Hot reloading isn’t working yet.

I’d recommend using `nvm` to manage your node versions. I’ve tested with
node `5.x` and `6.x`. Both work fine.

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

Currently, use the left and right arrow keys to change your slides.
Use the `o` key to open a deck with speaker notes in a new tab. Slide
transitions will sync between the presentation and speaker copy (i.e., hitting
the left arrow in the speaker deck with do the same in the presentation deck).

## Slide/Content Management

You’ll need to create a superuser,

```
$ ./manage.py createsuperuser
```

The server then lives at `/admin/` (that trailing slash is important).

All requests not matched by Django will fall through to the client-side router.

## Questions

### Isn’t this totally unnecessary?

Yes.
