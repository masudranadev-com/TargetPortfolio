# cPanel Node.js Deployment

Use this project with cPanel's **Setup Node.js App** feature. A normal upload to `public_html` will not run the API routes or admin pages.

## cPanel Settings

- Node.js version: `20` or newer
- Application mode: `Production`
- Application root: the folder that contains `package.json`
- Application startup file: `server.js`

## Commands

Run these from cPanel Terminal in the application root:

```bash
npm install
npm run build
```

Then restart the app from **Setup Node.js App**.

## GitHub Update Flow

When you change the project later:

```bash
git pull
npm install
npm run build
```

Then restart the Node.js app again.
