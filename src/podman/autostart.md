# Autostart
> ℹ️ **Note** 
>
> The goal here is to ensure that if our servers are restarted (*gracefully or not*) that our containers will start back up without human intervention.
>
> There are a few different ways to achieve this.

## Method 1: Running container under system(root)
> ℹ️ **Note** 
>
> This is not advised. The nice thing about podman is that it allows us to run rootless containers in the first place...

> ⛔ **Requirements** 
>
> 🏷️ [Push Image to Remote Server](../localenv/push_to_remote_server.md)

### 1. Share image with system/root user
```shell
$ podman image scp USERNAME@localhost::$IMAGE root@localhost::
```

### 2. Navigate to containers tab and run container with these mods:
- owner = system
- restart policy = always
- integration / port mapping = host: 8080 container: 8080 (just match dockerfile)


## Method 2: Setting up container to run as a systemd service
> ℹ️ **Note**
>
> Following this guide from RHEL:
>
> 🔗 <a href="https://www.redhat.com/en/blog/container-systemd-persist-reboot" target="_blank">Configure a container to start automatically as a systemd service</a>
>
> This method is technically deprecated, though many users still prefer this approach - it's now recommended to use Quadlets when interacting with systemd

### 1. Create user directory for **`.service`** file
> ⚠️**Warning**
>
> This only needs to be done once for a user. 
>
>The `-p` flag will prevent us from creating anything if the path already exists.
>
> The path is actually for `/user/`

```shell
$ mkdir -p ~/.config/systemd/user/
```

### 2. Start a container
> 🏷️ [**Podman**: Running Containers](../podman/running_containers.md)

### 3. Generate a systemd **`.service`** file
```shell
$ podman generate systemd --new --files --name myapp
```
> ℹ️ **Note**
>
> The service file will contain all of the required parameters to run the container in it's current state. We can preview the file with the following cmd
> ```shell 
> $ less ~/.config/systemd/user/myapp.service
> ```

### 4. Stop the container
```shell
$ podman stop myapp
```

### 5. Copy **`.service`** file into user dir
```shell
$ cp -Z container-myapp.service ~/.config/systemd/user/
```

### 6. Reload user level systemctl daemon
```shell
$ systemctl --user daemon-reload
```

---
### Now we can start containers via **`systemctl`**
```shell
$ systemctl --user start container-myapp.service
```

### Add/Remove from systemd services
#### Add
```shell
$ systemctl --user enable container-cadmq-api.service
```

#### Remove
```shell
$ systemctl --user stop container-cadmq-api.service
```

## Method 3: Quadlets
### ... 🦗
