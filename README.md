# craite

Hey there! Welcome to Craite, a nifty little project I put together where you can turn your words into images using some super cool AI tech. It's like having a personal Edvard Munch at your fingertips! (Distortions 😂)

You can take it for a spin here: [craite](https://craite-4wgfen3n5q-rj.a.run.app/)

## Under the Hood

I decided to try out some fancy new tech and frameworks for this project. Here's what I used:

- Frontend: I used HTMX and Tailwind CSS. These make sure everything looks pretty and works smoothly.
- Backend: Elysia and Bun are the heroes doing all the heavy lifting in the background.
- Database: SQLite with Drizzle ORM helps me keep track of all the cool stuff you create.
- Hosting: The whole thing is hosted on GCP, which is super easy and reliable.

Basically, I wanted to try out this thing called the BETH stack (Bun, Elysia, Turso, HTMX), and have a go at Server-Side Rendering (SSR). It was a wild ride, but I loved every bit of it!

## How It Works

Here's the fun part: You give the AI a phrase, and then some cool magic happens in the background. I send your text over to RunPod which generates an image out of it. The image then zooms back via a POST request, and voila, your text is now a picture!

I save these pictures along with their text inputs in the database, but here's the catch: they've got an expiration date. This is mostly because I'm slightly terrified of getting a massive AWS bill 😂 (Looking at you my 0.52 cents bill)

### `.tsx` But It's Not React? Yep!

You might've spotted those .tsx files and thought "Aha, React!" but hold your horses. I've gone down a different route this time, using typed-html instead. It's a neat package that makes creating components feel a lot like React.

However, there's no Virtual DOM happening here. Instead, I've got HTMX handling all the interactive stuff - and it does a fine job without needing a Virtual DOM. It's a nice change of pace and a fun, fresh approach to building a web app. Hope you enjoy playing around with it as much as I did!

## Please Be Cool

Just a quick note: please use Craite responsibly. I don't have much time to moderate content, but I will do my best to remove anything inappropriate as soon as possible.

So that's it, have fun with it, and I hope you like using Craite as much as I enjoyed making it!
