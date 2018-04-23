# vbase
Project 2501

http://vbase.games

## installation

After cloning the repo:

### Part I - nginx server setup

1. Install Nginx
2. Check file permissions (especially for `index.html` on `server` and parent folders)
3. Check paths on custom Nginx conf file (adapt paths to new server)
4. Check conf file syntax (add `events` and `http` section if needed)
5. Start Nginx with custom Nginx conf file.

### Part II - node.js server setup

6. Install NPM
7. Install NVM
8. Run `nvm install 8` and `nvm use 8`
9. Run `npm install`
10. Run `npm run build:dev` or `npm run build:prod`
11. Install PM2 (`npm install pm2 -g`)
12. Run the server with `pm2 start server.js`

### Part III - configure database

12. Edit `app/constants.js` first line (base app path)
13. Edit the `.env` file `CONNECT` var to reflect the actual mongoDB server connection string

### Part IV - misc setup

14. Run `<domain>/api/sitemap-generate` to update sitemap.xml


## maintainance

### Rebuild

1. Stash and pull
2. Stash pop
3. Run `npm run build:prod`