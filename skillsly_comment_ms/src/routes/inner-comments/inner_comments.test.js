const request = require("supertest");
const app = require("../../app");
const { mongoConnectTests, mongoDisconnect } = require("../../utils/mongo");

const right_inner_comment = {
  owner_id: "c3ef416e-87e0-4dae-a4d1-34de41290453",
  content: {
    description: "New comment in comment",
    media_locator:
      "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
  },
};

async function createComment() {
  const { _body } = await request(app)
    .post(`/v1/comments/1`)
    .send(right_inner_comment);
  return _body._id;
}

async function createInnerComment(comment_id) {
  const { _body } = await request(app)
    .post("/v1/inner-comments/" + comment_id)
    .send(right_inner_comment);
  return _body._id;
}

describe("Inner comments API", () => {
  const sample_comment_id = "62589a0652cdcfd7ec050913";

  beforeAll(async () => {
    await mongoConnectTests();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /inner-comments", () => {
    test("Should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/inner-comments/" + sample_comment_id)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /inner-comments", () => {
    const inner_comment_with_invalid_format = {
      owner_id: "",
      content: {
        description: "New comment in comment to a diff comment",
        media_locator:
          "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
      },
    };

    test("Should respond with 201 created", async () => {
      const comment_id = await createComment();
      const response = await request(app)
        .post("/v1/inner-comments/" + comment_id)
        .send(right_inner_comment)
        .expect(201);
    });

    test("Should catch invalid inner comment format", async () => {
      const comment_id = await createComment();
      const response = await request(app)
        .post("/v1/inner-comments/" + comment_id)
        .send(inner_comment_with_invalid_format)
        .expect(400);

      expect(response.body.error.code).toEqual("INVALID_INNER_COMMENT_FORMAT");
    });

    test("Should respond with 404 when trying to create an inner comment to a comment that does not exist", async () => {
      const response = await request(app)
        .post("/v1/inner-comments/" + sample_comment_id)
        .send(right_inner_comment)
        .expect(404);
    });
  });

  describe("Test PUT /inner-comments", () => {
    const right_content = {
      description: "New comment in comment",
      media_locator:
        "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o",
    };

    const invalid_content = {
      description: "",
      media_locator: "",
    };

    test("Should respond with 200 success", async () => {
      const comment_id = await createComment();
      const inner_comment_id = await createInnerComment(comment_id);
      await request(app)
        .put("/v1/inner-comments/" + inner_comment_id)
        .send(right_content)
        .expect(200);
    });

    test("Should respond with 404 when trying to update an inner comment that does not exist", async () => {
      const response = await request(app)
        .put(`/v1/inner-comments/1259c11bffe947700cfcfd87`)
        .send(right_content)
        .expect(404);

      expect(response.body.error.code).toEqual("INNER_COMMENT_NOT_FOUND");
    });

    test("Should catch invalid content format", async () => {
      const response = await request(app)
        .put("/v1/inner-comments/1259c11bffe947700cfcfd87")
        .send(invalid_content)
        .expect(400);

      expect(response.body.error.code).toEqual("INVALID_COMMENT_CONTENT");
    });
  });

  describe("Test DELETE /inner-comments", () => {
    test("Should respond with 200 success", async () => {
      const comment_id = await createComment();
      const inner_comment_id = await createInnerComment(comment_id);
      await request(app)
        .delete("/v1/inner-comments/" + inner_comment_id)
        .expect(200);
    });

    test("Should respond with 404 when trying to delete an inner comment that does not exist", async () => {
      const response = await request(app)
        .delete(`/v1/inner-comments/1259c11bffe947700cfcfd87`)
        .expect(404);

      expect(response.body.error.code).toEqual("INNER_COMMENT_NOT_FOUND");
    });
  });
});
