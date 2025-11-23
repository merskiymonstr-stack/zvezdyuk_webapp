# Zvezdyuk — Telegram WebApp (Demo)

Minimal Telegram WebApp demo project. The public/character_front.png was copied from local asset path:
`/mnt/data/character_front.png`

## Quick start

1. Test locally: open `index.html` in your browser.
2. Deploy:
   - Push the `telegram_game` folder to your GitHub repository.
   - Create a new project in Vercel and import the repo.
   - Vercel serves this as a static site.

## Notes

- Telegram WebApp API calls are only available when the site is opened inside Telegram's in-app browser.
- The demo sends `tg.sendData(...)` JSON to the bot. Your bot must have a server to receive WebAppData or work with the Bot API accordingly.
