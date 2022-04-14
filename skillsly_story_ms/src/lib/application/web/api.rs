use std::str::FromStr;
use rocket::serde::json::Json;
use rocket::{routes, Route, State};
use rocket::Responder;

use crate::service::ServiceError;
use crate::{service, StoryService};

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

#[rocket::get("/stories/<story_id>")]
pub async fn query_story(
    story_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<crate::Story>, ApiError> {
    use service::ask::query::QueryStory;
    let req = QueryStory::from_str(story_id).unwrap();
    let story = service.query_story(req).await?;
    Ok(Json(story))
}

#[rocket::get("/user/<user_id>/stories")]
pub async fn query_story_collection(
    user_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<Vec<crate::Story>>, ApiError> {
    use service::ask::query::QueryStoryCollection;
    let req = QueryStoryCollection::from_str(user_id).unwrap();
    let stories = service.query_story_collection(req).await?;
    Ok(Json(stories))
}

#[rocket::delete("/stories/<story_id>")]
pub async fn delete_story(
    story_id: &str,
    service: &State<Box<dyn StoryService>>
) -> Result<Json<crate::Story>, ApiError> {
    use service::ask::query::QueryStory;
    let req = QueryStory::from_str(story_id).unwrap();
    let story = service.delete_story(req).await?;
    Ok(Json(story))
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