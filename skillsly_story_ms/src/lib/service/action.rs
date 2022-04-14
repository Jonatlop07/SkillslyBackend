use async_trait::async_trait;   

use crate::domain::Story;
use crate::infrastructure::data::story::StoryRepository;
use crate::service::ask::create::CreateStory;
use crate::service::ask::query::{QueryStory, QueryStoryCollection};
use crate::service::ServiceError;
use crate::StoryService;

pub struct StoryServiceImpl<G: StoryRepository> {
    pub gateway: G
}

#[async_trait]
impl<G> StoryService for StoryServiceImpl<G>
    where
        G: StoryRepository + Send + Sync
{
    async fn create_story(&self, req: CreateStory) -> Result<Story, ServiceError> {
        Ok(self.gateway.save(Story::try_from(req)?).await?.try_into()?)
    }

    async fn query_story(&self, req: QueryStory) -> Result<Story, ServiceError> {
        
        Ok(self.gateway.query(req).await?.try_into()?)
    }

    async fn query_story_collection(&self, req: QueryStoryCollection) -> Result<Vec<Story>, ServiceError> {
        use crate::infrastructure::data::story::model;
        let story_models: Vec<model::Story> = self.gateway
            .query_collection(req)
            .await?;
        let mut story_collection: Vec<Story> = vec![];
        for story in story_models {
            story_collection.push(story.try_into()?);
        }
        Ok(story_collection)
    }
    
    async fn delete_story(&self, req: QueryStory) -> Result<Story, ServiceError> {
        let story: Story = self.gateway.query(req).await?.try_into()?;
        self.gateway.delete(story.story_id.clone()).await?;
        Ok(story)
    }
}