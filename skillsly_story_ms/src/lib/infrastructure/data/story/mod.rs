pub mod model;
pub mod query;

use async_trait::async_trait;
use crate::infrastructure::data::DataError;
use crate::infrastructure::data::story::model::{Story, StoryView};

pub type Result<T> = std::result::Result<T, DataError>;

#[cfg_attr(test, mockall::automock)]
#[async_trait]
pub trait StoryRepository {
    async fn save<M: Into<model::CreateStory> + Send>(&self, model: M) -> Result<Story>;
    async fn query<M: Into<model::QueryStory> + Send>(&self, model: M) -> Result<Story>;
    async fn query_story_views<M: Into<model::QueryStory> + Send>(&self, model: M) -> Result<Vec<StoryView>>;
    async fn add_story_view<M: Into<model::AddStoryView> + Send>(&self, model: M) -> Result<()>;
    async fn query_collection<M: Into<model::QueryStoryCollection> + Send>(&self, model: M) -> Result<Vec<Story>>;
    async fn delete<M: Into<model::DeleteStory> + Send>(&self, model: M) -> Result<()>;
}