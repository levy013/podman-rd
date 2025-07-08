# Dockerfiles

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
Super High-Level explanation of a dockerfile

Dockerfiles are powerful because they leverage a concept called layered caching to efficiently build images of an application. Without caching, we would need to do things like reinstall dependencies and recompile the source code every single time we rebuild an image 🫣

    A dockerfile is essentially just a chain of sequential commands called layers. e.g. FROM, COPY, RUN, etc.
    These layers are cached and evaluated sequentially.
    A layer's cache is invalidated if
        the underlying command changes
        any files it depends on changes
        any prior layer has been invalidated, e.g. if we change the .NET runtime from aspnet:9.0 to aspnet:10.0, we would essentially need to rebuild the entire image
    .dockerignore files can help with preventing unneseccary cache invalidation due to changes in dotfiles like .git or changes in bin/ and obj/

Example:

❌ Bad

COPY . .
RUN dotnet restore #runs even if we simply added a comment or removed whitespace 

✔️ Good

COPY project.csproj .
RUN dotnet restore #only runs if the .csproj changes 

COPY . .
RUN dotnet build #only runs if the source code changes

... there's some nuance here, but you get the idea

📝Caching Dockerfiles
