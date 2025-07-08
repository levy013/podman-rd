# Nginx

## What is a reverse proxy?
🔗 <a href="https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/" target="_blank">Reverse Proxy</a>

A reverse proxy acts as an intermediary between clients and servers. They intercept client requests and forward them to the appropriate backend service.

## Why a reverse proxy? 
By default, our containerized applications will be accessible from the server's hostname on the port(s) that we choose to expose, e.g. `http://uit1446:8080/`

... But this is admittedly pretty obnoxious for the client to use.

Assuming we've set up the required DNS on the local network, *(or modified our Hosts file for testing purposes)*, we can use Nginx to bind our apps to those addresses on the server and serve our content from an **"alias"**.

--- 
A reverse proxy will allow us to specify a hostname and it's relative path(s) for the client to reach out to. Nginx can then intercept, and subsequently proxy incoming requests to the corresponding resource on the server.

Here is an example using CAD.MQ.API
- We have an application running on the server exposed on `:8080`
- Clients can natively make requests to the service on `http://uit1446:8080/`
- With a reverse proxy, we can set a custom hostname for our URI: `http://cadlnx/mq/`

## Setup:

> ⛔ **Requirements** 
>
> 🏷️ [Nginx: Installation](../nginx/installation.md)

### 1. Set up custom conf inside of `/etc/nginx/conf.d/`
> ℹ️ Note
>
> Instead of modifying `/etc/nginx/nginx.conf` directly, it's generally considered best practice to create a custom config file inside of `/conf.d`
>
> In this example, we're writing to `/etc/nginx/conf.d/cad.conf`

### 2. Add the reverse proxy config
```nginx
server { 
        listen 80; # what port Nginx should listen on
        server_name cadlnx; # what hostname the following location block(s) should respond to
         
        location /mq/ { # location block containing rules/logic for handling requests to http://cadlnx/mq/*
                rewrite ^/mq/(.*)$ /$1 break; 
                proxy_pass http://127.0.0.1:8080; # underlying address we're proxying traffic to 

                proxy_set_header Host $host; # retains original host value e.g. cadlnx
                proxy_set_header X-Real-IP $remote_addr; # client's real IP addr 
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # full chain of fwd IPs
                proxy_set_header X-Forwarded-Proto $scheme; # http or https 
        }

        location /foo/ { # e.g. some other location block for handling http://cadlnx/foo/
                ...
        }
} 
```

> ℹ️ Note 
>
> *It's important to remember that the goal here is to simply proxy traffic.*
>
> ```nginx
> rewrite ^/mq/(.*)$ /$1 break;
> ```
>
> The idea behind this rewrite is that we need to strip `/mq/` from the URI and reappend any parameters from the capture group.
>
> 1. The client requests `http://cadlnx/mq/scalar`
> 2. Nginx intercepts and maps the request to the corresponding resource on the server
> 3. The server responds with the resource found at `http://127.0.0.1:8080/scalar
>
> Quick regex explanation
>    - `^/mq/` - match only if we're at the beginning of the URI 
>       - ✅ `http://cadlnx/mq` 
>       - ❌ `http://cadlnx/foo/mq`
>    - `(.*)` - wildcard for capture group
>    - `$` - anchor to match end of string
>    - `/$1` - replacement to append parameters from capture group to '/'
