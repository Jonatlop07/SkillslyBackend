use std::cell::RefCell;
use chrono::{DateTime, Utc};
use crate::domain::story::field::Id;
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

impl TryFrom<Story> for crate::Story {
    type Error = StoryError;

    fn try_from(story: Story) -> Result<Self, Self::Error> {
        use crate::domain::story::field;
        use std::str::FromStr;
        Ok(
            Self {
                story_id: field::Id::new(DbId::from_str(story.story_id.as_str())?),
                owner_id: field::Id::new(DbId::from_str(story.owner_id.as_str())?),
                content: field::Content::new(
                    story.description.unwrap().as_str(),
                    story.media_locator.unwrap().as_str(),
                )?,
                created_at: field::CreatedAt::new(Time::from_naive_utc(story.created_at.naive_utc())),
                views: RefCell::new(Vec::new())
            }
        )
    }
}

#[derive(Debug, sqlx::FromRow)]
pub struct StoryView {
    pub(in crate::infrastructure::data) story_id: String,
    pub(in crate::infrastructure::data) viewer_id: String,
    pub(in crate::infrastructure::data) viewed_at: DateTime<Utc>
}

impl TryFrom<StoryView> for crate::StoryView {
    type Error = StoryError;

    fn try_from(story_view: StoryView) -> Result<Self, Self::Error> {
        use crate::domain::story::field;
        use std::str::FromStr;
        Ok(
            Self {
                story_id: field::Id::new(DbId::from_str(story_view.story_id.as_str())?),
                viewer_id: field::Id::new(DbId::from_str(story_view.viewer_id.as_str())?),
                viewed_at: field::ViewedAt::new(Time::from_naive_utc(story_view.viewed_at.naive_utc())),
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
            story_id: String::from(req.into_inner())
        }
    }
}

impl From<String> for QueryStory {
    fn from(story_id: String) -> Self {
        Self{
            story_id
        }
    }
}

pub struct AddStoryView {
    pub(in crate::infrastructure::data) story_id: String,
    pub(in crate::infrastructure::data) viewer_id: String,
    pub(in crate::infrastructure::data) viewed_at: DateTime<Utc>
}

impl From<crate::service::ask::query::QueryStoryWithViews> for AddStoryView {
    fn from(req: crate::service::ask::query::QueryStoryWithViews) -> Self {
        Self {
            story_id: String::from(req.story_id),
            viewer_id: String::from(req.viewer_id),
            viewed_at: Utc::now()
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

impl From<crate::Story> for CreateStory {
    fn from(story: crate::Story) -> Self {
        Self {
            story_id: story.story_id.into_inner().into(),
            owner_id: story.owner_id.into_inner().into(),
            description: Some(story.content.description.into_inner()),
            media_locator: Some(story.content.media_locator.into_inner()),
            created_at: story.created_at.into_inner().into_inner()
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

impl From<Id> for DeleteStory {
    fn from(story_id: Id) -> Self {
        Self {
            story_id: String::from(story_id)
        }
    }
}