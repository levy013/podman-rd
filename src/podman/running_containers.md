# Running Containers

## Example using CAD.MQ.API
```shell
$ podman run -d -p 8080:8080 --name cmqapi localhost/cmqapi:latest
```

> ℹ️ **Note**
>
> `-d` run detached
> 
> `-p` forward port on host to port on container
> 
> `--name` name of container

🔗 <a href=" https://docs.podman.io/en/stable/markdown/podman-run.1.html" target="_blank">Documentation: podman-run</a>
