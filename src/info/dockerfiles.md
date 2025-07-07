
Dockerfiles are powerful because they leverage a concept called `layered caching` to efficiently build images of an application. Without caching, we would need to do things like reinstall dependencies and recompile the source code every single time we rebuild an image 

- A dockerfile is essentially just a chain of sequential commands called layers. e.g. FROM, COPY, RUN, etc.
- These layers are cached and evaluated sequentially.
- A layer's cache is invalidated if
    - the underlying command changes
    - any files it depends on changes
    - any prior layer has been invalidated, e.g. if we change the .NET runtime from aspnet:9.0 to aspnet:10.0, we would essentially need to rebuild the entire image
- `.dockerignore` files can help with preventing unneseccary cache invalidation due to changes in dotfiles like .git or changes in bin/ and obj/
 
**Example:**

Bad
```dockerfile
COPY . .
RUN dotnet restore #runs even if we simply added a comment or removed whitespace 
```

Good 
```dockerfile
COPY project.csproj .
RUN dotnet restore #only runs if the .csproj changes 

COPY . .
RUN dotnet build #only runs if the source code changes
```
*... there's some nuance here, but you get the idea*

[Caching Dockerfiles](https://docs.docker.com/build/cache/)

