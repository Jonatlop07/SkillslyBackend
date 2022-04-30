pub mod ask;
pub mod action;

use async_trait::async_trait;
use sqlx::Error;

use ask::create::CreateStory;
use ask::query::{QueryStory, QueryStoryCollection};
use crate::domain::Story;
use crate::domain::story::StoryError;
use crate::infrastructure::data::DataError;
use crate::service::ask::query::{QueryStoryWithViews};

#[derive(Debug, thiserror::Error)]
pub enum ServiceError {
    #[error("story error: {0}")]
    Story(#[from] StoryError),
    #[error("database error: {0}")]
    Data(DataError),
    #[error("not found")]
    NotFound
}

impl From<DataError> for ServiceError {
    fn from(err: DataError) -> Self {
        match err {
            DataError::Database(d) => match d {
                Error::RowNotFound => Self::NotFound,
                other => Self::Data(DataError::Database(other))
            }
        }
    }
}

impl From<Error> for ServiceError {
    fn from(err: Error) -> Self {
        match err {
            Error::RowNotFound => Self::NotFound,
            other => Self::Data(DataError::Database(other))
        }
    }
}

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait StoryService: Send + Sync {
    async fn create_story(&self, req: CreateStory) -> Result<Story, ServiceError>;
    async fn query_story(&self, req: QueryStoryWithViews) -> Result<Story, ServiceError>;
    async fn query_story_collection(&self, req: QueryStoryCollection) -> Result<Vec<Story>, ServiceError>;
    async fn delete_story_collection(&self, req: QueryStoryCollection) -> Result<Vec<Story>, ServiceError>;
    async fn delete_story(&self, req: QueryStory) -> Result<Story, ServiceError>;
}