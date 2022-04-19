use std::cell::RefCell;
use chrono::Utc;
use serde::{Serialize, Deserialize};

use crate::domain::story::field::{Content, CreatedAt, Description, MediaLocator, Id};
use crate::{Story, StoryError};
use crate::domain::time::Time;
use crate::infrastructure::data::db_id::DbId;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateStory {
    pub owner_id: Id,
    pub description: Description,
    pub media_locator: MediaLocator
}

impl TryFrom<CreateStory> for Story {
    type Error = StoryError;

    fn try_from(req: CreateStory) -> Result<Self, Self::Error> {
        Ok(
            Self {
                story_id: Id::new(DbId::new()),
                owner_id: req.owner_id,
                content: Content::new(
                    req.description.into_inner().as_str(),
                    req.media_locator.into_inner().as_str()
                )?,
                created_at: CreatedAt::new(Time::from_naive_utc(Utc::now().naive_utc())),
                views: RefCell::new(Vec::new())
            }
        )
    }
}