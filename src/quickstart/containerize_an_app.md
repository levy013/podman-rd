# Containerize an Application
> ℹ️ **Note** 
>
> Quick start example for containerizing a .NET application in Podman. 
>
> In this example, we'll deploy `CAD.MQ.API` in a container on `uit1446`

> ⛔ **Requirements** 
>
> 🏷️ [**Local Environment:**  Config / Install Podman Locally](../localenv/config.md#install-podman-locally)

## Step 1: Create a Dockerfile 
> 🏷️ [**Containerization:** Dockerfiles](../podman/dockerfiles.md)

## Step 2: Push Image to Remote Server
> 🏷️ [**Local Environment:** Push To Remote Server](../localenv/push_to_remote_server.md)

## Step 3: Extract image on Remote Server
### 1. Open terminal and cd to dir containing image .tar
### 2. Load image from **`.tar`**

```bash
$ podman load -i cmqapi.tar
```

## Step 4: Start App in Container
### 1. Start a container
```bash
$ podman run -d -p 8080:8080 --name cmqapi localhost/cmqapi:latest
```
> ℹ️ **Note**
>
> `-d` run detached
> 
> `-p` forward port on host to port on container
> 
> `--name` name of container
