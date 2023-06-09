use std::sync::Arc;
use async_trait::async_trait;

use crate::DatabasePool;
use crate::infrastructure::data::story::{StoryRepository};
use crate::infrastructure::data::story::model::{CreateStory, DeleteStory, QueryStory, AddStoryView, QueryStoryCollection, Story, StoryView};
use crate::infrastructure::data::story::Result;

pub struct PostgresStoryRepositoryImpl {
    pub db_pool: Arc<DatabasePool>,
}

#[async_trait]
impl StoryRepository for PostgresStoryRepositoryImpl {
    async fn save<M: Into<CreateStory> + Send>(&self, model: M) -> Result<Story> {
        let model = model.into();
        sqlx::query(
            r#"
                INSERT INTO skillsly_story.story (
                    story_id,
                    owner_id,
                    description,
                    media_locator,
                    created_at
                )
                VALUES ($1, $2, $3, $4, $5)
            "#
        )
            .bind(&model.story_id)
            .bind(&model.owner_id)
            .bind(&model.description)
            .bind(&model.media_locator)
            .bind(&model.created_at)
            .execute(&*self.db_pool)
            .await?;
        self.query(model.story_id).await
    }

    async fn query<M: Into<QueryStory> + Send>(&self, model: M) -> Result<Story> {
        let model = model.into();
        let story_id = model.story_id;
        Ok(
            sqlx::query_as!(
                Story,
                "SELECT * FROM skillsly_story.story WHERE story_id = $1",
                story_id
            )
                .fetch_one(&*self.db_pool)
                .await?
        )
    }

    async fn query_story_views<M: Into<QueryStory> + Send>(&self, model: M) -> Result<Vec<StoryView>> {
        let model = model.into();
        let story_id = model.story_id;
        Ok(
            sqlx::query_as!(
                StoryView,
                "SELECT * FROM skillsly_story.story_view WHERE story_id = $1",
                story_id
            )
                .fetch_all(&*self.db_pool)
                .await?
        )
    }

    async fn add_story_view<M: Into<AddStoryView> + Send>(&self, model: M) -> Result<()> {
        let model = model.into();
        let story_id = model.story_id;
        let viewer_id = model.viewer_id;
        let viewed_at = model.viewed_at;
        sqlx::query(
            r#"
                INSERT INTO skillsly_story.story_view (
                    story_id,
                    viewer_id,
                    viewed_at
                )
                VALUES ($1, $2, $3)
            "#
        )
            .bind(story_id)
            .bind(viewer_id)
            .bind(viewed_at)
            .fetch_all(&*self.db_pool)
            .await?;
        Ok(())
    }

    async fn query_collection<M: Into<QueryStoryCollection> + Send>(&self, model: M) -> Result<Vec<Story>> {
        let model = model.into();
        Ok(
            sqlx::query_as!(
                Story,
                "SELECT * FROM skillsly_story.story WHERE owner_id = $1",
                model.owner_id
            )
                .fetch_all(&*self.db_pool)
                .await?
        )
    }

    async fn delete_collection<M: Into<QueryStoryCollection> + Send>(&self, model: M) -> Result<()> {
        let model = model.into();
        sqlx::query!(
            "DELETE FROM skillsly_story.story WHERE owner_id = $1",
            model.owner_id
        )
            .execute(&*self.db_pool)
            .await?;
        Ok(())
    }

    async fn delete<M: Into<DeleteStory> + Send>(&self, model: M) -> Result<()> {
        let model = model.into();
        sqlx::query!(
            "DELETE FROM skillsly_story.story WHERE story_id = $1",
            model.story_id
        )
            .execute(&*self.db_pool)
            .await?;
        Ok(())
    }
}