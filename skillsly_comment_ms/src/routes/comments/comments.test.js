const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../utils/mongo");

const right_comment = {
  owner_id: "c3ef416e-87e0-4dae-a4d1-34de41290453",
  content: {
    description: "New comment",
    media_locator:
      "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
  },
};

async function createComment() {
  const { _body } = await request(app)
    .post(`/v1/comments/1`)
    .send(right_comment);
  return _body._id;
}

describe("Comments API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /comments", () => {
    test("Should respond with 200 success", async () => {
      const response = await request(app)
        .get(`/v1/comments/1`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /comments", () => {
    const comment_with_invalid_format = {
      owner_id: "",
      content: {
        description: "New comment",
        media_locator:
          "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
      },
    };

    test("Should respond with 201 created", async () => {
      const response = await request(app)
        .post(`/v1/comments/1`)
        .send(right_comment)
        .expect(201);
    });

    test("Should catch invalid comment format", async () => {
      const response = await request(app)
        .post(`/v1/comments/1`)
        .send(comment_with_invalid_format)
        .expect(400);

      expect(response.body.error.code).toEqual("INVALID_COMMENT_FORMAT");
    });
  });

  describe("Test PUT /comments", () => {
    const right_content = {
      description: "New comment",
      media_locator:
        "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
    };

    const invalid_content = {
      description: "",
      media_locator: "",
    };

    test("Should respond with 200 success", async () => {
      const comment_id = await createComment();
      await request(app)
        .put("/v1/comments/" + comment_id)
        .send(right_content)
        .expect(200);
    });

    test("Should respond with 404 when trying to update a comment that does not exist", async () => {
      const response = await request(app)
        .put(`/v1/comments/1259c11bffe947700cfcfd87`)
        .send(right_content)
        .expect(404);

      expect(response.body.error.code).toEqual("COMMENT_NOT_FOUND");
    });

    test("Should catch invalid content format", async () => {
      const response = await request(app)
        .put("/v1/comments/1259c11bffe947700cfcfd87")
        .send(invalid_content)
        .expect(400);

      expect(response.body.error.code).toEqual("INVALID_COMMENT_CONTENT");
    });
  });

  describe("Test DELETE /comments", () => {
    test("Should respond with 200 success", async () => {
      const comment_id = await createComment();
      await request(app)
        .delete("/v1/comments/" + comment_id)
        .expect(200);
    });

    test("Should respond with 404 when trying to delete a comment that does not exist", async () => {
      const response = await request(app)
        .delete(`/v1/comments/1259c11bffe947700cfcfd87`)
        .expect(404);

      expect(response.body.error.code).toEqual("COMMENT_NOT_FOUND");
    });
  });
});
