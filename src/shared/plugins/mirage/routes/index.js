import { Response } from "miragejs";

export function routes() {
  this.namespace = "api";

  this.get("/gifs", (schema) => {
    return schema.gifs.all();
  });

  this.post("/gifs", (schema, request) => {
    const gifParsed = JSON.parse(request.requestBody);
    const gif = schema.gifs.create(gifParsed);
    return gif;
  });

  this.patch("/gifs/:id", (schema, request) => {
    const gifParsed = JSON.parse(request.requestBody);
    const gif = schema.gifs.find(id);
    gif.update(gifParsed);
    return gif;
  });

  this.del("/gifs/:id", (schema, request) => {
    const { id } = request.params;
    try {
      const gif = schema.gifs.find(id);
      gif.destroy();
      return {
        data: {
          message: "Gif deleted",
        },
      };
    } catch (error) {
      return new Response(500, {}, { error: "Gif não encontrado" });
    }
  });

  this.passthrough("https://api.giphy.com/v1/**");
}
