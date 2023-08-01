# craite

Hey there! Welcome to Craite, a nifty little project I put together where you can turn your words into images using some super cool AI tech. It's like having a personal Edvard Munch at your fingertips! (Distortions 😂)

You can take it for a spin here: [Craite on Fly.io](https://craite.fly.dev/)

## Under the Hood

I decided to try out some fancy new tech and frameworks for this project. Here's what I used:

- Frontend: I used HTMX and Tailwind CSS. These make sure everything looks pretty and works smoothly.
- Backend: Elysia and Bun are the heroes doing all the heavy lifting in the background.
- Database: SQLite with Drizzle ORM helps me keep track of all the cool stuff you create.
- Hosting: The whole thing is hosted on Fly.io, which is super easy and reliable.

Basically, I wanted to try out this thing called the BETH stack (Bun, Elysia, Turso, HTMX), and have a go at Server-Side Rendering (SSR). It was a wild ride, but I loved every bit of it!

## How It Works

Here's the fun part: You give the AI a phrase, and then some cool magic happens in the background. I send your text over to RunPod which generates an image out of it. The image then zooms back via a POST request, and voila, your text is now a picture!

I save these pictures along with their text inputs in the database, but here's the catch: they've got an expiration date. This is mostly because I'm slightly terrified of getting a massive AWS bill 😂 (Looking at you my 0.52 cents bill)

## Please Be Cool

Just a quick note: please use Craite responsibly. I don't have much time to moderate content, but I will do my best to remove anything inappropriate as soon as possible.

So that's it, have fun with it, and I hope you like using Craite as much as I enjoyed making it!
