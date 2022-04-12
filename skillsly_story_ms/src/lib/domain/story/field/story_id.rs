use derive_more::Constructor;
use serde::{Serialize, Deserialize};
use std::str::FromStr;

use crate::infrastructure::data::db_id::DbId;

#[derive(Clone, Debug, Constructor, Serialize, Deserialize)]
pub struct StoryId(DbId);

impl StoryId {
    pub fn into_inner(self) -> DbId {
        self.0
    }
}

impl From<DbId> for StoryId {
    fn from(id: DbId) -> Self {
        Self(id)
    }
}

impl Default for StoryId {
    fn default() -> Self {
        Self(DbId::nil())
    }
}

impl FromStr for StoryId {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(DbId::from_str(id)?))
    }
}

impl From<StoryId> for String {
    fn from(story_id: StoryId) -> Self {
        Self::from(story_id.into_inner())
    }
}