# Push Image to Remote Server 
 
> ⚠️ **Warning**
>
> This may become a script at some point 

## 1. Open terminal and **`cd`** to root dir **`e.g. CAD24x7`**
```shell
$ pwd
/c/git/CAD24x7

$ ls
CAD CAD.API CAD.BL ... etc.
```

## 2. Build Image 
> 🏷️ [**Local Environment**: Building Images](../localenv/building_images.md)

## 3. Save image as **`.tar`**

```shell
$ podman save -o myapp.tar localhost/myapp:latest
```


> ℹ️ **Note** 
> 
> `localhost` is automatically prepended in the previous step because we're not specifying a public registry or a namespace
>
> This is Podmans way of indicating that this is a "*local image*", and has not been pulled or pushed to a remote repository

## 4. Push **`.tar`** to Remote Server

```shell
$ scp myapp.tar cad@uit1446.govt.hcg.local:/home/cad
```

> ℹ️ **Note** 
> 
> Pushing to `user@hostname:homedir`

## 5. Clean up **`.tar`**
```shell
$ rm myapp.tar
```
