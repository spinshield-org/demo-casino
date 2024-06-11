# demo-application
This is a demo application using Laravel/PHP and React, to use [games API](https://documentation.spin.ac).

# Contact
[Telegram](https://t.me/wrccwest)
![app](preview.png)

## Install
Just install this how you would regularly install a [Laravel](https://laravel.com/docs) application. 

### Quick install
Run:
```bash
composer install
php artisan key:generate
cp .env.example .env
```

Then fill in .env variables, mainly the database & spinshield api variables.

Finish off with:
```bash
php artisan migrate:fresh
php artisan optimize:clear
npm install
npm run build
```

### Extra Config
You can find various config settings in `config/games.php`, like if to credit new users with balance automatically and so on.

### Websocket
Websocket currently used to immediately update player balance when it changes to frontend. Make sure to have `websocket/centrifugo` application running after you set `websocket/config.json` and make sure the config keys match in `.env` for "CENTRIFUGO_*" variables.

### Callback URL
Check callback URL in `routes/api.php`.

### Nginx Setup Example
```bash
upstream centrifugo {
    # Enumerate all upstream servers here
    #sticky;
    ip_hash;
    server 127.0.0.1:8000;
    #server 127.0.0.1:8001;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl;
    listen 80;
    access_log /dev/null;
    error_log /dev/null;

    ssl_certificate /etc/letsencrypt/live/game2.heyreels.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/game2.heyreels.com/privkey.pem;
    server_name game2.heyreels.com;
    charset utf-8;
    index index.php;
    root /var/www/demo/public/;

    location /connection {
        proxy_pass http://centrifugo;
        proxy_buffering off;
        keepalive_timeout 65;
        proxy_read_timeout 60s;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

  location / {
      add_header 'Access-Control-Allow-Origin' 'https://game2.heyreels.com' always;
      add_header 'Access-Control-Allow-Credentials' 'true' always;
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Content-Type,Range' always;
      add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
      try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass unix:/run/php/php8.2-fpm.sock;
            #fascgi_index index.php;
            include fastcgi.conf;
    }
}
```

### Handy permission helper
Handy permission helper to run after install (and really for any laravel install):
```bash
sudo chown -R www-data:www-data .
sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
sudo find . -type d -exec chmod g+s {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

