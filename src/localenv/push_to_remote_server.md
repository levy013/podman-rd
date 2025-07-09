# Push Image to Remote Server 
 
> ⚠️ **Warning**
>
> This may become a script at some point 

## 1. Open terminal and **`cd`** to root dir **`e.g. CAD24x7`**
```bash
$ pwd
/c/git/CAD24x7

$ ls
CAD CAD.API CAD.BL ... etc.
```

## 2. Build Image 


```bash
$ podman build -f CAD.MQ.API/Dockerfile -t cadmq-api:latest .
```

> ℹ️ **Note** 
>
> `-f` path to dockerfile
>
> `-t` tag name

## 3. Save image as **`.tar`**

```bash
$ podman save -o cadmq-api.tar localhost/cadmq-api:latest`
```


> ℹ️ **Note** 
> 
> `localhost` is automatically prepended in the previous step because we're not specifying a public registry or a namespace
>
> This is Podmans way of indicating that this is a "*local image*", and has not been pulled or pushed to a remote repository

## 4. Push **`.tar`** to Remote Server

```bash
$ scp cadmq-api.tar cad@uit1446.govt.hcg.local:/home/cad
```

> ℹ️ **Note** 
> 
> Pushing to `user@hostname:homedir`

## 5. Clean up **`.tar`**
```bash
$ rm cadmq-api.tar
```
