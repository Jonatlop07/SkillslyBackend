use std::borrow::Borrow;
use async_trait::async_trait;

use crate::domain::Story;
use crate::infrastructure::data::story::{model, StoryRepository};
use crate::service::ask::create::CreateStory;
use crate::service::ask::query::{QueryStory, QueryStoryCollection, QueryStoryWithViews};
use crate::service::ServiceError;
use crate::{StoryService, StoryView};

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

    async fn query_story(&self, req: QueryStoryWithViews) -> Result<Story, ServiceError> {
        let query_req = QueryStory::from(req.clone());
        let story: Story = self.gateway.query(query_req.clone())
            .await?
            .try_into()?;
        let views_models: Vec<model::StoryView> = self.gateway.query_story_views(query_req.clone()).await?;
        let mut views: Vec<StoryView> = vec![];
        let mut has_viewed = false;
        for view in views_models {
            let story_view: StoryView = view.try_into()?;
            let story_viewer_id = story_view.clone().viewer_id;
            if req.clone().viewer_id == story_viewer_id {
                has_viewed = true;
            }
            views.push(story_view);
        }
        if &story.owner_id == &req.viewer_id {
            story.views.replace(views);
        } else {
            if !has_viewed {
                self.gateway.add_story_view(req.clone()).await?
            }
        }
        Ok(story)
    }

    async fn query_story_collection(&self, req: QueryStoryCollection) -> Result<Vec<Story>, ServiceError> {
        let story_models: Vec<model::Story> = self.gateway
            .query_collection(req)
            .await?;
        let mut story_collection: Vec<Story> = vec![];
        for story in story_models {
            story_collection.push(story.try_into()?);
        }
        Ok(story_collection)
    }

    async fn delete_story_collection(&self, req: QueryStoryCollection) -> Result<Vec<Story>, ServiceError> {
        let stories: Vec<Story> = self.query_story_collection(req.clone()).await?;
        self.gateway.delete_collection(req).await?;
        Ok(stories)
    }

    async fn delete_story(&self, req: QueryStory) -> Result<Story, ServiceError> {
        let story: Story = self.gateway.query(req).await?.try_into()?;
        self.gateway.delete(story.story_id.clone()).await?;
        Ok(story)
    }
}
