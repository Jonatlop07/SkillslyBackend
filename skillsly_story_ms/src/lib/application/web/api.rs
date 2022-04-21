use std::str::FromStr;
use rocket::serde::json::Json;
use rocket::{routes, Route, State};
use rocket::Responder;

use crate::service::ServiceError;
use crate::{service, StoryError, StoryService};
use crate::domain::story::field::Id;

#[derive(Responder, Debug, thiserror::Error)]
pub enum ApiError {
    #[error("not found")]
    #[response(status = 404, content_type = "json")]
    NotFound(Json<String>),

    #[error("server error")]
    #[response(status = 500, content_type = "json")]
    Server(Json<String>),

    #[error("client error")]
    #[response(status = 401, content_type = "json")]
    User(Json<String>)
}

impl From<ServiceError> for ApiError {
    fn from(err: ServiceError) -> Self {
        match err {
            ServiceError::Story(s) =>
                Self::User(Json(format!("story parsing error: {}", s))),
            ServiceError::NotFound =>
                Self::NotFound(Json("entity not found".to_owned())),
            ServiceError::Data(_) =>
                Self::Server(Json("a server error occurred".to_owned()))
        }
    }
}

pub fn configure_routes() -> Vec<Route> {
    routes!(create_story, query_story, query_story_collection, delete_story)
}

#[rocket::post("/stories", data = "<req>")]
pub async fn create_story(
    req: Json<service::ask::create::CreateStory>,
    service: &State<Box<dyn StoryService>>,
) -> Result<Json<crate::Story>, ApiError> {
    let story = service.create_story(req.into_inner()).await?;
    Ok(Json(story))
}

#[rocket::get("/stories/<story_id>?<viewer_id>")]
pub async fn query_story(
    story_id: &str,
    viewer_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<crate::Story>, ApiError> {
    use service::ask::query::QueryStoryWithViews;
    let story_id = Id::from_str(story_id);
    match story_id {
        Ok(story_id) =>
            return match Id::from_str(viewer_id) {
                Ok(viewer_id) => {
                    let req = QueryStoryWithViews::new(
                        story_id,
                        viewer_id
                    );
                    let story = service.query_story(req).await?;
                    Ok(Json(story))
                },
                Err(e) => Err(ApiError::from(ServiceError::from(StoryError::Id(e))))
            },
        Err(e) => Err(ApiError::from(ServiceError::from(StoryError::Id(e))))
    }
}

#[rocket::get("/user/<user_id>/stories")]
pub async fn query_story_collection(
    user_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<Vec<crate::Story>>, ApiError> {
    use service::ask::query::QueryStoryCollection;
    match QueryStoryCollection::from_str(user_id) {
        Ok(req) => {
            let stories = service.query_story_collection(req).await?;
            return Ok(Json(stories));
        },
        Err(e) => Err(ApiError::from(ServiceError::from(StoryError::Id(e))))
    }
}

#[rocket::delete("/stories/<story_id>")]
pub async fn delete_story(
    story_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<crate::Story>, ApiError> {
    use service::ask::query::QueryStory;
    match QueryStory::from_str(story_id) {
        Ok(req) => {
            let story = service.delete_story(req).await?;
            return Ok(Json(story));
        },
        Err(e) => Err(ApiError::from(ServiceError::from(StoryError::Id(e))))
    }
}

pub mod catcher {
    //! Contains all the API catchers.
    use rocket::serde::json::Json;
    use rocket::Request;
    use rocket::{catch, catchers, Catcher};

    /// Catch unhandled errors.
    #[catch(default)]
    fn default(req: &Request) -> Json<&'static str> {
        eprintln!("General error: {:?}", req);
        Json("something went wrong...")
    }

    /// Catch server errors.
    #[catch(500)]
    fn internal_error(req: &Request) -> Json<&'static str> {
        eprintln!("Internal error: {:?}", req);
        Json("internal server error")
    }

    /// Catch missing data errors.
    #[catch(404)]
    fn not_found() -> Json<&'static str> {
        Json("404")
    }

    /// Catch user request errors.
    #[catch(401)]
    fn request_error() -> Json<&'static str> {
        Json("request error")
    }

    /// The [`catchers`](rocket::Catcher) which can be registered by [`rocket`].
    pub fn catchers() -> Vec<Catcher> {
        catchers![not_found, default, internal_error, request_error]
    }
}