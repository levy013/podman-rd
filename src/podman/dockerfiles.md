# Dockerfiles

## What is a dockerfile?
> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.


🔗 <a href="https://docs.docker.com/reference/dockerfile/" target="_blank">Dockerfile</a>

### Example dockerfile for **`CAD.MQ.API`**
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

A Dockerfile is essentially just a chain of sequential commands called "layers". e.g. `FROM`, `COPY`, `RUN`

These layers are cached and evaluated sequentially.

### Cache invalidation
> Dockerfiles leverage a concept called `layered caching` to efficiently build images of an application. Without caching, you would need to do things like reinstall dependencies and recompile the source code every single time you rebuild an image.

🔗 <a href="https://docs.docker.com/build/cache/" target="_blank">Docker build cache</a>

A layer's cache is invalidated if 
1. the layer's underlying command (instruction) changes 
2. the layer's underlying source file (code) changes 
3. any prior layer's cache has been invalidated

#### e.g. Changing the .NET runtime 
 from `aspnet:9.0` 
```Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base 
```

to `aspnet:10.0`
```Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base 
```

This would invalidate the cache of the entire Dockerfile since this is the first line in the file.

### Ignoring files from build process 
> You can use a `.dockerignore` file to exclude files or directories from the build context.
>
> This is useful for preventing unneseccary cache invalidation from to changes to dotfiles like `.git`, or from changes in directories like `bin/` and `obj/`

🔗 <a href="https://docs.docker.com/build/concepts/context/#dockerignore-files" target="_blank">.dockerignore</a>
