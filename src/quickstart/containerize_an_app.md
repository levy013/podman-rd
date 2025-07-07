## Step 1: Create a Dockerfile 
Here's an example dockerfile for `CAD.MQ.API`
> I let Rider create one for me and then I made modifications as necessary.

```dockerfile
# Set up .NET runtime env
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# Build Project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src 
COPY ["/CAD.MQ.API/CAD.MQ.API.csproj", "CAD.MQ.API/"]
RUN dotnet restore "CAD.MQ.API/CAD.MQ.API.csproj"
COPY . .
WORKDIR "/src/CAD.MQ.API"
RUN dotnet build "./CAD.MQ.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CAD.MQ.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "CAD.MQ.API.dll"]
```

### Super High-Level explanation of a dockerfile

see :::

## Step 3: Push Image to Remote Server
1. Open terminal and cd to `CAD24x7`
2. Build Image: 
```bash
podman build -f CAD.MQ.API/Dockerfile -t cmqapi:latest .
```
> -f: specify path to dockerfile
>
> -t: tag name

3. Save image as .tar:
```bash
podman save -o cmqapi.tar localhost/cmqapi:latest`
```
> `localhost` is automatically prepended in the previous step because we're not specifying a registry or a namespace
>
> This is Podmans way of indicating that this is a local image and has not been pulled or pushed to a remote repository

4. Push to uit1446:
```bash
scp cmqapi.tar lev013@uit1446.govt.hcg.local:/home/lev013
```

## Step 4: Start App in Container
1. Open terminal and cd to dir containing image .tar
2. Load image from .tar:
```bash
podman load -i cmqapi.tar
```
3. Start container
```bash
podman run -d -p 8080:8080 --name cmqapi localhost/cmqapi:latest
```
> -d: run detached
> 
> -p: fwd port on host to port of container
> 
> --name: name of container
