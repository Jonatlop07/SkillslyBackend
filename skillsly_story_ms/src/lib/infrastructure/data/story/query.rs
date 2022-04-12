use std::sync::Arc;
use async_trait::async_trait;

use crate::DatabasePool;
use crate::infrastructure::data::story::{StoryRepository};
use crate::infrastructure::data::story::model::{CreateStory, DeleteStory, QueryStory, QueryStoryCollection, Story};
use crate::infrastructure::data::story::Result;

pub struct PostgresStoryRepositoryImpl {
    pub db_pool: Arc<DatabasePool>
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

    async fn query_collection<M: Into<QueryStoryCollection> + Send>(&self, model: M) -> Result<Vec<Story>> {
        let model = model.into();
        let owner_id = model.owner_id;
        Ok(
            sqlx::query_as!(
                Story,
                "SELECT * FROM skillsly_story.story WHERE owner_id = $1",
                owner_id
            )
                .fetch_all(&*self.db_pool)
                .await?
        )
    }

    async fn delete<M: Into<DeleteStory> + Send>(&self, model: M) -> Result<()> {
        let model = model.into();
        sqlx::query!(
                "DELETE FROM skillsly_story.story WHERE story.story_id = $1",
                model.story_id
            )
            .execute(&*self.db_pool)
            .await?;
        Ok(())
    }
}