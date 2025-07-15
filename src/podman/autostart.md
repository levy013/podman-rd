# Autostart
> ℹ️ **Note** 
>
> The goal here is to ensure that if our servers are restarted (*gracefully or not*) that our containers will start back up without human intervention.
>
> There are a few different ways to achieve this.

## Method 1: Running container under system(root)
> ⚠️ **Warning** 
>
> *This method is not advised.* 
>
>As a best practice, you shouldn't really be running privileged containers if you don't need to.

> ⛔ **Requirements** 
>
> 🏷️ [**Local Environment:** Push Image to Remote Server](../localenv/push_to_remote_server.md)

### 1. Share image with system/root user
```shell
$ podman image scp USERNAME@localhost::$IMAGE root@localhost::
```

### 2. Navigate to containers tab and run container with these mods:
- owner = system
- restart policy = always
- integration / port mapping = host: 8080 container: 8080 (just match dockerfile)


## Method 2: Setting up container to run as a user-level **`systemd`** service
> ⚠️ **Warning**
>
> *This method is technically deprecated.*
>
> Though many users still prefer this approach, it's now recommended to use:
>
> 🏷️[**Podman:** Autostart > Quadlets](../podman/autostart.md#method-3-quadlets) 

> ℹ️ **Note**
>
> Following this guide from RHEL:
>
> 🔗 <a href="https://www.redhat.com/en/blog/container-systemd-persist-reboot" target="_blank">Configure a container to start automatically as a systemd service</a>
>
> This method leverages use of the `systemd --user`
>
> The `systemd --user` instance privileges and lifecycle match those of the corresponding user. 
>
> *The user-level instance is distinct from the main, root-level `systemd` instance that manages the entire operating system, making this much safer to work with.* 

<span style="color: red">**Important**</span>

Since our container(s) are bound to the corresponding `systemd --user` our services won't actually autostart until that user has been logged in after reboot. To solve this, we need to enable `linger` for that user. 
```shell
$ sudo loginctl enable-linger <username>
```

This will allow us to persist the `systemd --user` session via the root level `systemd` session even after all interactive logins have ended. This way our container(s) will launch on server boot.

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
> 🏷️ [**Podman:** Running Containers](../podman/running_containers.md)

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

### 7. Add container to **`systemd --user`** service
```shell
$ systemctl --user enable container-cadmq-api.service
```

### Additonal Commands
#### Manually start container via **`systemctl`**
```shell
$ systemctl --user start container-myapp.service
```

#### Remove from **`systemd`** services
```shell
$ systemctl --user stop container-cadmq-api.service
```

## Method 3: Quadlets
### ... 🦗
<span style="color: red">**Important**</span>

Since our container(s) are bound to the corresponding `systemd --user` our services won't actually autostart until that user has been logged in after reboot. To solve this, we need to enable `linger` for that user. 
```shell
$ sudo loginctl enable-linger <username>
```

This will allow us to persist the `systemd --user` session via the root level `systemd` session even after all interactive logins have ended. This way our containers will launch on server boot.

