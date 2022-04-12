use chrono::{DateTime, Utc};
use crate::domain::story::field::StoryId;
use crate::domain::story::StoryError;
use crate::domain::time::Time;
use crate::infrastructure::data::db_id::DbId;

#[derive(Debug, sqlx::FromRow)]
pub struct Story {
    pub(in crate::infrastructure::data) story_id: String,
    pub(in crate::infrastructure::data) owner_id: String,
    pub(in crate::infrastructure::data) description: Option<String>,
    pub(in crate::infrastructure::data) media_locator: Option<String>,
    pub(in crate::infrastructure::data) created_at: DateTime<Utc>
}

impl TryFrom<Story> for crate::domain::Story {
    type Error = StoryError;

    fn try_from(story: Story) -> Result<Self, Self::Error> {
        use crate::domain::story::field;
        use std::str::FromStr;
        Ok(
            Self {
                story_id: field::StoryId::new(DbId::from_str(story.story_id.as_str())?),
                owner_id: field::OwnerId::new(DbId::from_str(story.owner_id.as_str())?),
                content: field::Content::new(
                    story.description.unwrap().as_str(),
                    story.media_locator.unwrap().as_str(),
                )?,
                created_at: field::CreatedAt::new(Time::from_naive_utc(story.created_at.naive_utc()))
            }
        )
    }
}

pub struct QueryStory {
    pub(in crate::infrastructure::data) story_id: String
}

impl From<crate::service::ask::query::QueryStory> for QueryStory {
    fn from(req: crate::service::ask::query::QueryStory) -> Self {
        Self {
            story_id: String::from(req)
        }
    }
}

impl From<String> for QueryStory {
    fn from(story_id: String) -> Self {
        Self {
            story_id
        }
    }
}

pub struct QueryStoryCollection {
    pub(in crate::infrastructure::data) owner_id: String
}

impl From<crate::service::ask::query::QueryStoryCollection> for QueryStoryCollection {
    fn from(req: crate::service::ask::query::QueryStoryCollection) -> Self {
        Self {
            owner_id: String::from(req)
        }
    }
}

pub struct CreateStory {
    pub(in crate::infrastructure::data) story_id: String,
    pub(in crate::infrastructure::data) owner_id: String,
    pub(in crate::infrastructure::data) description: Option<String>,
    pub(in crate::infrastructure::data) media_locator: Option<String>,
    pub(in crate::infrastructure::data) created_at: DateTime<Utc>
}

impl From<crate::service::ask::create::CreateStory> for CreateStory {
    fn from(req: crate::service::ask::create::CreateStory) -> Self {
        Self {
            story_id: DbId::new().into(),
            owner_id: req.owner_id.into_inner().into(),
            description: Some(req.description.into_inner()),
            media_locator: Some(req.media_locator.into_inner()),
            created_at: Utc::now()
        }
    }
}

pub struct DeleteStory {
    pub(in crate::infrastructure::data) story_id: String
}

impl From<crate::service::ask::delete::DeleteStory> for DeleteStory {
    fn from(req: crate::service::ask::delete::DeleteStory) -> Self {
        Self {
            story_id: String::from(req)
        }
    }
}

impl From<StoryId> for DeleteStory {
    fn from(story_id: StoryId) -> Self {
        Self {
            story_id: String::from(story_id)
        }
    }
}